const form=document.querySelector('form');
const task_btn = document.querySelector('.add-task__btn');
const title_input = document.querySelector('#title');
const desc_input = document.querySelector('#desc');
const task_container=document.querySelector('.task__item--container');
const search_input = document.querySelector('.search__input');

const task_count = document.querySelector('.task_count')
const task_updated = document.querySelector('.task_updated')
const task_deleted = document.querySelector('.task_deleted')

let editing=false;
let taskId;

let tasklists=[]

form.addEventListener('submit',event=>{
    event.preventDefault();

    let title=title_input.value.trim()
    let desc=desc_input.value.trim()

    if(!editing){
        const task={title,desc,date:new Date(),id:Date.now()}
        addTask(task)
    } else {
        editTask(taskId)
    }

    title_input.value=""
    desc_input.value=""
    title_input.focus()
});

search_input.addEventListener('input',event=>{
    searchTask(event.target.value.toLowerCase())
});

const addTask= task=>{

    let matched=false;

    if(tasklists.length==0){
        tasklists.push(task)
        displayTasks(tasklists);
        return;
    }

    for(let item of tasklists){
        if(item.title==task.title){
            matched=true;
            break;
        }
    }

    if(!matched){
        tasklists.push(task)
        displayTasks(tasklists);
    }

    console.log(tasklists)
}

const editTask=id=>{

    task_updated.innerHTML=Number.parseInt(task_updated.innerHTML) + 1;

    tasklists.forEach(task=>{
        if(task.id == id){
            task.title=title_input.value.trim()
            task.desc=desc_input.value.trim()
        }
    })

    displayTasks(tasklists);
    task_btn.innerHTML='Add task'
    editing=false;
}

const deleteTask=id=>{
    task_deleted.innerHTML=Number.parseInt(task_deleted.innerHTML) + 1;
    const filteredArray=tasklists.filter(task=>{
        return task.id != id
    })

    tasklists=filteredArray;

    displayTasks(tasklists);
}

task_container.addEventListener('click',event=>{
    const targetNode=event.target.closest('button');

    if(targetNode.classList.contains('btn-delete')){
        deleteTask(targetNode.dataset.id)
    }

    if(targetNode.classList.contains('btn-edit')){
        task_btn.innerHTML='Update task'
        tasklists.forEach(task=>{
            if(task.id == targetNode.dataset.id){
                title_input.value=task.title
                desc_input.value=task.desc
                taskId=task.id;
            }
            editing=true;
        })
    }
})

const searchTask= inputText=>{
    setTimeout(() => {
        const filteredTask=tasklists.filter(item=>{
            console.log(item.title.toLowerCase())
            return item.title.toLowerCase().includes(inputText)
        })

        filteredTask
        displayTasks(filteredTask);
    }, 500);
}

const displayTasks= lists=>{

    task_container.innerHTML="";
    task_count.innerHTML=tasklists.length

    lists.forEach(task=>{
        task_container.insertAdjacentHTML('beforeend',`
        <div class="task__item">
            <div class="task__heading">
                <h4>${task.title}</h4>
            </div>
            <div class="task__desc">
                <p>${task.desc}</p>
            </div>
            <div class="task__btn--area">
                <button class="btn-edit" data-id="${task.id}"><i class="fa fa-pencil-square"></i></button>
                <button class="btn-delete" data-id="${task.id}"><i class="fa fa-trash"></i></button>
            </div>
        </div>
    `)
    })

}