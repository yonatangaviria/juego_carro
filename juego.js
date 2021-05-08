class Juego
{
    pista;
    podium;
    contador = 0;
    distancia_min = 1;

    constructor()
    {
        this.podium = new Podium();
    }

    agregar_dist_max(distancia)
    {
        this.pista = new Pista(Math.max(distancia,this.distancia_min));
    }

    reiniciar_juego()
    {
        this.podium.clasificacion = [];
        this.contador = 0;
        for(var i = 0 ;i < this.pista.carriles.length; i ++)
        {
            var carril = this.pista.carriles[i];
            carril.carro.posicion = 0;
        }
    }

    mover_carros()
    {
         
        for(var i = 0; i < this.pista.carriles.length; i ++)
        {   
            var carril = this.pista.carriles[i];

            if (carril.carro.posicion < this.pista.distancia_max * 1000)
            {
                carril.carro.moverse();
            }
            else {continue}

            if ((carril.carro.posicion >= this.pista.distancia_max * 1000) && this.podium.clasificacion.length < 3)
            {
                this.podium.clasificar(carril.carro.conductor);
            }

            if (carril.carro.posicion >= this.pista.distancia_max * 1000)
            {
                this.contador ++;
            }
        }

        if (this.contador >= this.pista.carriles.length)
        {
            console.log(" ");
            console.log("LA CARRERA HA FINALIZADO");
            console.log(" ");
            this.podium.imprimir_podium()

            this.reiniciar_juego()
            console.log(" el juego se ha reiniciado");
            console.log(" ");
        }
    }
}

class Pista
{
    carriles = [];
    distancia_max;

    constructor(distancia_max)
    {
        this.distancia_max = distancia_max;
    }

    registrar_conductor(nombre,color)
    {
        var jugador = new Jugador(nombre);
        var carro = new Carro(jugador, color);
        var carril = new Carril(carro);
        this.carriles.push(carril);
        console.log("conductor registrado");
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
    
    constructor(conductor, color)
    {
        
        this.conductor = conductor;
        this.color = color;
    }

    // mover el carro la cantidad de metros que arroja el dado
    moverse() {
        this.posicion += Number.parseInt(Math.random()*6+1)*100;
        console.log("el jugador: " + this.conductor.nombre + "  de color " + this.color);
        console.log("ha recorrido: " + this.posicion + " metros");
    }
}

class Jugador 
{
    victorias = 0;
    nombre;

    constructor(nombre)
    {
        this.nombre = nombre;
    }
}

class Podium
{
    clasificacion = [];
    posiciones = [" PRIMER LUGAR: ", " SEGUNDO LUGAR: ", " TERCER LUGAR: "];

    clasificar(jugador)
    {
        this.clasificacion.push(jugador);
        console.log(" ");
        console.log(jugador.nombre + " ha clasificado");
        console.log(" ");

        jugador.victorias ++;
    }

    imprimir_podium()
    {
        for(var i=0; i< this.clasificacion.length; i++)
        {
            console.log(this.posiciones[i] + this.clasificacion[i].nombre );
            console.log("Con " + this.clasificacion[i].victorias + " victorias");
        }
    }
}

var juego = new Juego();