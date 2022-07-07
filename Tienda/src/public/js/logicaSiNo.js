class eleccion{
    constructor(){
        this.si = document.getElementById('si')
        this.no = document.getElementById('no')
        this.imagen = document.getElementById('imagenNueva')
        this.guardar = document.getElementById('guardar')
    }
    inicio(){
        this.imagen.style.display = 'none'
        this.guardar.style.display = 'none'
    }
    eleccionSiNo(){
        if(this.si.checked == true){
            this.no.checked = false
            this.imagen.style.display = 'block'
            this.guardar.style.display = 'block'
        }
        if(this.no.checked == true){
            this.si.checked = false
            this.imagen.style.display = 'none'
            this.guardar.style.display = 'none'
        }
    }
    aparicion(){
        this.guardar.style.display = 'block'
        
    }
}

let elecciones = new eleccion()

window.onload = elecciones.inicio()