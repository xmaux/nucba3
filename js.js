const ArrayDatos=[]

function fnComprobar(e){
    e.preventDefault();
    
    let nnombre=document.getElementById("txtNombre")
    let dni=document.getElementById("txtDni")
    let permite=document.getElementById("radiop_1")
    let nopermite=document.getElementById("radiop_2")
    let Resultado=document.getElementById("resultado")
    
    if (nnombre.value.trim()===""){
        Resultado.innerHTML="<p> El nombre "+ nnombre.value + " no es valido</p>"
        return
    }
    
    if (dni.value.trim()==="" || dni.value==="0"){
        Resultado.innerHTML="<p> El dni "+ dni.value + " no es valido</p>" 
        dni.value="0"
        return
    }
    
    let resDuplicado=ArrayDatos.filter(valor=>valor.dni==dni.value)

    if (resDuplicado.length > 0){
        Resultado.innerHTML="<p> El dni "+ dni.value + " se encuentra cargado para " + nnombre.value + "</p>"
    }else{ 
        ArrayDatos.push({nombre:nnombre.value,dni:dni.value,permite:permite.checked})
        Resultado.innerHTML="<p style='color:green;'> El dni "+ dni.value + " fue cargado correctamente para " + nnombre.value + "</p>"
        nnombre.focus()
        nnombre.value =""
        dni.value=""
    }

/*     console.log(resDuplicado.length)
    console.log(nnombre.value + " , " + dni.value + " , " + permite.checked + " , " + nopermite.checked)
    console.log(permite) */
    fnCargartabla(0)
    
}

document.getElementById("frmDatos").addEventListener("submit",fnComprobar)
document.getElementById("bbuscar").addEventListener("click",fnFiltrar)

function fnFiltrar(e){
    e.preventDefault();
    console.log(document.getElementById("txtBusqueda").value)
    fnCargartabla(document.getElementById("txtBusqueda").value)
}

let fnCargartabla=filtro=>{
    let cadena="<table><tbody><td>Nombre</td><td>DNI</td><td>Permite</td></tbody>"
    let elementos=""
    let permite="no"
    let resFiltrado=[]

    if (filtro){
        /* resFiltrado=ArrayDatos.filter(valor=>valor.nombre==filtro) */
        resFiltrado=ArrayDatos.filter(valor=>valor.nombre.includes(filtro))
    }else {
        resFiltrado=ArrayDatos
    }
    console.log(resFiltrado)
    for (let index = 0; index < resFiltrado.length; index++) {
        if (resFiltrado[index].permite==true){
            permite="si"
        }else {
            permite="no"
        }

        elementos = elementos + "<tr><td>" + resFiltrado[index].nombre + "</td>" + "<td>" + resFiltrado[index].dni + "</td>" + "<td>" + permite + "</td>" + "</tr>";
    }

    cadena=cadena + elementos + "</table>"
    /* console.log(cadena) */
    document.getElementById("listado_").innerHTML=cadena
}

