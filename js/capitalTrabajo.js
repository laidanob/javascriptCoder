// -------DEFINICIOENS DE VARIABLES Y ARRAYS---------
let saldoMateriales = 0 

// paso arrays a localstorage para que no se reseteen al recargar la app. (soy consciente del error de vulnerabilidad)

if(localStorage.getItem('materiales') == undefined){
let materiales = []
    localStorage.setItem("materiales",JSON.stringify(materiales))
}
let materiales = JSON.parse(localStorage.getItem("materiales"))

if(localStorage.getItem('transacciones') == undefined){
    let transacciones = []
    localStorage.setItem("transacciones",JSON.stringify(transacciones))
}
let transacciones = JSON.parse(localStorage.getItem("transacciones"))

const meses = ["Enero", "Febrero","Marzo", "Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

const tiposPagos = [
    {nombre: "Pago Cliente", signo: "+" },
    {nombre: "Pago Proveedor", signo: "-" },
    {nombre: "Extraccion", signo: "-" }]
    
let saldoMaterialesLocal = localStorage.getItem("saldoMateriales")
    
let saldoCuentasLocal = localStorage.getItem("saldoCuentas")

//FUNCIONES PARA ACTUALIZAR LS
const materialesToLocal = () =>{
    localStorage.setItem("materiales",JSON.stringify(materiales))
}

const transToLocal = () =>{
    localStorage.setItem("transacciones",JSON.stringify(transacciones))
}

const cuentasToLocal = (cuentas) =>{
    localStorage.setItem("cuentas",JSON.stringify(cuentas))
}

// // ------ ESTADOS-------
if (document.querySelector("#titulo").innerText == "Estados") { //uso este recurso para que se ejecute espeficianemnte
    let saldoTotal =  (saldoCuentasLocal) - (saldoMaterialesLocal)
    console.log(saldoTotal)
    document.getElementById("saldoConPagos").innerText = `Saldo Total: $${saldoTotal}`
    document.getElementById("saldoMateriales").innerText = `Saldo Materiales: $${saldoMaterialesLocal}`
    document.getElementById("saldoDisponible").innerText = `Saldo Disponible: $${saldoCuentasLocal}`
}
// // ------SECCION CUENTAS-------
//traigo por "API" un array con las cuentas
if(localStorage.getItem('cuentas') == undefined){
fetch("https://brunincoderhouse.madeinrabbit.com/js/cuentas.JSON",{mode: 'no-cors'})
    .then(cuentas => cuentas.json())
    .then(function(cuentas) {
        localStorage.setItem("cuentas",JSON.stringify(cuentas))
        let saldoCuentas = 0
        for (let i=0;i < cuentas.length;i++){
            saldoCuentas += cuentas[i].saldo
            localStorage.setItem("saldoCuentas",saldoCuentas)}
            location.reload();
        })}
    
            



if (document.querySelector("#titulo").innerText == "Cuentas"){
//muestra en el DOM las cuentas
const cuentas = JSON.parse(localStorage.getItem("cuentas"))
cuentas.forEach(cuenta => {
const div = document.createElement('div')
div.innerHTML = ` <p class="nombreCuenta">${cuenta.nombre}</p>
<p class="saldoCuenta">${cuenta.saldo}</p>`
document.getElementById("listadoCuentas").appendChild(div)
//actualizo el saldo del total de las cuentas para mostrarlo en "estados"  
let saldoCuentas = 0
for (let i=0;i < cuentas.length;i++){
    saldoCuentas += cuentas[i].saldo
    localStorage.setItem("saldoCuentas",saldoCuentas); }


})}
//traiga las cuentas del localS

// // ------SECCION TRANSACCIONES-------

if (document.querySelector("#titulo").innerText == "Transacciones"){
    //creo funcion y actualizo la vista por si hay datos en LocalS
    const actualizarVistaTrans = () => {
        contenedor = document.getElementById("contenedorTrans")
        contenedor.innerHTML = ""
        transacciones.forEach(transaccion => {
            const div = document.createElement("div")
            div.innerHTML = ` <p class="valor">${transaccion.valor}</p>
            <p class="cuentaTransC">${transaccion.cuenta}</p>
            <p class="tipo" >${transaccion.tipo}</p>
            <p class="motivo">${transaccion.motivo}</p>
            <p class="mes">${transaccion.mes}</p>
            <button class="botonEliminar" id="${transaccion.id}"> <i class="fas fa-trash-restore-alt"></i></button>`
            contenedor.appendChild(div)
            document.getElementById(transaccion.id).addEventListener("click", () => {
                eliminarTrans(transaccion.id)
            })
        })
    }
    actualizarVistaTrans()

    //selecciono DOM y creo Selects 
    const valorTrans = document.getElementById("valorTrans")
    const listadoCuentas = document.getElementById('cuentasTrans')
    const listadoMeses = document.getElementById('mesTrans')
    const listadoTipos = document.getElementById('tipoTrans')
    const motivoTrans = document.getElementById("motivoTrans")
    const agregarTrans = document.getElementById("agregarTrans")
    
    meses.forEach(mes => {
        const mesDOM = document.createElement('option')
        mesDOM.value = mes;
        mesDOM.innerHTML = mes;
        listadoMeses.appendChild(mesDOM)  } )
        
    tiposPagos.forEach(tipo => {
        const tipoDOM = document.createElement('option')
        tipoDOM.value = tipo.nombre;
        tipoDOM.innerHTML = tipo.nombre;
        listadoTipos.appendChild(tipoDOM)  } )

    cuentas.forEach(cuenta => {
        
                const cuentaDOM = document.createElement('option')
            cuentaDOM.value = cuenta.nombre;
            cuentaDOM.innerHTML = cuenta.nombre;
            document.getElementById('cuentasTrans').appendChild(cuentaDOM)
            })  
                  
    //creo el objeto de la transaccion
    class Transaccion{
        constructor (valor,cuenta,tipo,motivo,mes){
            this.id = 0 
            this.valor = valor
            this.cuenta = cuenta
            this.tipo = tipo
            this.motivo = motivo
            this.mes = mes
        }}''
    const agregarTransF = () => {
            const transValor = parseInt(valorTrans.value) 
            const cuenta = listadoCuentas.value
            const mes = listadoMeses.value
            const tipo = listadoTipos.value
            const motivo = motivoTrans.value
            
            const transaccion = new Transaccion (transValor,cuenta,tipo,motivo,mes)
            //lo agrego al array y le asigno un ID
            transacciones.push(transaccion)
            transacciones.forEach((item, i) => {
                item.id = i + 1;
              });
            //lo paso al LS
            transToLocal()
            actualizarVistaTrans()
            //sumo o resto saldo a la cuenta dependiendo del tipo de pago
            const tipoOperacion = encuentraTipo(tipo)
            if (tipoOperacion == "-"){
                const saldoCuenta = restaCuenta(cuenta,transValor)
            }
            if (tipoOperacion == "+"){
                const saldoCuenta = sumaCuenta(cuenta,transValor)
            } 
        }
    const eliminarTrans = (idTrans) => {
    
        const trans = transacciones.find((trans) => trans.id === idTrans)
        const indice = transacciones.indexOf(trans)
        transacciones.splice(indice,1)
        transToLocal()
        actualizarVistaTrans()
    
    }

    

//muestra errores en el DOM (Sin validacion)
valorTrans.focus(addEventListener("focusout",() => {
    if (valorTrans.value == ""){
        valorTrans.classList.add("btn-danger")
    }
    else {
        valorTrans.classList.remove("btn-danger")
    }
}))
listadoCuentas.focus(addEventListener("focusout",() => {
    if ((listadoCuentas.value == "") || (listadoCuentas.selectedIndex == 0)) {
        listadoCuentas.classList.add("btn-warning")
    }
    else {
        listadoCuentas.classList.remove("btn-warning")
    }
}))

listadoTipos.focus(addEventListener("focusout",() => {
    if ((listadoTipos.value == "") || (listadoTipos.selectedIndex == 0)) {
        listadoTipos.classList.add("btn-warning")
    }
    else {
        listadoTipos.classList.remove("btn-warning")
    }
}))
listadoMeses.focus(addEventListener("focusout",() => {
    if ((listadoMeses.value == "") || (listadoMeses.selectedIndex == 0)) {
        listadoMeses.classList.add("btn-warning")
    }
    else {
        listadoMeses.classList.remove("btn-warning")
    }
}))
agregarTrans.addEventListener("submit", (e) => {
    e.preventDefault()
if (isNaN(valorTrans.value) || valorTrans.value == "" ){
    Toastify({
        text: "el valor tiene que ser un numero",
        close: true,
        duration: 3000,
        style: {
            background: "red",
        },
        }).showToast();
        return
}

if ((listadoCuentas.selectedIndex == 0)){
    Toastify({
        text: "seleccione una cuenta ",
        close: true,
        duration: 3000,
        style: {
            background: "red",
        },
        }).showToast();
        return
}
if ((listadoTipos.selectedIndex == 0)){
    Toastify({
        text: "seleccione un tipo de pago",
        close: true,
        duration: 3000,
        style: {
            background: "red",
        },
        }).showToast();
        return
}
if ((listadoMeses.selectedIndex == 0)){
    Toastify({
        text: "seleccione un mes ",
        close: true,
        duration: 3000,
        style: {
            background: "red",
        },
        }).showToast();
        return
}

else {
    

    
        agregarTransF()
        agregarTrans.reset()
    

}
})
}

    //funciones para encontrar y ejercutar la operacion al saldo de la cuenta
    const encuentraTipo = (nombreTipo) =>{
        const signoFind = tiposPagos.find((tipo) => tipo.nombre === nombreTipo)
        return signoFind.signo
    }
    const sumaCuenta = (nombreCuenta,valor) =>{
                //lo traigo del LS creado al inicio de la app.
                let cuentas = JSON.parse(localStorage.getItem("cuentas"))
                let cuentaFind = cuentas.find((cuenta) => cuenta.nombre === nombreCuenta)
                const indice = cuentas.indexOf(cuentaFind)
                const resultado = cuentaFind.saldo + valor
                for (let i = 0; i < cuentas.length; i++) {
                    cuentas[indice].saldo = resultado
                   }
                cuentasToLocal(cuentas)
                cuentaFind = cuentas.find((cuenta) => cuenta.nombre === nombreCuenta)
            }
    const restaCuenta = (nombreCuenta,valor) =>{
        let cuentas = JSON.parse(localStorage.getItem("cuentas"))
        let cuentaFind = cuentas.find((cuenta) => cuenta.nombre === nombreCuenta)
        const indice = cuentas.indexOf(cuentaFind)
        const resultado = cuentaFind.saldo - valor
        for (let i = 0; i < cuentas.length; i++) {
            cuentas[indice].saldo = resultado
            }
        cuentasToLocal(cuentas)
        cuentaFind = cuentas.find((cuenta) => cuenta.nombre === nombreCuenta)
    }
    
    




// // ------SECCION A PAGAR-------

if (document.querySelector("#titulo").innerText == "A pagar"){ 
    //esta seccion es simular a "transacciones"
    const actualizarVistaMateriales = () =>{
        document.getElementById("contenedorMat").innerHTML = ""
        materiales.forEach(material => {
            const div = document.createElement('div')
            div.innerHTML = ` <p class="orden">${material.nombre}</p>
            <p class="cantidad">${material.cantidad}</p>
            <p class="valorUni" >${material.valor}</p>
            <p class="valorTot">${material.valorTotal}</p>
            <button class="botonEliminar" id="${material.nombre}"> <i class="fas fa-trash-restore-alt"></i></button>`
            document.getElementById("contenedorMat").appendChild(div)    
            document.getElementById(material.nombre).addEventListener("click", () => {
                eliminarMaterial(material.nombre)
            })
            
        })
    }
    actualizarVistaMateriales()
    class Material{
        constructor (nombre,cantidad,valor){
        this.nombre = nombre
        this.cantidad = cantidad
        this.valor = valor
        this.valorTotal = ((cantidad) * (valor))}

    }  
    const nombreMaterial = document.getElementById("nombreMaterial")
    const cantidadMaterial = document.getElementById("cantidadMaterial")
    const valorMaterial = document.getElementById("valorMaterial")
    const agregarMaterial = document.getElementById("agregarMaterial")


    //muestra errores en el DOM (Sin validacion)
    nombreMaterial.focus(addEventListener("focusout",() => {
        if (nombreMaterial.value == ""){
            nombreMaterial.classList.add("btn-danger")
        }
        else {
            nombreMaterial.classList.remove("btn-danger")
        }
    }))

    cantidadMaterial.addEventListener("input", () => {
        if (isNaN(cantidadMaterial.value)){
            cantidadMaterial.classList.add("btn-danger")}
        else{
            cantidadMaterial.classList.remove("btn-danger")
        }
        
    })

    valorMaterial.addEventListener("input", () => {
        if (isNaN(valorMaterial.value)){
            valorMaterial.classList.add("btn-danger")
        }
        else{
            valorMaterial.classList.remove("btn-danger")
        }
    })

    //aca valida y agrega al array
    const validadorNombre = (nombre) => {
        const material = materiales.find((material) => material.nombre === nombre)
        const include = materiales.includes(material)
        return include
    }

    const eliminarMaterial = (nombreMaterial) => {
        const material = materiales.find((material) => material.nombre === nombreMaterial)
        const indice = materiales.indexOf(material)
        materiales.splice(indice,1)
        materialesToLocal()
        actualizarVistaMateriales()
    } 

    const agregarMaterialF = () => {   
        const materialNombre = nombreMaterial.value
        const cantidad = parseInt(cantidadMaterial.value)
        const valor = parseInt(valorMaterial.value)
        const material = new Material(materialNombre, cantidad, valor)
        materiales.push(material)
        agregarMaterial.reset()
        materialesToLocal() 
        actualizarVistaMateriales()
         
        saldoMateriales = 0
        for (let i=0;i < materiales.length;i++){
            saldoMateriales += materiales[i].valorTotal
            localStorage.setItem("saldoMateriales",saldoMateriales); 
        }
    }
    
    agregarMaterial.addEventListener("submit", (e) => {
        e.preventDefault()
        if (nombreMaterial.value == ""){
            Toastify({
                text: "Material no puede estar vacio",
                close: true,
                duration: 3000,
                style: {
                    background: "red",
                },
                }).showToast();
                return
        }

        //valido que el nombre no este repetido porque generaria DIV con doble ID
        esvalido = validadorNombre(nombreMaterial.value)
        if (esvalido == true){
            Toastify({
                text: "no se permiten nombre repetidos",
                close: true,
                duration: 3000,
                style: {
                    background: "red",
                },
                }).showToast();
                return
        }
        else{

        
        if (isNaN(cantidadMaterial.value) || cantidadMaterial.value == "" ){
            Toastify({
                text: "La cantidad de material tiene que ser un numero",
                close: true,
                duration: 3000,
                style: {
                    background: "red",
                },
                }).showToast();
                return
        }
        
        if (isNaN(valorMaterial.value) || valorMaterial.value == ""){
            Toastify({
                text: "El valor tiene que ser un numero",
                close: true,
                duration: 3000,
                style: {
                    background: "red",
                },
                }).showToast();
                return
        }
        

        else {
            

        agregarMaterialF()

    }}})
}
 
// ------FIN-------










