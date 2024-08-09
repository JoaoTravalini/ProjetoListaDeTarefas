let listElement = document.querySelector("#app ul") as HTMLUListElement;
let inputElement = document.querySelector("#app input") as HTMLInputElement;
let buttonElement = document.querySelector("#app button") as HTMLElement;

let tarefas: string[] = [];

function listarTarefas(){
    listElement.innerHTML = "";

    tarefas.map( item => {
        
    })
}

function adicionarTarefa() {
    if(inputElement.value === ""){
        alert("Digite alguma tarefa!")
        return false;
    }else{
        let tarefaDigitada: string = inputElement.value;
        tarefas.push(tarefaDigitada);
        inputElement.value = "";
        salvarDados();
    }
}

buttonElement.onclick = adicionarTarefa

function salvarDados(){
    localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas))
}