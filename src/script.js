function selectProfile(profile) {
  localStorage.setItem("activeProfile", JSON.stringify(profile));

  if (profile.kids) {
    window.location.href = "/src/pages/contentKids/index.html";
  } else {
    window.location.href = "/src/pages/content/index.html";
  }
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
        window.location.href = '/src/pages/editProfile/index.html'
      } else {
        selectProfile(profile)
      }
    })

    container.appendChild(div)
  })

  addAddButton(profiles.length)
}


// Adicionar Perfil
const avatars = {
  adult: [
    "/public/assets/perfil-1.jpg",
    "/public/assets/perfil-2.jpg",
    "/public/assets/perfil-3.jpg",
    "/public/assets/perfil-4.jpg"
  ],
  kids: [
    "/public/assets/kids-1.jpg",
    "/public/assets/kids-2.png",
    "/public/assets/kids-3.png",
    "/public/assets/kids-4.png"
  ]
}

const MAX_PROFILES = 5;

function addAddButton(totalProfiles) {
  const container = document.querySelector('.profiles')

  const div = document.createElement('div')
  div.classList.add('profile')

  div.innerHTML = `
    <img src="/public/assets/addProfile.png">
    <p>Adicionar Perfil</p>
  `

  if (totalProfiles >= MAX_PROFILES) {
    div.classList.add('disabled')
  } else {
    div.addEventListener('click', () => {
      openModal()
    })
  }

  container.appendChild(div)
}

function openModal() {
  document.getElementById('imageModal').classList.remove('hidden');
  renderImages();
}

function closeModal(event) {
  if (!event || event.target.id === 'imageModal') {
    document.getElementById('imageModal').classList.add('hidden');
  }
}

function renderImages() {
  const grid = document.getElementById('imagesGrid');
  const isKids = document.getElementById('isKids').checked;

  const list = isKids ? avatars.kids : avatars.adult;

  grid.innerHTML = '';

  list.forEach(img => {
    const image = document.createElement('img');
    image.src = img;

    image.addEventListener('click', () => {
      selectImage(img);
    });

    grid.appendChild(image);
  });
}

document.getElementById('isKids').addEventListener('change', renderImages);

let selectedImage = null;

function selectImage(src) {
  selectedImage = src;
}

function createProfile() {
  const name = document.getElementById('profileName').value;
  const isKids = document.getElementById('isKids').checked;

  if (!name || !selectedImage) {
    alert('Preencha tudo!');
    return;
  }

  const profiles = JSON.parse(localStorage.getItem('profiles'));

  profiles.push({
    nome: name,
    img: selectedImage,
    kids: isKids
  });

  localStorage.setItem('profiles', JSON.stringify(profiles));

  closeModal();
  renderProfiles();
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
