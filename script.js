//BOTÃO DE BUSCA DO REPOSITÓRIO

// Seleciona o formulário de busca
const repositorySearch = document.querySelector(".repository-search");
// Seleciona o campo de entrada de busca
const searchInput = repositorySearch.querySelector("input");
// Seleciona o botão de busca
const searchButton = repositorySearch.querySelector("button");
// Adiciona um ouvinte de evento de clique na janela
window.addEventListener('click', function (event) {
    // Verifica se o elemento clicado possui a classe '.repository-search'
    if(event.target.classList.contains('repository-search')) {
        // Se o elemento clicado for o formulário de busca, abre o input
        repositorySearch.classList.replace("repository-search", "invisible");
        searchButton.classList.add("search-button");
        searchInput.classList.add("search-input");
    } else if (!event.target.classList.contains("hidden-search")) {
        // Se o elemento clicado não possuir a classe '.hidden-search', oculta o input novamente
        repositorySearch.classList.replace("invisible", "repository-search");
        searchButton.classList.remove("search-button");
        searchInput.classList.remove("search-input");
    }
});

const repositorySection = document.querySelector('.repository-section')

hiddenSection = () => {
    repositorySection.classList.add("hidden-section");
}

const main = document.querySelector('.main-content')
const repositoryResult = document.createElement('section')
const repositoryHeader = document.createElement('header')
const gitHubImg = document.createElement('img')
const headerText = document.createElement('h1')
const headerSearch = document.createElement('form')
const headerInput = document.createElement('input')
const headerButton = document.createElement('button');

const repositoryMain = document.createElement('main')
const gridResult = document.createElement('div')
const gridText = document.createElement('div')
const h1 = document.createElement('h1')
const gridIcon = document.createElement('img')
const repositoryList = document.createElement('section')
const ul = document.createElement('ul')
const data = document.createElement('aside')
const profile = document.createElement('div')
const ID = document.createElement('h1')
const link = document.createElement('a')
const description = document.createElement('h3')

searchResult = () => {

   repositoryResult.classList.add('repository-result')
   main.appendChild(repositoryResult)

    repositoryHeader.classList.add('repository-header')
    repositoryResult.appendChild(repositoryHeader)

    gitHubImg.setAttribute('src', 'assets/Icons/bxl-github.svg')
    gitHubImg.classList.add('header-github-img')
    repositoryHeader.appendChild(gitHubImg)
    
    headerText.innerHTML = 'MY PROFILE'
    headerText.classList.add('header-text')
    repositoryHeader.appendChild(headerText)

    headerSearch.classList.add('header-search')
    repositoryHeader.appendChild(headerSearch)
    headerInput.classList.add('hidden-search')
    headerSearch.appendChild(headerInput)
    headerInput.setAttribute('required', 'true')
    headerButton.classList.add('hidden-search')
    headerSearch.appendChild(headerButton)

    repositoryMain.classList.add('result-main')
    repositoryMain.style.animation = 'zoom 1s ease-in-out'
    repositoryResult.appendChild(repositoryMain)

    gridResult.classList.add('grid-result')
    repositoryMain.appendChild(gridResult)

    gridText.classList.add('grid-text')
    gridResult.appendChild(gridText)

    h1.innerHTML = "Repositórios"
    gridText.appendChild(h1)

    gridIcon.classList.add('grid-icon')
    gridIcon.setAttribute('src', 'assets/Icons/File-icon.svg')
    gridText.appendChild(gridIcon)

    repositoryList.classList.add('repository-list')
    gridResult.appendChild(repositoryList)
    repositoryList.appendChild(ul)

    data.classList.add('data')
    gridResult.appendChild(data)

    profile.classList.add('profile')
    data.appendChild(profile)

    ID.classList.add('id')
    data.appendChild(ID)

    link.classList.add('link')
    data.appendChild(link)

    description.classList.add('description')
    data.appendChild(description)

    fetch(`https://api.github.com/users/${searchInput.value}`)
    .then((API)=> {return API.json()})
    .then((JsonReturn) => {
        profile.style.backgroundImage = `url(${JsonReturn.avatar_url})`
        ID.innerHTML = JsonReturn.name
        link.innerHTML = JsonReturn.login
        link.setAttribute("href", JsonReturn.html_url)
        link.setAttribute("target", "_blank")
        description.innerHTML = JsonReturn.bio
    }).catch()

    fetch(`https://api.github.com/users/${searchInput.value}/repos`)
    .then((API)=> {return API.json()})
    .then((JsonReturn) => {
        JsonReturn.forEach((repository) => {
            ul.innerHTML += `<li><a href="${repository.html_url}" target = "_blank">${repository.name}</a></li>`
        });
    }).catch()
       
    repositoryResult.classList.replace("hidden-result", "repository-result");
}

repositorySearch.onsubmit = async(event) =>{
    event.preventDefault()
        
    fetch(`https://api.github.com/users/${searchInput.value}`)
    .then((API)=> {return API.json()})
    .then((JsonReturn) => {
    
    if(JsonReturn.message === "Not Found"){
        const notFoundDiv = document.querySelector('.not-found')
        notFoundDiv.classList.add('notFoundDiv')
        notFoundDiv.innerHTML = `<h1>Usuário não encontrado!</h1>
                                <button class="btn">x</button>`
        notFoundDiv.style.display = 'flex'
        window.addEventListener('click', function (event) {
         if(event.target.classList.contains('btn')) {
            notFoundDiv.style.display = 'none'
         } 
     });
    } 
    else { 
    hiddenSection()
    searchResult()
    }
    }).catch()
}

window.addEventListener('click', function (event) {
    // Verifica se o elemento clicado possui a classe '.header-search'
    if(event.target.classList.contains('header-search')) {
        // Se o elemento clicado for o formulário de busca, abre o input
        headerSearch.classList.replace("header-search", "invisible");
        headerButton.classList.add("header-button");
        headerInput.classList.add("header-input");
    } else if (!event.target.classList.contains("hidden-search")) {
        // Se o elemento clicado não possuir a classe '.hidden-search', oculta o input novamente
        headerSearch.classList.replace("invisible", "header-search");
        headerButton.classList.remove("header-button");
        headerInput.classList.remove("header-input");
    }
});

window.addEventListener('click', function (event) {
        // Verifica se o elemento clicado possui a classe 'header-github-img'
    if(event.target.classList.contains('header-github-img')) {
        // Se o elemento clicado for a imagem, retorna para a primeira tela
        repositoryResult.classList.replace("repository-result", "hidden-result");
        repositorySection.classList.remove("hidden-section");

    } 
});

headerSearch.onsubmit = function(event) {
    event.preventDefault()
    const secondInput = headerSearch.querySelector('input')
    fetch(`https://api.github.com/users/${secondInput.value}`)
    .then((API)=> {return API.json()})
    .then((JsonReturn) => {
        profile.style.backgroundImage = `url(${JsonReturn.avatar_url})`
        ID.innerHTML = JsonReturn.name
        link.innerHTML = JsonReturn.login
        link.setAttribute("href", JsonReturn.html_url)
        link.setAttribute("target", "_blank")
        description.innerHTML = JsonReturn.bio
    }).catch()

    fetch(`https://api.github.com/users/${secondInput.value}/repos`)
    .then((API)=> {return API.json()})
    .then((JsonReturn) => {
        ul.innerHTML = ''
        JsonReturn.forEach((repository) => {
            ul.innerHTML += `<li><a href="${repository.html_url}" target = "_blank">${repository.name}</a></li>`
        });
    }).catch()
}
