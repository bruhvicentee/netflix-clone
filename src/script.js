function selectProfile(name) {
    alert("Bem-vindo, " + name + '!')
}


if (!localStorage.getItem('profiles')) {
  const defaultProfiles = [
    {
      nome: "Perfil 1",
      img: "/public/assets/perfil-1.jpg",
      kids: false
    },
    {
      nome: "Perfil 2",
      img: "/public/assets/perfil-2.jpg",
      kids: false
    }
  ]

  localStorage.setItem('profiles', JSON.stringify(defaultProfiles))
}


// Perfis
function renderProfiles() {
  const container = document.querySelector('.profiles')
  const profiles = JSON.parse(localStorage.getItem('profiles'))

  container.innerHTML = ``

  profiles.forEach((profile, index) => {
    const div = document.createElement('div')
    div.classList.add('profile')

    div.innerHTML = `
      <div class="img-container">
        <img src="${profile.img}">
        <div class="edit-icon">✏️</div>
      </div>
      <p>${profile.nome}</p>
    `

    div.addEventListener('click', () => {
      if (editMode) {
        localStorage.setItem('profileIndex', index)
        window.location.href = './pages/editProfile/index.html'
      } else {
        selectProfile(profile.nome)
      }
    })

    container.appendChild(div)
  })

  addAddButton()
}


// Adicionar Perfil
function addAddButton() {
  const container = document.querySelector('.profiles')

  const div = document.createElement('div')
  div.classList.add('profile')

  div.innerHTML = `
    <img src="/public/assets/addProfile.png">
    <p>Adicionar Perfil</p>
  `

  div.addEventListener('click', () => {
    const name = prompt('Nome do perfil:')

    if (!name) return

    const profiles = JSON.parse(localStorage.getItem('profiles'))

    profiles.push({
      nome: name,
      img: "https://i.pravatar.cc/150?img=" + Math.floor(Math.random()*70)
    })

    localStorage.setItem('profiles', JSON.stringify(profiles))

    renderProfiles()
  })

  container.appendChild(div)
}


// Gerenciar Perfis
const manageBtn = document.querySelector('.button')
const title = document.querySelector('h1')

let editMode = false

manageBtn.addEventListener('click', () => {
  editMode = !editMode
  document.body.classList.toggle('editing')

  if (editMode) {
    manageBtn.innerText = 'OK'
    title.innerText = 'Gerenciar perfis:'
  } else {
    manageBtn.innerText = 'Gerenciar perfis'
    title.innerText = 'Quem está assistindo?'
  }
})


document.addEventListener('DOMContentLoaded', () => {
  renderProfiles()
})
