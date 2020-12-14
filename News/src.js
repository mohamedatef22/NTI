function createNewElemet(element,classList){
    const el = document.createElement(element)
    el.classList.add(...classList)
    return el
}

function createCard(imgSrc,titleContent,href){
    const parentDiv = createNewElemet('div',['card','col-12','col-lg-3','mx-1','mb-3'])
    const img = createNewElemet('img',['card-img-top'])
    img.src = imgSrc
    img.alt = 'Card image cap'
    parentDiv.appendChild(img)
    const contentDiv = createNewElemet('div',['card-body','d-flex','flex-column'])
    const title = createNewElemet('h5',['card-title'])
    title.innerText = titleContent
    const a = createNewElemet('a',['btn','btn-primary','mt-auto'])
    a.href = href
    a.target="_blank"
    a.innerText = 'Read more'
    contentDiv.appendChild(title)
    contentDiv.appendChild(a)
    parentDiv.appendChild(contentDiv)
    return parentDiv
}



fetch("http://newsapi.org/v2/top-headlines?country=eg&category=science&apiKey=f846b25e5399422e9dbe9d42128d5a4f")
.then(
    res=>{
        if(res.status == 200) return res.json()
        else throw new Error('Server Error')
    }
)
.then(
    data=>{
        console.log(data)
        data['articles'].forEach(element => {
            const div = document.querySelector('body div')
            const card = createCard(element.urlToImage,element.title
                ,element.url)
            div.appendChild(card)
        });
    }
)
.catch(
    e=>console.log(e)
)