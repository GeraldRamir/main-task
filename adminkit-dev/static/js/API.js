const url='http://localhost:3000/tareas'

export const guardartarea= async tarea=>{
    try {
        await fetch(url,{
          method: 'POST',
          body: JSON.stringify(tarea),
          headers: {
            'Content-Type': 'application/json'
          }

        })
        
    } catch (error) {
        console.log(error)
        
    }

}

export const obtenertareas= async ()=>{
    try {
        const resultado= await fetch(url)
        const respuesta= resultado.json()
        return respuesta
        
    } catch (error) {
        
    }
}



