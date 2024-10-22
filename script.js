let articles = [
    {
        id: 1,
        title: 'Contoh Judul Artikel 1',
        date: '12/07/2024 14:33',
        content: 'Isi konten artikel 1'
    },
    {
        id: 2,
        title: 'Contoh Judul Artikel 2',
        date: '12/08/2024 14:33',
        content: 'Isi konten artikel 2'
    },
]

let fetchData = (data) => {
    let temp = ''
    
    data.forEach((d) => {
        temp += `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img src="https://placehold.co/800x600" class="img-fluid rounded-start article-img">
                    </div>
                    <div class="col-md-10">
                        <div class="card-body">
                            <h5 class="card-title">${d.title}</h5>
                            <p class="card-text"><small class="text-body-secondary">published at: ${d.date}</small></p>
                            <p class="card-text">${d.content}</p>
                            <button class="btn btn-danger delete-article" data-id="${d.id}">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    
    return temp
}

let updateArticles = () => {
    $('#article-section').html(fetchData(articles))
}

updateArticles()

$('form').on('submit', (e) => {
    e.preventDefault() // Prevent page reload on form submit
    
    // Get form values
    let title = $('input[type="text"]').val()
    let content = $('textarea').val()
    let date = new Date().toLocaleString() // Get current date and time

    // Generate a unique ID (incrementing the last article's ID)
    let newId = articles.length > 0 ? articles[articles.length - 1].id + 1 : 1

    if (!title) {
        alert('Judul artikel kosong!')
    }

    if (!content) {
        alert('Konten artikel kosong!')
    }

    if (title && content) {
        // Create new article object
        let newArticle = {
            id: newId,
            title: title,
            date: date,
            content: content
        }
    
        // Add new article to the array
        articles.push(newArticle)
    
        // Re-render the articles
        updateArticles()
    
        // Optionally, reset the form after submission
        $('form').trigger('reset')
    }
})

// Handle delete button click
$(document).on('click', '.delete-article', function() {
    let id = $(this).data('id') // Get the article ID from the button's data-id attribute

    // Filter out the article with the matching ID
    articles = articles.filter(article => article.id !== id)

    // Re-render the articles
    updateArticles()
})

$('.btn-create-new-article').on('click', () => {
    $('form').toggleClass('d-none')
})