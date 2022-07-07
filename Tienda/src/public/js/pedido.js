class Pedido{
    constructor(){
        this.cantidad = document.getElementById('cantidad').value;
        this.icon = document.getElementById("boton").style.display = "none"; 
        this.tooltip = document.getElementById("tooltips").style.display = "none"; 
    }
    Minima(){
        if (cantidad >=5) {
            this.icon = document.getElementById("boton").style.display = "block"; 
            this.tooltip = document.getElementById("tooltips").style.display = "block";
        } else {
            this.icon = document.getElementById("boton").style.display = "none"; 
            this.tooltip = document.getElementById("tooltips").style.display = "none";
        }
        console.log(this.cantidad);
    }
}

let minimo = new Pedido()
window.onload = minimo.Minima()