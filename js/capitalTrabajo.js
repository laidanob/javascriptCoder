// -------DEFINICIOENS DE VARIABLES Y ARRAYS---------
let saldoMateriales = 0 
const cuentas = []
const materiales = []

let saldoMaterialesLocal = localStorage.getItem("saldoMateriales")
    console.log(saldoMaterialesLocal)
if (document.querySelector("#titulo").innerText == "Estados") {
    document.getElementById("saldoMateriales").innerText = `Saldo Materiales: $${saldoMaterialesLocal}`}
// // ------CUENTAS-------
// 

// class Cuenta{
//     constructor (nombre){

//     this.nombre = nombre
//     this.saldo = 0}
    
   
//     sumarSaldo (ingresoSaldo) {
//             this.saldo += ingresoSaldo
//     }

//     restarSaldo (ingresoSaldo) {
//         this.saldo -= ingresoSaldo
// }
//  }
 
// const nombreCuenta = document.getElementById("nombreCuenta")
// const agregarCuenta = document.getElementById("agregarCuenta")
// agregarCuenta.addEventListener("submit", (e) => {
//     e.preventDefault()
//     const nombre = nombreCuenta.value
//     console.log(nombre)
//     cuenta = new Cuenta(nombre)
//     cuentas.push(cuenta)
//     console.log(cuentas)
//     localStorage.setItem('cuentasCreadas',JSON.stringify(cuentas))


// })

// cuenta = new Cuenta(nombreCuenta)
// // ------FIN CUENTAS-------
// // ------ESTADO-------

// // saldoDisponible es la suma del dinero de las cuentas
// const saldoDisponible = 0
//     for (let i = 0;i < cuentas.length;i++){
//         saldoDisponible += cuentas[i].saldo
//     }

// saldoCapital es la suma de los materiales/ Ordenes a pagar

    // for (let i = 0; i < materiales.length; i++){
    //     saldoMateriales += materiales[i].valorTotal
    // }
// // saldoFacturar / saldoCobrar son datos ingresados por el usuario

// // saldoFacturar = parseInt(prompt("ingrese un saldo a facturar"))
// // saldoCobrar = parseInt(prompt("ingrese un saldo a cobrar"))

// // Total efectivo: es el saldo disponible + el dinero a cobrar/facturar

// saldoEfectivo = (saldoFacturar + saldoCobrar) + saldoDisponible

// // totalConPagos es el dinero efectivo - total capital

// totalConPagos = saldoEfectivo - saldoCapital
// // ------FIN ESTADO-------
// // ------TRANSACCIONES-------
// class Transaccion{
//     constructor(nombre, descripcion, valor, cuenta, tipo){
//         this.nombre = nombre
//         this.descripcion = descripcion
//         this.valor = valor
//         this.cuenta = cuenta
//         this.tipo = tipo}

//     }
//     const tiposPago = []   
//     class TipoPago{
//         constructor(nombre){
//             this.nombre = nombre
    
//         }}   

//         const Transacciones = []
// t = new Transaccion(nombre, descripcion, valor, cuentas, )
// // ------FIN TRANSACCIONES-------

// // ------A PAGAR-------

//CREA EL OBTEJO DEL MATERIAL
class Material{
    constructor (nombre,cantidad,valor){
    this.nombre = nombre
    this.cantidad = cantidad
    this.valor = valor
    this.valorTotal = ((cantidad) * (valor))}

}

//SELECCINA ELEMENTOS DEL DOM    
const nombreMaterial = document.getElementById("nombreMaterial")
const cantidadMaterial = document.getElementById("cantidadMaterial")
const valorMaterial = document.getElementById("valorMaterial")
const agregarMaterial = document.getElementById("agregarMaterial")


//MUESTRA ERROR EN EL DOM (SIN VALIDACION)
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

//VALIDACIONES, SUMA AL ARRAY MATERIALES Y VISTA DEL DOM
//
const actualizarVistaMateriales = () =>{
    materiales.forEach(material => {
        const div = document.createElement('div')
        div.innerHTML = ` <p class="orden">${material.nombre}</p>
        <p class="cantidad">${material.cantidad}</p>
        <p class="valorUni" >${material.valor}</p>
        <p class="valorTot">${material.valorTotal}</p>
        <button class="botonEliminar" id="${material.nombre}"> <i class="fas fa-trash-restore-alt"></i></button>`
        console.log(material.nombre)
        document.getElementById("materiales").appendChild(div)    
    })}
    
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
        document.getElementById("materiales").innerHTML = ""

        const materialNombre = nombreMaterial.value
        const cantidad = parseInt(cantidadMaterial.value)
        const valor = parseInt(valorMaterial.value)
        const material = new Material(materialNombre, cantidad, valor)
        materiales.push(material)
        console.log(materiales)
        agregarMaterial.reset()
        actualizarVistaMateriales()    
        saldoMateriales = 0
        for (let i=0;i < materiales.length;i++){
            saldoMateriales += materiales[i].valorTotal
            localStorage.setItem("saldoMateriales",saldoMateriales); 
        
}}})


const eliminarMaterial = (nombreMaterial => {
    const material = materiales.find((material) => material.nombre === nombreMaterial)
    const indice = materiales.indexOf(nombreMaterial)
    materiales.splice(indice,1)
    document.getElementById(`${material.nombre}`).addEventListener("click", () => {
        eliminarMaterial()
    } )
    console.log(materiales) 
}) 
materiales.forEach(material => {
    document.getElementById(`${material.nombre}`).addEventListener("click", () => {
        console.log("anda")
    } )
    
    
})


// ------FIN A PAGAR-------










