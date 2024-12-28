import {guardartarea, obtenertareas} from "./API.js"
(function() {
    const formulario= document.querySelector('#formulario')


    document.addEventListener('DOMContentLoaded', ()=>{
        formulario.addEventListener('submit', validar)
        mostrarTareas()
    })
    
    
    
    function validar(e){
        e.preventDefault()
        const nombre= document.querySelector("#nombre-tarea").value
        const autor= document.querySelector('#nombre-autor').value
        const fechaCierre= document.querySelector('#fecha-cierre').value
        const descripcion= document.querySelector('#descripcion').value
        const estado= document.querySelector('#estado-tarea').value
        const tareas= {
            nombre,
            autor,
            fechaCierre,
            descripcion,
            estado
        }
        
        if (Object.values(tareas).some(campo=> campo==='')) {
            mostrarAlerta('Campos vacios')
            
        }else{
            guardartarea(tareas)
           
        }  
    
    }
    const mostrarAlerta= (mensaje)=>{
    
    const tareasForm= document.querySelector('#agg-tarea')
    // const texto= document.querySelector('.text-danger')
    const texto= document.createElement('P')
    const alerta= document.createElement('div')
    alerta.classList.add("alert", "alert-danger", "border-red-400", "px-4", "py-3", "rounded",  "max-w-lg", )
    texto.textContent= mensaje
    texto.classList.add("block", "fw-bold", "h4", "text-danger", "text-center")
    if(alerta.classList.contains('alert-danger')){
    
        alerta.appendChild(texto)
        tareasForm.appendChild(alerta)
    
        console.log('alerta')
        
    }
    
    }

    async function mostrarTareas(){
        const tareas=  await obtenertareas()
      
        const tabla = document.getElementById('lista-tareas');
        tabla.innerHTML = '';
    
        tareas.forEach((tarea) => {
            console.log(tarea.estado)
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
    
            // Crear y agregar los botones en una celda
            const tdAcciones = document.createElement('td');
    
            // Botón de "Cambiar Estado"
            const btnCambiarEstado = document.createElement('button');
            btnCambiarEstado.textContent = 'Cambiar Estado';
            btnCambiarEstado.classList.add('btn', 'btn-outline-primary');
            tdAcciones.appendChild(btnCambiarEstado);
    
            // Botón de "Eliminar"
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
            
            tdAcciones.appendChild(btnEliminar);
    
            fila.appendChild(tdAcciones);
    
            // Añadir la fila a la tabla
            tabla.appendChild(fila);

            actualizarGraficoNueva()
    
    
           
        });
    
        // Actualizar gráfico
   
    };
    const actualizarGraficoNueva = async () => {
        const tareas = await obtenertareas()
        const estados = { Pendiente: 0, "En curso": 0, Realizada: 0 };
    
        tareas.forEach(tarea => {
            estados[tarea.estado]++;
        });     
    
        // Actualizar datos del gráfico
        estadoChartNueva.data.datasets[0].data = [estados.Pendiente, estados["En curso"], estados.Realizada];
        estadoChartNueva.update();
    };
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
        
})()
