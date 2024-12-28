const actualizarGraficoOtro = () => {
    const tareas = JSON.parse(localStorage.getItem('tareas-otro')) || [];
    const estados = { Pendiente: 0, "En curso": 0, Realizada: 0 };

    tareas.forEach(tarea => {
        estados[tarea.estado]++;
    });

    // Actualizar datos del gráfico
    estadoChartOtro.data.datasets[0].data = [estados.Pendiente, estados["En curso"], estados.Realizada];
    estadoChartOtro.update();
};

const cargarTareasOtro = () => {
    const tareas = JSON.parse(localStorage.getItem('tareas-otro')) || [];
    const tabla = document.getElementById('lista-tareas-otras');
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

    const tdRecurso = document.createElement('td');
    tdRecurso.textContent = tarea.recurso;
    fila.appendChild(tdRecurso);

    // Crear y agregar los botones en una celda
    const tdAcciones = document.createElement('td');

    // Botón de "Cambiar Estado"
    const btnCambiarEstado = document.createElement('button');
    btnCambiarEstado.textContent = 'Cambiar Estado';
    btnCambiarEstado.classList.add('btn', 'btn-outline-success');
    btnCambiarEstado.onclick = function() {
        cambiarEstadoOtro(index);  // Llamar a la función para cambiar el estado
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
    actualizarGraficoOtro();
};

const guardarTareasOtro = (tareas) => {
    localStorage.setItem('tareas-otro', JSON.stringify(tareas));
};

document.getElementById('form-tarea-otro').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre-tarea-otro').value;
    const descripcion = document.getElementById('descripcion-tarea-otro').value;
    const estado = document.getElementById('estado-tarea-otro').value;
    const autor = document.getElementById('nombre-autor').value;
    const recurso = document.getElementById('nombre-recurso').value;

    const nuevaTarea = { nombre, descripcion, estado, autor, recurso};
    const tareas = JSON.parse(localStorage.getItem('tareas-otro')) || [];
    tareas.push(nuevaTarea);

    guardarTareasOtro(tareas);
    cargarTareasOtro();
    this.reset();
});

const cambiarEstadoOtro = (index) => {
    const tareas = JSON.parse(localStorage.getItem('tareas-otro'));
    const estados = ['Pendiente', 'En curso', 'Realizada'];
    const estadoActual = tareas[index].estado;
    const nuevoEstado = estados[(estados.indexOf(estadoActual) + 1) % estados.length];

    tareas[index].estado = nuevoEstado;
    guardarTareasOtro(tareas);
    cargarTareasOtro();
};
const abrirModalSubtareas = (index) => {
    const tareas = JSON.parse(localStorage.getItem('tareas-otro'));
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
    const subtareas = JSON.parse(localStorage.getItem('subtareas-otro')) || [];
    subtareas.push(nuevaSubtarea);
    localStorage.setItem('subtareas-otro', JSON.stringify(subtareas));
    
    // Cargar la tabla de subtareas
    cargarSubtareas();
    
    // Limpiar el formulario
    this.reset();
});
const cargarSubtareas = () => {
    const subtareas = JSON.parse(localStorage.getItem('subtareas-otro')) || [];
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
    let subtareas = JSON.parse(localStorage.getItem('subtareas-otro')) || [];
    subtareas.splice(indice, 1);  // Elimina la subtarea en el índice especificado
    localStorage.setItem('subtareas-otro', JSON.stringify(subtareas));  // Actualiza el almacenamiento
    cargarSubtareas();  // Recarga las subtareas en la tabla
};

document.addEventListener('DOMContentLoaded', cargarSubtareas);

const eliminarTareaOtro = (index) => {
    const tareas = JSON.parse(localStorage.getItem('tareas-otro'));
    tareas.splice(index, 1);
    guardarTareasOtro(tareas);
    cargarTareasOtro();
};

// Inicializar gráfico
const ctx = document.getElementById('estadoChartOtro').getContext('2d');
const estadoChartOtro = new Chart(ctx, {
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
document.addEventListener('DOMContentLoaded', cargarTareasOtro);
