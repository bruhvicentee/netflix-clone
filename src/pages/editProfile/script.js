const index = Number(localStorage.getItem('profileIndex'))
const profiles = JSON.parse(localStorage.getItem('profiles'))
const profile = profiles[index]


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('profileImg').src = profile.img
  document.getElementById('nameInput').value = profile.nome
  updateRatingUI()
})


// Alterar imagem de perfil
function openImageSelector() {
  document.getElementById('imageModal').classList.remove('hidden')
}

function closeModal(event) {
  if (event.target.id === 'imageModal') {
    document.getElementById('imageModal').classList.add('hidden')
  }
}

function selectImage(imgSrc) {
  document.getElementById('profileImg').src = imgSrc
  profile.img = imgSrc

  document.getElementById('imageModal').classList.add('hidden')
}


//Alterar Idioma - (create /src/config/translation.js)
function toggleLanguageMenu() {
  document.getElementById('languageMenu').classList.toggle('hidden')
}


// Alterar classificação etária
function openRatingOptions() {
  const escolherInfantil = confirm(
    "Deseja ativar modo infantil?\n\nOK = Infantil\nCancelar = Todas classificações"
  )

  profile.kids = escolherInfantil
  profiles[index] = profile
  localStorage.setItem('profiles', JSON.stringify(profiles))

  updateRatingUI()
}

function updateRatingUI() {
  const button = document.getElementById('ratingButton')
  const text = document.getElementById('ratingText')

  if (profile.kids) {
    button.textContent = 'APENAS INFANTIL'
    text.textContent = 'apenas conteúdo infantil'
  } else {
    button.textContent = 'TODAS AS CLASSIFICAÇÕES ETÁRIAS'
    text.textContent = 'todas as classificações etárias'
  }
}


function save() {
  profile.nome = document.getElementById('nameInput').value
  profiles[index] = profile

  localStorage.setItem('profiles', JSON.stringify(profiles))

  window.location.href = '../../index.html'
}


function cancel() {
  window.location.href = '../../index.html'
}


function remove() {
  const confirmDelete = confirm('Tem certeza que deseja excluir?')

  if (!confirmDelete) return

  profiles.splice(index, 1)

  localStorage.setItem('profiles', JSON.stringify(profiles))

  window.location.href = '../../index.html'
}
