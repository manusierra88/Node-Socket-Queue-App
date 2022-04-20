const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    // enviamos un mensaje el front para que cuando se conecte un nuvo cliente vea el ultimo ticket en pantalla

    socket.emit('ultimo-ticket', ticketControl.ultimo);

    //enviamos los ultimos 4 tickets para que en la pantalla publica sea visto 

    socket.emit('estado-actual', ticketControl.ultimos4);

    //tickets pendientes por atender

    socket.emit('tickets-pendientes', ticketControl.tickets.length);
    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);


    socket.on('siguiente-ticket', (payload, callback) => {
        const siguiente = ticketControl.siguienteTicket();
        callback(siguiente); //paso con el callback al front el siguiente ticket generado en el back

        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

    });


    socket.on('pedir-ticket', ({ escritorio }, callback) => {

        //si no viene el escritorio desde el front mandamo el sig error
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio debe ser enviado obligatoriamente'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);
        
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);

        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
        
        if (!ticket) {
            return callback({
                ok: false,
                msg: 'No hay más tickets pendintes'
            })
        } else {
            callback({
                ok: true,
                ticket
            });
        }


    })




}



module.exports = {
    socketController
}

