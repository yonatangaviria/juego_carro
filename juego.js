class Juego
{
    pista;
    podium;
    contador = 0;
    distancia_min = 1;

    constructor()
    {
        this.podium = new Podium();
        this.cargar_juego();
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

            this.guardar_juego();
        }
    }

    guardar_juego()
    {
        var carros = [];
        for (var i = 0; i < this.pista.carriles.length; i ++)
        {
            var carro = this.pista.carriles[i].carro;
            carros.push(carro);
        }
        localStorage.setItem("carros", JSON.stringify(carros));
        localStorage.setItem("pista", this.pista.distancia_max);
    }

    cargar_juego()
    {
        var carros = localStorage.getItem("carros");

        if(carros)
        {
            var distancia_max =localStorage.getItem("pista");
            this.agregar_dist_max(distancia_max);
            
            carros = JSON.parse(carros);
            for(var i = 0; i < carros.length; i ++)
            {
                var carro = carros[i];
                this.pista.registrar_conductor(carro.conductor.nombre,carro.color,carro.conductor.victorias);
            }
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

    registrar_conductor(nombre,color,victorias)
    {
        var jugador = new Jugador(nombre,victorias);
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

    constructor(nombre,victorias)
    {
        this.nombre = nombre;
        this.victorias = victorias;
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