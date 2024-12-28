const actualizarGraficoNueva = () => {
    const tareas = JSON.parse(localStorage.getItem('tareas-nuevas')) || [];
    const estados = { Pendiente: 0, "En curso": 0, Realizada: 0 };

    tareas.forEach(tarea => {
        estados[tarea.estado]++;
    });

    // Actualizar datos del gráfico
    estadoChartNueva.data.datasets[0].data = [estados.Pendiente, estados["En curso"], estados.Realizada];
    estadoChartNueva.update();
};

const cargarTareasNueva = () => {
    const tareas = JSON.parse(localStorage.getItem('tareas-nuevas')) || [];
    const tabla = document.getElementById('lista-tareas-nuevas');
    tabla.innerHTML = '';

    tareas.forEach((tarea, index) => {
        const fila = document.createElement('tr');

        // Crear y agregar las celdas individualmente
        const tdNombre = document.createElement('td');
        tdNombre.textContent = tarea.nombre;
        fila.appendChild(tdNombre);

        const tdDescripcion = document.createElement('td');
        tdDescripcion.textContent = tarea.descripcion;
        fila.appendChild(tdDescripcion);

        const tdEstado = document.createElement('td');
        tdEstado.textContent = tarea.estado;
        fila.appendChild(tdEstado);

        const tdAutor = document.createElement('td');
        tdAutor.textContent = tarea.autor;
        fila.appendChild(tdAutor);

        const tdCierre = document.createElement('td');
        tdCierre.textContent = tarea.cierre;
        fila.appendChild(tdCierre);

        // Crear y agregar los botones en una celda
        const tdAcciones = document.createElement('td');

        // Botón de "Cambiar Estado"
        const btnCambiarEstado = document.createElement('button');
        btnCambiarEstado.textContent = 'Cambiar Estado';
        btnCambiarEstado.classList.add('btn', 'btn-outline-success');
        btnCambiarEstado.onclick = function() {
            cambiarEstadoNueva(index);  // Llamar a la función para cambiar el estado
        };
        tdAcciones.appendChild(btnCambiarEstado);

        // Botón de "Eliminar"
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
        btnEliminar.onclick = function() {
            eliminarTarea(index);  // Llamar a la función para eliminar la tarea
        };
        tdAcciones.appendChild(btnEliminar);

        fila.appendChild(tdAcciones);

        // Añadir la fila a la tabla
        tabla.appendChild(fila);


        tdNombre.onclick = () => abrirModalSubtareas(index);
    });

    // Actualizar gráfico
    actualizarGraficoNueva();
};

const guardarTareasNueva = (tareas) => {
    localStorage.setItem('tareas-nuevas', JSON.stringify(tareas));
};

document.getElementById('form-tarea-nueva').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre-tarea-nueva').value;
    const descripcion = document.getElementById('descripcion-tarea-nueva').value;
    const estado = document.getElementById('estado-tarea-nueva').value;
    const autor = document.getElementById('nombre-autor').value;
    const cierre = document.getElementById('fecha-cierre').value;

    const nuevaTarea = { nombre, descripcion, estado, autor, cierre};
    const tareas = JSON.parse(localStorage.getItem('tareas-nuevas')) || [];
    tareas.push(nuevaTarea);

    guardarTareasNueva(tareas);
    cargarTareasNueva();
    this.reset();
});

