class eleccionId {
    constructor() {
        this.idpedidos = document.getElementById('NumeroPedido')
    }
    inicio() {
        if(this.idpedidos.value === ""){
            this.idpedidos.value = 1
        }else{
            let a = parseInt(this.idpedidos.value) + 1
            this.idpedidos.value = a
        }
        console.log(this.idpedidos.value)
    }
}

let eleccion = new eleccionId()

window.onload = eleccion.inicio()