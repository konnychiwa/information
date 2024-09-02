const list = document.getElementById('list')
const button = document.getElementById('button')

const fetchItems = (start, end) => {
    fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
    .then(response => response.json())
    .then(data => {
        let items = data.slice(start, end)
        items.forEach(id => {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
            .then(response => response.json())
            .then(item => {
                let itemHTML = `
                    <li>
                        <h2><a href="${item.url}">${item.title}</a></h2>
                        <p><strong>Published</strong> on: ${new Date(item.time * 1000).toLocaleString()}</p>
                    </li>
                `
                list.insertAdjacentHTML('beforeend', itemHTML)
            })
        })
    })
}

fetchItems(0, 10);

button.addEventListener('click', () => fetchItems(10, 20));