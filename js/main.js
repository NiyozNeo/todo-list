const elTodoForm = document.querySelector('.todo-form')
const elTodoInput = document.querySelector('.todo-form__input')
const elTodoList = document.querySelector('.todo-list')
const elTodoTemplate = document.querySelector('#todo-item--template').content


let all = document.querySelector(".all-count")
let comp = document.querySelector(".complated-count")
let uncomp = document.querySelector(".uncomplated-count")

let allbtn = document.querySelector(".allbtn")
let completedbtn = document.querySelector(".completedbtn")
let uncompletedbtn = document.querySelector(".uncompletedbtn")
let clearbtn = document.querySelector(".clearbtn")

let foundbyType = []

const localTodos = JSON.parse(window.localStorage.getItem('todos'))
const todosArr = localTodos || []

function updateTodos() {
    window.localStorage.setItem('todos', JSON.stringify(todosArr))
    renderTodos(todosArr, elTodoList)
}

function handleDeleteTodo(evt) {
    const todoId = evt.target.dataset.todoId

    const foundTodoIndex = todosArr.findIndex(todo => todo.id == todoId)

    todosArr.splice(foundTodoIndex, 1)
    updateTodos()
}

function handleCompleteTodo(evt) {
    const todoId = evt.target.dataset.todoId

    const foundTodo = todosArr.find(todo => todo.id == todoId)

    foundTodo.isCompleted = !foundTodo.isCompleted

    updateTodos()
}

function renderTodos(arr, element) {
    element.innerHTML = null

    let compCount = 0
    all.textContent = todosArr.length
    todosArr.forEach(element => {
        if (element.isCompleted) {
            compCount += 1;
        }
    })

    comp.textContent = compCount
    uncompcount = todosArr.length - compCount
    uncomp.textContent = uncompcount

    arr.forEach(todo => {

        const todoTemplate = elTodoTemplate.cloneNode(true)

        const elInputComplete = todoTemplate.querySelector('.todo-input-complete')
        const elTodoText = todoTemplate.querySelector('.todo-item-complete-text')
        const elTodoDeleteBtn = todoTemplate.querySelector('.todo-item-delete-btn')

        elTodoText.textContent = todo.title
        elTodoDeleteBtn.dataset.todoId = todo.id
        elInputComplete.dataset.todoId = todo.id
        elInputComplete.checked = todo.isCompleted

        if (todo.isCompleted) {
            elTodoText.classList.add('text-danger')
            elTodoText.style.textDecoration = 'line-through'
        }

        elTodoDeleteBtn.addEventListener('click', handleDeleteTodo)
        elInputComplete.addEventListener('click', handleCompleteTodo)

        element.appendChild(todoTemplate)
    })
}

allbtn.addEventListener("click" , function () {
    foundbyType = todosArr
    renderTodos(foundbyType, elTodoList)
})

completedbtn.addEventListener("click" , function () {
    foundbyType = todosArr.filter(element =>{
        if(element.isCompleted){
            return element
        }
    })
    renderTodos(foundbyType, elTodoList)
})

uncompletedbtn.addEventListener("click" , function () {
    foundbyType = todosArr.filter(element =>{
        if(!element.isCompleted){
            return element
        }
    })
    renderTodos(foundbyType, elTodoList)
})
clearbtn.addEventListener("click" , () => {
    todosArr.splice(0, todosArr.length);
    updateTodos()
})
elTodoForm.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const todoInput = elTodoInput.value.trim()
    const uniqueId = todosArr[todosArr.length - 1] ? todosArr[todosArr.length - 1].id : 0

    todosArr.push({
        id: uniqueId + 1,
        title: todoInput,
        isCompleted: false
    })

    updateTodos()

    elTodoInput.value = null
})

renderTodos(todosArr, elTodoList)