import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 1. Toate importurile de la Laboratorul 2 trebuie să fie AICI SUS, alături de celelalte importuri.
import { destinatii } from './data/destinatii.js'
import { 
  getOrase, getNevizitate, totalZile, formatDestinatie, 
  numarPeTara, sortDupaZile, marcheazaVizitat, 
  adaugaDestinatie, stergeDestinatie 
} from './utils/destinatii.js'
import { fetchUsers, fetchUserById } from './api/orase.js'


// 2. Acum poți avea restul codului și afișările
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// ===== Laboratorul 2 =====
console.log('L2 Merge!')

// --- EXERCIȚIUL 1 ---
console.log('L2 Ex. 1 oraşe:', getOrase(destinatii))
console.log('L2 Ex. 1 nevizitate:', getNevizitate(destinatii).length)
console.log('L2 Ex. 1 zile de vizitat:', totalZile(getNevizitate(destinatii)))
console.log('L2 Ex. 1 \n' + destinatii.map(formatDestinatie).join('\n'))
console.log('L2 Ex. 1 pe ţară:', numarPeTara(destinatii))
console.log('L2 Ex. 1 cea mai lungă vizită:', sortDupaZile(destinatii)[0].oras)

// --- EXERCIȚIUL 2 ---
const dupaMarcare = marcheazaVizitat(destinatii, '1')
console.log('L2 Ex. 2 original:', destinatii[0].vizitat, ', listă nouă:', dupaMarcare[0].vizitat)
console.log('L2 Ex. 2 element refolosit:', destinatii[1] === dupaMarcare[1])

const noua = { id: '7', oras: 'Sevilla', tara: 'Spania', zile: 3, vizitat: false }
const dupaAdaugare = adaugaDestinatie(destinatii, noua)
console.log('L2 Ex. 2 după adăugare: original', destinatii.length, ', listă nouă', dupaAdaugare.length)

const dupaStergere = stergeDestinatie(dupaAdaugare, '2')
console.log('L2 Ex. 2 după ştergere:', dupaStergere.length)

// --- EXERCIȚIUL 3 ---
async function loadOrase() {
  try {
    const users = await fetchUsers()
    console.log('L2 Ex. 3 am primit', users.length, 'utilizatori')
    
    const oraseApi = users.map(user => user.address.city)
    console.log('L2 Ex. 3 oraşe:', oraseApi)
    
    const oraseLungi = oraseApi.filter(oras => oras.length > 10)
    console.log('L2 Ex. 3 nume mai lungi de 10 caractere:', oraseLungi.length)
    
    const user1 = await fetchUserById(1)
    console.log('L2 Ex. 3 oraşul utilizatorului 1:', user1.address.city)

  } catch (error) {
    console.error('L2 Ex. 3 nu am putut încărca datele:', error.message)
  }
}
loadOrase()