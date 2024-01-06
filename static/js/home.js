const socket = io('http://localhost:8080')

const prodId = document.querySelectorAll(".btn-primary")
//OBTENEMOS EL ID DEL USUARIO
const user_id = document.getElementById('user_id').innerHTML

prodId.forEach(prod => {
    prod.addEventListener("click", (ev) => {
        socket.emit('newProduct', ev.target.id, user_id) //ENVIAMOS EL ID DEL USUARIO
    })
})
   
const logoutForm = document.querySelector('form')

logoutForm?.addEventListener('submit', async ev => {
    ev.preventDefault()

    const response = await fetch('/api/sessions/current', {
        method: 'DELETE'
    })

    if (response.status === 204) {
        window.location.href = '/login'
    } else {
        const error = await response.json()
        alert('Error: ' + error.message)
    }
})

