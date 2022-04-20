const path = require('path');
const fs = require('fs');


class Ticket {

    constructor(numero , escritorio){

        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor (){
        this.ultimo = 0;
        this.fecha = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();

        
    }


    //este get lo que hace es generar la info que contngan los elementos del constructor para guardar en la DB

    get toJson(){
        return {
            ultimo   : this.ultimo,
            fecha    : this.fecha,
            tickets  : this.tickets,
            ultimos4 : this.ultimos4
        }
    }


    //inicializador de la clase con su contenido guardado en la DB

    init(){
        //para poder acceder a la data sin hacer peticiones http con axios
        //usamos la siguiente forma
        const {fecha, ultimo, ultimos4, tickets} = require('../db/data.json'); //de esta forma accedemos a lo que sea que se encuentre ahi dentro
        console.log(fecha, ultimo);
    
        if(fecha === this.fecha){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }else{

            this.guardarDB();
        }


    }

    guardarDB(){
        const dbPath = path.join(__dirname , '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }


    siguienteTicket(){
        //agregro un nuevo ticket a la coleecion de ultimos tickets
        this.ultimo += 1;
        //instancia de  la clase ticket
        const ticket = new Ticket(this.ultimo, null)// el ticket recibe el valor del ultimo q haya en la coleeccion y no hay escritorio que lo este trabajando por eso es null
        this.tickets.push(ticket); // agregamo el ticket a la coleecion de tickets
        // guardar en Db
        this.guardarDB();

        return 'Ticket ' + ticket.numero;
    }

    atenderTicket (escritorio){
        //corroboramos si hay o no tickets pendientes por atender
        if(this.tickets.length === 0){
            return null
        }//si no hay tickets por atender retornamos null

        const ticket = this.tickets.shift() // el primer elemento de la coleccion de tickets lo sacamos para poder llamarlo 
        //le asignamos un escritorio al  ticket removido del array de tickets
        ticket.escritorio = escritorio;

        //agregamos el ticket que sacamos de el arreglo de tickets y lo agregamos a los ultimos 4
        this.ultimos4.unshift(ticket);

        //comprobamos que los ultimos 4 siempre sean 4

        if(this.ultimos4.length > 4){
            this.ultimos4.slice(-1,1); //saca el ultimo elemento del arreglo y solo saca 1
        }

        this.guardarDB();

        return ticket;
    }

}



module.exports = TicketControl;