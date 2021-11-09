///===========OBJETOS===========

class Cuenta{
    constructor (id,nombre,saldo){

    this.id = id
    this.nombre = nombre
    this.saldo = saldo}
    
   
    sumarSaldo (ingresoSaldo) {{
            this.saldo += ingresoSaldo
    }
 }}
 let capitalDeTrabajo = 0
 capitalDeTrabajo  =  parseInt(localStorage.getItem('montoCapital'))
 alert(`El capital de trabajo es de: $ ${capitalDeTrabajo}` )   

// ///===========PROGRAMA===========
// let textoMenuPrincipal = ("Hola bienvenido al calulador de capital de trabajo para comenzar seleccione una opcion \n 1. Hacer una Operacion \n 2. Cuentas \n 3. Salir")
// let inicio = parseInt(prompt(textoMenuPrincipal))
//     while ((inicio === 1) || (inicio === 2)){

//     if (inicio === 1){
//             let textoMenuOperaciones = ("Seleccione una Operacion a Agregar: \n A). Pago Cliente(+) \n B). Pago Proveedor(-) \n C). Gasto(-) \n D). Extracion(-) \n E). Transferencia entre cuentas \n F). Menu Anterior")
//             let operacion  = prompt(textoMenuOperaciones).toUpperCase()

            
              
//             while ((operacion == "A") || (operacion  == "B") || (operacion  == "C") || (operacion  == "D") || (operacion  == "E")){
//                 ///===========FUNCIONES===========
//                         function pedirMonto (){
//                             monto = parseInt(prompt(`Selecciono ${operacion} \n Ingrese monto de la operacion`))
//                             return monto
//                         }
//                         function suma(numero){
//                             capitalDeTrabajo += numero
//                             console.log(`Se adiciono correctamente ${operacion}. El estado del capital es: $${capitalDeTrabajo}`)
                                
//                         }
//                         function resta(numero){
//                             capitalDeTrabajo = capitalDeTrabajo - numero
//                             console.log(`Se resto correctamente ${operacion}. El estado del capital es: $${capitalDeTrabajo}`)
//                         }
//                 console.log(capitalDeTrabajo)
//                 switch (operacion)
//                 {
//                     case "A":
//                         operacion= "Pago Cliente"
//                         console.log(operacion)
//                         suma(pedirMonto())
//                         localStorage.setItem("montoCapital",capitalDeTrabajo); 
//                         break
//                     case "B":
//                         operacion= "Pago Proveedor"
//                         console.log(operacion)
//                         resta(pedirMonto())
//                         break
//                     case "C":
//                         operacion= "Gasto"
//                         console.log(operacion)
//                         resta(parseInt(prompt("Ingrese monto del pago")))
//                         break
//                     case "D":
//                         operacion= "Extraccion"
//                         console.log(operacion)
//                         break
//                     case "E":
//                         operacion= "Transferencia entre cuentas"
//                         console.log(operacion)
//                         break
//                     case "F":
//                             break     
//                     default:
//                         alert("error fatal")
//                         break        
//                 }
//                 operacion  = prompt(textoMenuOperaciones).toUpperCase()
//             }
//             }

// else if(inicio === 2){
//     const textoMenuCuentas = " \n A). Agregar una cuenta  \n B). Ver cuentas \n C). Borrar una cuenta \n D). Extraccion \n F). Menu Anterior "
//     let operacion  = prompt(textoMenuCuentas).toUpperCase()
//     const cuentas = []
    
//     while ((operacion == "A") || (operacion  == "B") || (operacion  == "C") || (operacion  == "D")){
        
//         switch (operacion)
//                 {
//                     case "A":
//                         operacion= "Agregar Cuenta y saldo"
//                         console.log(operacion)
//                         nombre  = prompt("Ingrese el nombre")
//                         const cuenta = new Cuenta(01,nombre,0)
//                         console.log(cuenta)
//                         cuentas.push(cuenta)
//                         console.log("Su cuenta fue creado con exito ")
//                         //AQUI PIDO EL SALDO PERO LA IDEA ES QUE ESTE PUEDO EN OPERACIONES
//                         let ingresoSaldo = parseInt(prompt("ingrese un monto"))
//                         cuenta.sumarSaldo(ingresoSaldo)
//                         break
//                     case "B":
//                         operacion= "Ver cuentas"
//                         console.log(operacion)
//                         cuentasOrdenadas = cuentas.sort ((a,b) => {
//                                 if(a.nombre > b.nombre) {
//                                     return 1}
//                                 if(a.nombre < b.nombre) {
//                                         return -1 }
//                                 if (a.nombre == b.nombre) {
//                                     return 0
//                                 }                                     
//                                     })
//                         cuentas.forEach((cuenta) => {
//                                console.log(`Nombre: ${cuenta.nombre}`)
//                                     })
//                         console.log(cuentasOrdenadas)
//                     break
//                     case "C":
//                         operacion= "Gasto"
//                         console.log(operacion)
//                         resta(parseInt(prompt("Ingrese monto del pago")))
//                         break
//                     case "D":
//                         operacion= "Extraccion"
//                         console.log(operacion)
//                         break
//                     case "E":
//                         operacion= "Transferencia entre cuentas"
//                         console.log(operacion)
//                         break
//                     case "F":
//                             break  
//                     default:
//                         alert("error fatal")
//                         break        
//                 }
//                 operacion  = prompt(textoMenuCuentas).toUpperCase()
//     }
// }
// inicio = parseInt(prompt(textoMenuPrincipal))
// }
// alert("Ojala nos veamos cuando todo esto sea HTML y CSS")

let saldoHTML = document.getElementById("saldo")
saldoHTML.innerHTMK = `El saldo disponible es de $ ${capitalDeTrabajo}`

const divInicio = document.getElementById("inicio")
console.log(divInicio)
let creacionH2Saldo = document.createElement("h2")
creacionH2Saldo.className = "display-2"
creacionH2Saldo.innerHTML = "Aqui figura el saldo"
divInicio.appendChild(creacionH2Saldo)
saldoHTML.remove()