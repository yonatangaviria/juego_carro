class Carro {
    posicion = 0;
    // mover el carro la cantidad de metros que arroja el dado
    moverse() {
        this.posicion += Number.parseInt(Math.random()*6+1)*100;
        console.log(this.posicion);
    }
}

var carro1 = new Carro();
var carro2 = new Carro();
var carro3 = new Carro();