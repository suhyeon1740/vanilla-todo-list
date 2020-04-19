const makeList = (todo) => {    
    document.getElementById('list').insertAdjacentHTML('beforeend',`
        <li id=${todo.id}>
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
    var id = target.parentElement.id
    fetch(`http://localhost:3000/todos?id=${id}`, {
        method: 'DELETE'
    })
    .then(() => document.getElementById('list').removeChild(target.parentNode))      
}

const clickList = (e) => {        
    var target  = e.target
    var id = e.target.parentElement.id
    if(e.target.tagName == 'LABEL') {
        e.target.previousElementSibling.checked = !e.target.previousElementSibling.checked
        target = e.target.previousElementSibling        
    } 
    fetch('http://localhost:3000/todos', {
        method: 'PATCH',
        body: JSON.stringify({
            id: id,
            completed: target.checked
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        // if (target.checked)
        //     target.parentNode.classList.add('checked')
        // else target.parentNode.classList.remove('checked')
        getData()
    })
}

const addList = () => {
    let content = document.getElementById('content').value
    if (!content) {
        alert('내용을 입력하세요.')
        return
    }
    let data = {
        title: content
    }
    fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: JSON.stringify(data), // JavaScript 값이나 객체를 JSON 문자열로 변환합니다
        headers: {
            // HTTP 요청을 하게 되면 서버가 JSON 타입으로 변환해서 사용한다.
            'Content-Type': 'application/json'
        }
    }).then(res => res)
    .then(() => {
        getData()
        // makeList()
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
    fetch('http://localhost:3000/todos')
    .then(res => {
        if (res.status == 200) {
            return res.json()
        } else {
            console.log(res.statusText)
        }
    })
    .then(jsonData => {
        document.getElementById('list').innerHTML = ""
        for (const index in jsonData) {
            makeList(jsonData[index])
        }
    })
}
