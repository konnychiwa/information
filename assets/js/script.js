const list = document.getElementById('list')
const button = document.getElementById('button')

fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
.then(response => response.json())
.then(data => {
    let lastTen = data.slice(0, 10)
    lastTen.forEach(id => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then(response => response.json())
        .then(item => {
            console.log(item)
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


button.addEventListener('click', () => {
    fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
    .then(response => response.json())
    .then(data => {
        let nextTen = data.slice(10, 20)
        nextTen.forEach(id => {
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
            .then(response => response.json())
            .then(item => {
                console.log(item)
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
})


// https://jacobin.com/2024/08/behavioral-economics-exxon-valdez-elitism/
// https://arstechnica.com/gadgets/2024/08/tumblr-migrates-more-than-500-million-blogs-to-wordpress/