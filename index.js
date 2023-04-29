const apiKey = "3103fcc28b7fed67402ee0f6c93054fa"
const URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
const imgURL = "https://image.tmdb.org/t/p/w1280"
const searchURL =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="

const form = document.getElementById("search-form")
const query = document.getElementById("query")
const root = document.getElementById("root")
let movies = [],
    page = 1,
    inSearchPage = false

    
// Fetch json data from URL
async function fetchData(URL) {
    try {
        const data = await fetch(URL).then((res) => res.json())
        return data
    } catch (error) {
        console.log(error.message)
        return null
    }
}
const fetchAndShowResults = async (URL) => {
    const data = await fetchData(URL)
    data && showResults(data.results)
}
const getSpecificPage = (page) => {
    const URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`
    fetchAndShowResults(URL);
    console.log("lets see changes")
}
const movieCard = (movie) =>
    `<div class="col">
          <div class="card">
            <a class="card-media">
              <img class="image-change"src="${movie.poster_path}" width="100%" />
            </a>
            <div class="card-content">
              <div class="card-cont-header">
                <div class="cont-left">
                  <h3 style="font-weight: 600">${movie.original_title}</h3>
                  <span style="color: #12efec"><span id="release-date">Release-Date</span> : ${movie.release_date}</span>
                  <div id="rating">Ratings : ${movie.vote_average}</div>
                </div>
                <div class="cont-right">
                  
                </div>
              </div>
              <div class="describe">
                ${movie.overview}
              </div>
            </div>
          </div>
        </div>`
const showResults = (items) => {
    let content = !inSearchPage ? root.innerHTML : ""
    if (items && items.length > 0) {
        items.map((item) => {
            let { poster_path, original_title, release_date, overview, vote_average} = item
            if (poster_path) {
                poster_path = imgURL + poster_path
            } else {
                poster_path = "MINOR_PROJECT/oops.jpeg"
            }
            if (original_title.length > 15) {
                original_title = original_title.slice(0, 15) + "..."
            }
            if (!overview) {
                overview = "No overview yet..."
            }
            if (!release_date) {
                release_date = "No release date"
            }
            if (!vote_average) {
                vote_average = "No ratings"
            }
            const movieItem = {
                poster_path,
                original_title,
                release_date,
                overview,
                vote_average
            }
            content += movieCard(movieItem)
        })
    } else {
        content += "<p>Something went wrong!</p>"
    }
    root.innerHTML = content // Inject content to root
}
const handleLoadMore = () => {
    getSpecificPage(++page)
}
// const detectEndAndLoadMore = (e) => {
//     let el = document.documentElement
//     if (
//         !inSearchPage &&
//         el.scrollTop + el.clientHeight == el.scrollHeight
//     ) {
//         console.log("BINGO!")
//         handleLoadMore()
//     }
// }
form.addEventListener("submit", async (e) => {
    inSearchPage = true
    e.preventDefault()
    const searchTerm = query.value
    searchTerm && fetchAndShowResults(searchURL + searchTerm)
    query.value = ""
})
// window.addEventListener("scroll", detectEndAndLoadMore)

function init() {
    inSearchPage = false
    fetchAndShowResults(URL)
}
init();