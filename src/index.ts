let listElement = document.querySelector("#app ul") as HTMLUListElement;
let inputElement = document.querySelector("#app input[type='text']:not(#searchInput)") as HTMLInputElement;
let buttonElement = document.querySelector("#app button") as HTMLElement;
let searchInputElement = document.querySelector("#searchInput") as HTMLInputElement;

let listaSalva: (string | null) = localStorage.getItem("@listagem_tarefas");
let tarefas: string[] = listaSalva !== null && JSON.parse(listaSalva) || [];
let tarefasFiltradas: string[] = tarefas;

function listarTarefas() {
    listElement.innerHTML = "";

    tarefasFiltradas.map((item, index) => {
        let todoElement = document.createElement("li");
        let tarefaText = document.createTextNode(item);

        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");

        linkElement.setAttribute("onclick", `deletarTarefa(${index})`);
        linkElement.setAttribute("style", "margin-left: 10px");

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        linkElement.appendChild(deleteButton);

        let completeButton = document.createElement("button");
        completeButton.textContent = "Completar";
        completeButton.setAttribute("style", "margin-left: 10px");
        completeButton.setAttribute("onclick", `completarTarefa(${index})`);

        let editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.setAttribute("style", "margin-left: 10px");
        editButton.setAttribute("onclick", `editarTarefa(${index})`);

        todoElement.appendChild(tarefaText);
        todoElement.appendChild(completeButton);
        todoElement.appendChild(editButton);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
    });
}

listarTarefas();

function adicionarTarefa() {
    if (inputElement.value === "") {
        alert("Digite alguma tarefa!");
        return false;
    } else {
        let tarefaDigitada: string = inputElement.value;
        tarefas.push(tarefaDigitada);

        inputElement.value = "";
        listarTarefas();
        salvarDados();
    }
}

buttonElement.onclick = adicionarTarefa;

function deletarTarefa(posicao: number) {
    tarefas.splice(posicao, 1);

    listarTarefas();
    salvarDados();
}

function completarTarefa(posicao: number) {
    let liElement = listElement.children[posicao] as HTMLLIElement;
    let tarefaText = tarefas[posicao];

    if (liElement.style.textDecoration === "line-through") {
        liElement.style.textDecoration = "none";
    } else {
        liElement.style.textDecoration = "line-through";
    }
}

function editarTarefa(posicao: number) {
    let liElement = listElement.children[posicao] as HTMLLIElement;
    let tarefaText = tarefas[posicao];

    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = tarefaText;

    let saveButton = document.createElement("button");
    saveButton.textContent = "Salvar";

    liElement.innerHTML = "";
    liElement.appendChild(editInput);
    liElement.appendChild(saveButton);

    saveButton.onclick = function () {
        let novoTexto = editInput.value;
        if (novoTexto !== "") {
            tarefas[posicao] = novoTexto;
            listarTarefas();
            salvarDados();
        } else {
            alert("O texto da tarefa não pode estar vazio!");
        }
    };
}

function filtrarTarefas() {
    let termoBusca = searchInputElement.value.toLowerCase();
    tarefasFiltradas = tarefas.filter((tarefa) =>
        tarefa.toLowerCase().includes(termoBusca)
    );
    listarTarefas();
}

searchInputElement.onkeyup = filtrarTarefas;

function salvarDados() {
    localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas));
}