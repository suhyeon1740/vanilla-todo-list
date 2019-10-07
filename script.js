const makeList = (content) => {
    let li = document.createElement('li')
    li.innerHTML = `<label><input type="checkbox">${content}</label>`
    let btn = document.createElement('button')
    btn.innerText = '삭제'
    btn.addEventListener('click', removeList)
    li.appendChild(btn)
    li.addEventListener('click', clickList)
    document.getElementById('list').appendChild(li)
}

const removeList = (e) => {    
    document.getElementById('list').removeChild(e.target.parentNode)    
}

const clickList = (e) => {
    // TODO: li를 클릭해도 똑같이 동작해야 함
    if (e.target.tagName === 'INPUT') {
        if (!e.target.checked)
            e.target.parentNode.style.textDecoration = 'none'
        else e.target.parentNode.style.textDecoration = 'line-through'
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