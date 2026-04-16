const API_KEY = "4f18021b7a0133b6c8430c8de4e33af6"
const BASE_URL = "https://api.themoviedb.org/3"

async function fetchMovies(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}&language=pt-BR`)
  const data = await res.json()
  return data.results
}


async function getNetflixPopular() {
  return await fetchMovies(
    "/discover/movie?sort_by=popularity.desc&with_watch_providers=8&watch_region=BR"
  )
}


async function getNetflixTopRated() {
  return await fetchMovies(
    "/discover/movie?vote_average.gte=7&with_watch_providers=8&watch_region=BR"
  )
}


async function getNetflixRecent() {
  return await fetchMovies(
    "/discover/movie?sort_by=release_date.desc&with_watch_providers=8&watch_region=BR"
  )
}


async function getKidsMovies() {
  return await fetchMovies(
    "/discover/movie?with_genres=16&watch_region=BR&sort_by=popularity.desc"
  )
}


async function getKidsAnimationMovies() {
  return await fetchMovies(
    "/discover/movie?with_genres=16&with_watch_providers=8&watch_region=BR&sort_by=popularity.desc"
  )
}


async function getKidsTopRated() {
  return await fetchMovies(
    "/discover/movie?with_genres=16&with_watch_providers=8&watch_region=BR&vote_average.gte=7&sort_by=vote_average.desc"
  )
}


async function getMovieTrailer(movieId) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=pt-BR`
  )

  const data = await res.json()

  return data.results.find(video => video.type === "Trailer")
}
