const makeList = (content) => {
    let li = document.createElement('li')
    li.innerHTML = `<label><input type="checkbox">${content}</label>`
    let btn = document.createElement('div')
    btn.classList.add('trash')
    btn.innerHTML = '<i class="fas fa-trash-alt"></i>'
    btn.addEventListener('click', removeList)
    li.appendChild(btn)
    li.addEventListener('click', clickList)
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
    makeList(content)
    document.getElementById('content').value = ''
}

document.getElementById('add').addEventListener('click', addList)

document.getElementById('content').addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        addList()
    }
})

makeList('할일1')
makeList('할일2')