// -------DEFINICIOENS DE VARIABLES Y ARRAYS---------
let saldoMateriales = 0 
const cuentas = []
const materiales = []

let saldoMaterialesLocal = localStorage.getItem("saldoMateriales")
    console.log(saldoMaterialesLocal)
if (document.querySelector("#titulo").innerText == "Estados") {
    document.getElementById("saldoMateriales").innerText = `Saldo Materiales: $${saldoMaterialesLocal}`}
// // ------CUENTAS-------
if (document.querySelector("#titulo").innerText == "Cuentas"){
fetch("https://brunincoderhouse.madeinrabbit.com/js/cuentas.JSON",{mode: 'cors'})
    .then(cuentas => cuentas.json())
    .then(data =>  data.forEach(cuenta => {
        console.log(`Material ${cuenta.nombre}`)
        console.log(data)
        
    }))
}    
// // ------A PAGAR-------

if (document.querySelector("#titulo").innerText == "A pagar"){ //HACE QUE SE EJECUTE EN UNA PAGINA DETERMINADA
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
    const validadorNombre = (nombre) => {
        const material = materiales.find((material) => material.nombre === nombre)
        const include = materiales.includes(material)
        return include
    }

    const eliminarMaterial = (nombreMaterial) => {
        const material = materiales.find((material) => material.nombre === nombreMaterial)
        const indice = materiales.indexOf(material)
        console.log(materiales.splice(indice,1))
        actualizarVistaMateriales()
    } 

    const agregarMaterialF = () => {
        const materialNombre = nombreMaterial.value
        const cantidad = parseInt(cantidadMaterial.value)
        const valor = parseInt(valorMaterial.value)
        const material = new Material(materialNombre, cantidad, valor)
        materiales.push(material)
        agregarMaterial.reset()
        actualizarVistaMateriales()  
        saldoMateriales = 0
        for (let i=0;i < materiales.length;i++){
            saldoMateriales += materiales[i].valorTotal
            localStorage.setItem("saldoMateriales",saldoMateriales); 
        }
    }

    const actualizarVistaMateriales = () =>{
        document.getElementById("materiales").innerHTML = ""
        materiales.forEach(material => {
            const div = document.createElement('div')
            div.innerHTML = ` <p class="orden">${material.nombre}</p>
            <p class="cantidad">${material.cantidad}</p>
            <p class="valorUni" >${material.valor}</p>
            <p class="valorTot">${material.valorTotal}</p>
            <button class="botonEliminar" id="${material.nombre}"> <i class="fas fa-trash-restore-alt"></i></button>`
            document.getElementById("materiales").appendChild(div)    
            document.getElementById(material.nombre).addEventListener("click", () => {
                eliminarMaterial(material.nombre)
            })
            
        })
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

        //VALIDO QUE EL NOMBRE DEL MATERIAL NO ESTE REPETIDO PARA EVITAR DIV CON MISMOS ID
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
 
// ------FIN A PAGAR-------










