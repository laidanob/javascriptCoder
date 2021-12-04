// INGRESO NUEVO MATERIAL
// nombreMaterial  = prompt("Ingrese el nombre")
// cantidadMaterial  = parseInt(prompt("Ingrese la cantidad"))
// valorMaterial = parseInt(prompt("Ingrese el valor"))
// INGRESO NUEVA CUENTA
// nombreCuenta  = prompt("Ingrese el nombre")

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