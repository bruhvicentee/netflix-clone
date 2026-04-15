function Navbar(profile = "") {
  return `
    <header class="navbar">

      <nav class="logo" id="logo">
        <img src="/public/assets/icon-netflix.png" alt="Logo Netflix">
      </nav>

      <div class="nav-right">

        <div class="profile-box">
            <img src="${profile.img}" class="profile-img">
            <span class="profile-name">${profile.nome}</span>
        </div>
      </div>

    </header>
  `
}


let navbarStyleLoaded = false

function injectNavbarStyles() {
  if (navbarStyleLoaded) return

  const style = document.createElement("style")

  style.innerHTML = `
    .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 10px 30px;
    position: fixed; /* melhor que absolute */
    top: 0;
    left: 0;
    width: 100%;

    z-index: 1000;
    background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
    }

    .logo img {
    width: 170px;
    cursor: pointer;
    }

    .nav-right {
    display: flex;
    align-items: center;
    gap: 15px;
    }

    .profile-box {
    display: flex;
    align-items: center;
    gap: 8px;
    }

    .profile-img {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
    }

    .profile-name {
    color: #fff;
    font-size: 14px;
    }
  `

  document.head.appendChild(style)
  navbarStyleLoaded = true
}


function loadNavbar(profile) {
  injectNavbarStyles()
  
  const container = document.getElementById("navbar")
  container.innerHTML = Navbar(profile)

  document.getElementById("logo").addEventListener("click", () => {
    window.location.href = "/src/index.html"
  })
}
