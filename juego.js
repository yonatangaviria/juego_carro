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
        console.log(this.posicion);
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
var jugador = new Jugador("camilo");
var carro = new Carro("rojo",jugador);
var carril = new Carril(carro);

console.log(carril.carro.conductor.nombre);
console.log(carril.carro.color);