import './styles/main.css'

const list = document.getElementById('list')
const button = document.getElementById('button')
let lastLoadedIndex = 10

const generateItemHTML = item => {
    return `
        <li>
            <h2><a href="${item.url}">${item.title}</a></h2>
            <p><strong>Published</strong> on: ${new Date(item.time * 1000).toLocaleString()}</p>
        </li>
    `
}

const renderList = items => {
    items.forEach(id => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then(response => response.json())
        .then(item => {
            list.insertAdjacentHTML('beforeend', generateItemHTML(item))
        })
    })
}

const fetchItems = (start, end) => {
    if (start === lastLoadedIndex) return
    lastLoadedIndex = start

    fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
    .then(response => response.json())
    .then(data => {
        let items = data.slice(start, end)
        renderList(items)
    })
}

fetchItems(0, 10);

button.addEventListener('click', () => fetchItems(lastLoadedIndex + 10, lastLoadedIndex + 20));
