class Pista
{
    carriles = [];

    registrar_conductor(nombre,color)
    {
        var jugador = new Jugador(nombre);
        var carro = new Carro(color, jugador);
        var carril = new Carril(carro);
        this.carriles.push(carril);
    }
}
class Carril
{
    carro;

    constructor(carro)
    {
        this.carro = carro;
    }
}
class Carro 
{
    posicion = 0;
    conductor;
    color;
    
    constructor(color,conductor)
    {
        
        this.conductor = conductor;
        this.color = color;
    }

    // mover el carro la cantidad de metros que arroja el dado
    moverse() {
        this.posicion += Number.parseInt(Math.random()*6+1)*100;
        console.log("el jugador: " + this.conductor.nombre + " con vehiculo de color " + this.color +  " se movio:");
        console.log(this.posicion + " metros");
    }
}
class Jugador 
{
    nombre;

    constructor(nombre)
    {
        this.nombre = nombre;
    }
}

var pista = new Pista();