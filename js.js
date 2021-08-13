const ArrayDatos=[]
const dni=document.getElementById("txtDni")
const permite=document.getElementById("radiop_1")
/* const nopermite=document.getElementById("radiop_2") */
const nnombre=document.getElementById("txtNombre")
const Resultado=document.getElementById("resultado")

document.getElementById("frmDatos").addEventListener("submit",fnComprobar)
document.getElementById("bbuscar").addEventListener("click",fnFiltrar)
document.getElementById("txtBusqueda").addEventListener("keyup",fnFiltrar)

function fnComprobar(e){
    e.preventDefault();
    

    
    if (nnombre.value.trim()===""){
        mostrarError("error","El nombre "+ nnombre.value + " no es valido")
        nnombre.focus()
        return
    }
    
    if (dni.value.trim()==="" || dni.value==="0"){
        mostrarError("error","El dni "+ dni.value + " no es valido")
        dni.focus()
        return
    }
    
    let resDuplicado=ArrayDatos.filter(valor=>valor.dni==dni.value)

    if (resDuplicado.length > 0){
        mostrarError("error","El dni "+ dni.value + " se encuentra cargado" + nnombre.value)
    }else{ 
        ArrayDatos.push({nombre:nnombre.value,dni:dni.value,permite:permite.checked})
        mostrarError("ok","El dni "+ dni.value + " fue cargado correctamente para " + nnombre.value)
        nnombre.focus()
        nnombre.value =""
        dni.value=""
    }

/*     console.log(resDuplicado.length)
    console.log(nnombre.value + " , " + dni.value + " , " + permite.checked + " , " + nopermite.checked)
    console.log(permite) */
    fnCargartabla(0)
    
}

function fnFiltrar(e){
    e.preventDefault();
    console.log(document.getElementById("txtBusqueda").value)
    fnCargartabla(document.getElementById("txtBusqueda").value)
}

let fnCargartabla=filtro=>{
    /* let cadena="<table><tbody><td>Nombre</td><td>DNI</td><td>Permite</td></tbody>" */
    cadena=""
    let elementos=""
    let permite="no"
    let resFiltrado=[]

    if (filtro){
        /* resFiltrado=ArrayDatos.filter(valor=>valor.nombre==filtro) */
        resFiltrado=ArrayDatos.filter(valor =>valor.nombre.toLowerCase().includes(filtro.toLowerCase()))
    }else {
        resFiltrado=ArrayDatos
    }
    console.log(resFiltrado)
    for (let index = 0; index < resFiltrado.length; index++) {
        permite=resFiltrado[index].permite==true?"si":"no"

        /* elementos = elementos + "<tr><td>" + resFiltrado[index].nombre + "</td>" + "<td>" + resFiltrado[index].dni + "</td>" + "<td>" + permite + "</td>" + "</tr>"; */
        elementos= elementos + "<div class='flex tarjeta'><p>"+ resFiltrado[index].nombre +"</p><p> " + resFiltrado[index].dni + "</p><p> " + permite + "</p></div>"
    }

    cadena=cadena + elementos/*  + "</table>" */
    /* console.log(cadena) */
    document.getElementById("listado_").innerHTML=cadena
}

function mostrarError(tipo,texto){
    switch (tipo){
        case "ok": Resultado.innerHTML="<p style='color:green;'> "+ texto + "</p>";
            break;
        case "error": Resultado.innerHTML="<p style='color:red;'> "+ texto + "</p>";
            break;
    }
}