const cambiarEstadoNueva = (index) => {
    const tareas = JSON.parse(localStorage.getItem('tareas-nuevas'));
    const estados = ['Pendiente', 'En curso', 'Realizada'];
    const estadoActual = tareas[index].estado;
    const nuevoEstado = estados[(estados.indexOf(estadoActual) + 1) % estados.length];

    tareas[index].estado = nuevoEstado;
    guardarTareasNueva(tareas);
    cargarTareasNueva();
};
const abrirModalSubtareas = (index) => {
    const tareas = JSON.parse(localStorage.getItem('tareas-nuevas'));
    const tarea = tareas[index];
    document.getElementById('modal-titulo').textContent = `Subtareas de: ${tarea.nombre}`; // Agregar título de la tarea
    const modal = new bootstrap.Modal(document.getElementById('modal-subtareas'));
    modal.show();
};
document.getElementById('form-subtarea').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombreSubtarea = document.getElementById('nombre-subtarea').value;
    const autor = document.getElementById('autor-subtarea').value;
    const estadoSubtarea = document.getElementById('estado-subtarea').value;
    
    // Crear una nueva fila en la tabla
    const nuevaSubtarea = { nombre: nombreSubtarea, autor, estado: estadoSubtarea };
    
    // Guardar las subtareas en el almacenamiento local
    const subtareas = JSON.parse(localStorage.getItem('subtareas-nuevas')) || [];
    subtareas.push(nuevaSubtarea);
    localStorage.setItem('subtareas-nuevas', JSON.stringify(subtareas));
    
    // Cargar la tabla de subtareas
    cargarSubtareas();
    
    // Limpiar el formulario
    this.reset();
});
const cargarSubtareas = () => {
    const subtareas = JSON.parse(localStorage.getItem('subtareas-nuevas')) || [];
    const tablaSubtareas = document.getElementById('lista-subtareas');
    tablaSubtareas.innerHTML = '';

    for (let i = 0; i < subtareas.length; i++) {
        const subtarea = subtareas[i];
        const fila = document.createElement('tr');
        
        const tdNombre = document.createElement('td');
        tdNombre.textContent = subtarea.nombre;
        fila.appendChild(tdNombre);

        const tdEstado = document.createElement('td');
        
        // Crear el badge según el estado de la subtarea
        const badge = document.createElement('span');
        badge.classList.add('badge');
        
        if (subtarea.estado === 'Pendiente') {
            badge.classList.add('bg-danger');  // Rojo para pendiente
            badge.textContent = 'Pendiente';
        } else if (subtarea.estado === 'En curso') {
            badge.classList.add('bg-warning');  // Amarillo para en curso
            badge.textContent = 'En curso';
        } else if (subtarea.estado === 'Realizada') {
            badge.classList.add('bg-success');  // Verde para realizada
            badge.textContent = 'Realizada';
        }

        tdEstado.appendChild(badge);
        fila.appendChild(tdEstado);

        const tdAutor = document.createElement('td');
        tdAutor.textContent = subtarea.autor;
        fila.appendChild(tdAutor);

        // Crear el botón de eliminar
        const tdAcciones = document.createElement('td');
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
        
        // Asignar una función para eliminar la tarea
        botonEliminar.onclick = function() {
            eliminarSubtarea(i);  // Llama a la función para eliminar la subtarea en el índice correspondiente
        };
        tdAcciones.appendChild(botonEliminar);
        fila.appendChild(tdAcciones);

        tablaSubtareas.appendChild(fila);
    }
}
const eliminarSubtarea = (indice) => {
    let subtareas = JSON.parse(localStorage.getItem('subtareas-nuevas')) || [];
    subtareas.splice(indice, 1);  // Elimina la subtarea en el índice especificado
    localStorage.setItem('subtareas-nuevas', JSON.stringify(subtareas));  // Actualiza el almacenamiento
    cargarSubtareas();  // Recarga las subtareas en la tabla
};

document.addEventListener('DOMContentLoaded', cargarSubtareas);


const eliminarTareaNueva = (index) => {
    const tareas = JSON.parse(localStorage.getItem('tareas-nuevas'));
    tareas.splice(index, 1);
    guardarTareasNueva(tareas);
    cargarTareasNueva();
};

// Inicializar gráfico
const ctx = document.getElementById('estadoChartNueva').getContext('2d');
const estadoChartNueva = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Pendiente', 'En curso', 'Realizada'],
        datasets: [{
            label: 'Tareas',
            data: [0, 0, 0],
            backgroundColor: ['#f39c12', '#3498db', '#2ecc71'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' }
        }
    }
});

// Cargar tareas y actualizar gráfico al iniciar la página
document.addEventListener('DOMContentLoaded', cargarTareasNueva);