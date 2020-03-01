const makeList = (todo) => {    
    document.getElementById('list').insertAdjacentHTML('beforeend',`
        <li>
            <input type="checkbox"><label>${todo.title}</label>
            <div class="trash">
                <i class="fas fa-trash-alt"></i>
            </div>
        </li>
    `)    
    if (todo.completed) {
        var lastLI = document.getElementById('list').lastElementChild
        lastLI.firstElementChild.checked = true
        lastLI.classList.add('checked')
    }    
}

const removeList = (e) => {
    var target = e.target.tagName == 'I' ? e.target.parentNode : e.target            
    document.getElementById('list').removeChild(target.parentNode)
}

const clickList = (e) => {        
    var target  = e.target
    if(e.target.tagName == 'LABEL') {
        e.target.previousElementSibling.checked = !e.target.previousElementSibling.checked
        target = e.target.previousElementSibling        
    } 
    if (target.checked)
        target.parentNode.classList.add('checked')
    else target.parentNode.classList.remove('checked')        
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

document.getElementById('list').addEventListener('click',function(e) {    
    if(e.target.tagName == 'INPUT' || e.target.tagName == 'LABEL')
        clickList(e)
    if(e.target.tagName == 'I' || e.target.classList.contains('trash')) {
        removeList(e)
    }

})
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
