//유저가 값을 입력한다
// +버튼을 클릭하면 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄
// 진행중 끝남 탭을 누르면 언더바 이동
// 끝남 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let underLine = document.getElementById("under-line");
let taskList=[]
let mode = 'all'
let filterList = []

addButton.addEventListener("click",addTask);
taskInput.addEventListener('keydown', function(event){
    if(event.key === "Enter"){
        addTask();
    }});

for (let i=1; i<tabs.length;i++){
    tabs[i].addEventListener("click",function (event) {
        filter(event);
    });
}


function addTask() {
    // let taskContent=taskInput.value
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    if(taskInput.value.length==0) {
        alert("할 일을 입력하세요")
    } else {
        taskList.push(task)
        console.log(taskList)
        taskInput.value=""
    }

    
    render()
}

function render(){
    let list=[]
    if(mode ==="all"){
        list = taskList;
    } else if (mode === "ongoing" || mode === "done"){
        list = filterList;
    }

    let resultHTML = ""
    for (let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML +=
            `<span class="task task-done" id="${list[i].id}">
                <div>${list[i].taskContent}</div>
                <div class="button-box">
                    <button onclick="toggleComplete('${list[i].id}')" class="box-style"><i class="fa-solid fa-rotate-right" style="color: gray;"></i></button>
                    <button onclick="deleteTask('${list[i].id}')" class="box-style"><i class="fa-solid fa-trash-can" style="color: #ff0000;"></i></button>
                </div>
            </span>`;
        } else{
            resultHTML +=
            `<div class="task" >
                <div>${list[i].taskContent}</div>
                <div class="button-box">
                    <button onclick="toggleComplete('${list[i].id}')" class="box-style"><i class="fa-solid fa-check" style="color: #008000;"></i></button>
                    <button onclick="deleteTask('${list[i].id}')" class="box-style"><i class="fa-solid fa-trash-can" style="color: #ff0000;"></i></button>
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

   filter()
   console.log(taskList)
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    filter()
}

function filter(event){
    // console.log("filter", event.target.id);
            if (event) {
          mode = event.target.id;
          underLine.style.width = event.target.offsetWidth + "px";
          underLine.style.left = event.target.offsetLeft + "px";
          underLine.style.top =
            event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
        }
    filterList = []
    if(mode=== "all") {
        render()

    } else if(mode === "ongoing") {
        for(let i=0;i<taskList.length;i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i])
            }
        } 
        render()
        console.log("진행중",filterList)
    } else if (mode=== "done") {
        for(let i=0;i<taskList.length;i++) {
            if(taskList[i].isComplete === true) {
                filterList.push(taskList[i])
            }
        } 
        render()
        console.log("완료",filterList)
    }
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}