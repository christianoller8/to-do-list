const formulario = document.getElementById('formulario')
const listaTareas = document.getElementById('lista-tareas')
const input = document.getElementById('input')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
/* 
let tareas = {
    1667383305925: {
        id: 1667383305925,
        texto: 'Tarea #1',
        estado: false
    },
    1667383305925: {
        id: 1667384405928,
        texto: 'Tarea #2',
        estado: false
    }


}
*/
let tareas = {

}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})

listaTareas.addEventListener('click', e => {
    btnAction(e)
})

formulario.addEventListener('submit', e => {
    e.preventDefault()
    setTarea(e)
})

const setTarea = e => {
    if (input.value.trim() === '') {
    console.log('está vacío')
    return
    }
   
    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }

    tareas[tarea.id] = tarea
    console.log(tareas)
    formulario.reset()
    input.focus()

    pintarTareas()
}

const pintarTareas = () => {

    localStorage.setItem('tareas', JSON.stringify(tareas))

if (Object.values(tareas).length === 0) {
    listaTareas.innerHTML = `
    <div class="alert alert-dark">
        No hay tareas pendientes
    </div>
    `
    return
}

    listaTareas.innerHTML = ''
    Object.values(tareas).forEach(tarea => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto

        if (tarea.estado) {
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelectorAll('.fas')[0].classList.replace('fa-circle-check', 'fa-rotate-left')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }

        clone.querySelectorAll('.fa-solid')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fa-solid')[1].dataset.id = tarea.id
       

        fragment.appendChild(clone)
    })
    listaTareas.appendChild(fragment)
}

const btnAction = e => {
    if (e.target.classList.contains('fa-circle-check')) {
        tareas[e.target.dataset.id].estado = true
        pintarTareas()
        //console.log(tareas)
    }

    if (e.target.classList.contains('fa-rotate-left')) {
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
        //console.log(tareas)
    }
    

    if (e.target.classList.contains('fa-circle-minus')) {
        delete tareas[e.target.dataset.id]
        pintarTareas()
        //console.log(tareas)
    }
    e.stopPropagation()
}




// console.log(Date.now())

