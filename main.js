//유저가 값을 입력한다
// +버튼을 클릭하면 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄
// 진행중 끝남 탭을 누르면 언더바 이동
// 끝남 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList=[]
addButton.addEventListener("click",addTask);

function addTask() {
    // let taskContent=taskInput.value
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    console.log(taskList)
    render()
}

function render(){
    let resultHTML = ""
    for (let i=0;i<taskList.length;i++){
        if(taskList[i].isComplete == true){
            resultHTML +=
            `<span class="task task-done" id="${taskList[i].id}">
                <div>${taskList[i].taskContent}</div>
                <div class="button-box">
                    <button onclick="toggleComplete('${taskList[i].id}')" class="box-style"><i class="fa-solid fa-rotate-right" style="color: gray;"></i></button>
                    <button onclick="deleteTask('${taskList[i].id}')" class="box-style"><i class="fa-solid fa-trash-can" style="color: #ff0000;"></i></button>
                </div>
            </span>`;
        } else{
            resultHTML +=
            `<div class="task" >
                <div>${taskList[i].taskContent}</div>
                <div class="button-box">
                    <button onclick="toggleComplete('${taskList[i].id}')" class="box-style"><i class="fa-solid fa-check" style="color: #008000;"></i></button>
                    <button onclick="deleteTask('${taskList[i].id}')" class="box-style"><i class="fa-solid fa-trash-can" style="color: #ff0000;"></i></button>
                </div>
            </div>`;
            
        }

        
    }
    
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
   console.log("id:",id); 
   for(let i=0;i<taskList.length;i++){
    if(taskList[i].id == id) {
        taskList[i].isComplete = !taskList[i].isComplete;
        break;
    }
   }

   render()
   console.log(taskList)
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render()
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}