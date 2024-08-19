document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM que serão manipulados
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Adiciona event listeners para os botões e a lista de tarefas
    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskClick);

    // Carrega as tarefas salvas no localStorage ao carregar a página
    loadTasks();

    // Função para adicionar uma nova tarefa
    function addTask() {
        const taskText = taskInput.value.trim(); // Pega o valor do input e remove espaços em branco
        if (taskText === '') {
            alert('Please enter a task'); // Mostra um alerta se o input estiver vazio
            return;
        }

        const taskItem = createTaskItem(taskText); // Cria um novo item de tarefa
        taskList.appendChild(taskItem); // Adiciona o novo item à lista de tarefas
        saveTasks(); // Salva as tarefas no localStorage
        taskInput.value = ''; // Limpa o input após adicionar a tarefa
    }

    // Função para lidar com cliques na lista de tarefas
    function handleTaskClick(event) {
        if (event.target.tagName === 'BUTTON' && event.target.classList.contains('remove')) {
            // Remove o item da lista se o botão "Remove" for clicado
            event.target.parentElement.remove();
            saveTasks(); // Salva as alterações no localStorage
        } else if (event.target.tagName === 'LI') {
            // Marca a tarefa como concluída ao clicar no item da lista
            event.target.classList.toggle('completed');
            saveTasks(); // Salva as alterações no localStorage
        }
    }

    // Função para criar um novo item de tarefa
    function createTaskItem(taskText) {
        const li = document.createElement('li'); // Cria um elemento <li>
        li.textContent = taskText; // Define o texto do <li> com o texto da tarefa

        const removeBtn = document.createElement('button'); // Cria um botão
        removeBtn.textContent = 'Remove'; // Define o texto do botão como "Remove"
        removeBtn.classList.add('remove'); // Adiciona a classe "remove" ao botão

        li.appendChild(removeBtn); // Adiciona o botão ao <li>
        return li; // Retorna o <li> criado
    }

    // Função para salvar as tarefas no localStorage
    function saveTasks() {
        const tasks = []; // Cria um array para armazenar as tarefas
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.firstChild.textContent, // Pega o texto da tarefa
                completed: taskItem.classList.contains('completed') // Verifica se a tarefa está concluída
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Salva as tarefas no localStorage
    }

    // Função para carregar as tarefas do localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Carrega as tarefas do localStorage
        tasks.forEach(task => {
            const taskItem = createTaskItem(task.text); // Cria um item de tarefa para cada tarefa salva
            if (task.completed) {
                taskItem.classList.add('completed'); // Marca a tarefa como concluída se necessário
            }
            taskList.appendChild(taskItem); // Adiciona a tarefa à lista
        });
    }
});
