function createRow(title, movies) {
    const section = document.createElement("section")
    section.classList.add("row")

    section.innerHTML = `
    <h2>${title}</h2>

    <div class="carousel-container">
      <button class="arrow left">◀</button>

      <div class="movies"></div>

      <button class="arrow right">▶</button>
    </div>
  `

    const container = section.querySelector(".movies")

    movies.forEach(movie => {
        const card = document.createElement("div")
        card.classList.add("movie-card")

        card.innerHTML = `
            <img 
            class="poster"
            src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
            >

            <div class="trailer-container"></div>
        `

        addHoverEffect(card, movie)

        container.appendChild(card)
    })

    const left = section.querySelector(".left")
    const right = section.querySelector(".right")

    left.addEventListener("click", () => {
        container.scrollBy({ left: -300, behavior: "smooth" })
    })

    right.addEventListener("click", () => {
        container.scrollBy({ left: 300, behavior: "smooth" })
    })

    return section
}


function addHoverEffect(card, movie) {
  let timeout

  card.addEventListener("mouseenter", () => {
    timeout = setTimeout(async () => {
      card.classList.add("active")

      const trailer = await getMovieTrailer(movie.id)

      if (!trailer) return

      const container = card.querySelector(".trailer-container")

      container.innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1"
          frameborder="0"
          allow="autoplay; fullscreen"
          class="trailer">
        </iframe>
      `
    }, 400)
  })

  card.addEventListener("mouseleave", () => {
    clearTimeout(timeout)

    card.classList.remove("active")

    const container = card.querySelector(".trailer-container")
    container.innerHTML = ""
  })
}


let trailerCache = {}

async function getMovieTrailer(movieId) {
    if (trailerCache[movieId]) return trailerCache[movieId]

    const res = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
    )

    const data = await res.json()
    const trailer = data.results.find(v => v.type === "Trailer")

    trailerCache[movieId] = trailer

    return trailer
}


async function loadHome() {
    const main = document.getElementById("main")

    const kids = await getKidsMovies()
    const animation = await getKidsAnimationMovies()
    const topRated = await getKidsTopRated()

    main.appendChild(createRow("Para a Criançada", kids))
    main.appendChild(createRow("Animações", animation))
    main.appendChild(createRow("Mais bem Avaliados", topRated))
}


async function loadBanner() {
  const movies = await getKidsMovies()

  const movie = movies[Math.floor(Math.random() * movies.length)]

  const banner = document.getElementById("banner")

  banner.style.backgroundImage = `
    url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
  `

  banner.innerHTML = `
    <div class="banner-content">
      <h1 class="banner-title">${movie.title}</h1>

      <p class="banner-description">
        ${movie.overview?.slice(0, 150) || "Sem descrição disponível"}...
      </p>

      <div class="banner-buttons">
        <button class="banner-btn play" id="playBtn">▶ Assistir</button>
        <button class="banner-btn info">ℹ Mais informações</button>
      </div>
    </div>

    <div class="banner-video hidden" id="bannerVideo"></div>
  `

  document.getElementById("playBtn").addEventListener("click", async () => {
    const trailer = await getMovieTrailer(movie.id);
  
    if (!trailer) {
      alert("Trailer não disponível");
      return;
    }
  
    const videoContainer = document.getElementById("bannerVideo");
  
    videoContainer.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=1"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen>
      </iframe>
    `;
  
    videoContainer.classList.remove("hidden");
  
    document.querySelector(".banner-content").style.opacity = "0";
  
    document.getElementById("closeVideo").addEventListener("click", () => {
      videoContainer.classList.add("hidden");
      videoContainer.innerHTML = "";
  
      document.querySelector(".banner-content").style.opacity = "1";
    });
  });
}


document.addEventListener("DOMContentLoaded", async () => {
    const profile = JSON.parse(localStorage.getItem("activeProfile"))

    if (!profile) {
        window.location.href = "/index.html"
        return
    }

    loadNavbar(profile)
    loadFooter()

    await loadBanner()
    await loadHome()
})
