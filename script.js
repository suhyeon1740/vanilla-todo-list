const makeList = (todo) => {
    let li = document.createElement('li')
    li.innerHTML = `<label>${todo.title}</label>`
    let checkbox = document.createElement('input')
    checkbox.type = "checkbox"
    li.insertBefore(checkbox, li.firstElementChild)
    let btn = document.createElement('div')
    btn.classList.add('trash')
    btn.innerHTML = '<i class="fas fa-trash-alt"></i>'
    btn.addEventListener('click', removeList)
    li.appendChild(btn)
    li.addEventListener('click', clickList)
    if(todo.completed) {
        checkbox.checked = true
        li.classList.add('checked')
    }
    document.getElementById('list').appendChild(li)
}

const removeList = (e) => {       
    if (e.target.tagName === 'DIV') {
        document.getElementById('list').removeChild(e.target.parentNode)    
    } else {
        document.getElementById('list').removeChild(e.target.parentNode.parentNode)    
    }
}

const clickList = (e) => {
    // TODO: li를 클릭해도 똑같이 동작해야 함
    if (e.target.tagName === 'INPUT') {
        if (e.target.checked)
            e.target.parentNode.classList.add('checked')
            //e.target.parentNode.style.textDecoration = 'none'
        else e.target.parentNode.classList.remove('checked')
    }
}

const addList = () => {
    let content = document.getElementById('content').value
    if (!content) {
        alert('내용을 입력하세요.')
        return
    }
    makeList({
        title: content,
        completed: false
    })
    document.getElementById('content').value = ''
}

document.getElementById('add').addEventListener('click', addList)

document.getElementById('content').addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        addList()
    }
})

getData()
function getData() {
    fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
    .then(res => {
        if (res.status == 200) {
            return res.json()
        } else {
            console.log(res.statusText)
        }
    })
    .then(jsonData => {
        for (const index in jsonData) {
            makeList(jsonData[index])
        }
    })
}
