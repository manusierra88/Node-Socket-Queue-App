//referencias HTML

const lblticket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

const lblticket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');

const lblticket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');

const lblticket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const socket = io();




socket.on('estado-actual', (payload) => {
    
    [ticket1, ticket2, ticket3, ticket4] = payload;
    if (!ticket1) {
    
        lblEscritorio1.innerText = 'Escritorio libre esperando ticket'
    } else {
        lblticket1.innerText = 'Ticket ' + ticket1.numero;
        lblEscritorio1.innerText = ticket1.escritorio;
        
    }
    if (!ticket2) {
        lblticket2.innerText = 'No hay ticket';
        lblEscritorio2.innerText = 'Escritorio libre esperando ticket'
    } else {
        lblticket2.innerText = 'Ticket ' + ticket2.numero;
        
    }
    if (!ticket3) {
        lblticket3.innerText = 'No hay ticket';
        lblEscritorio3.innerText = 'Escritorio libre esperando ticket'
    } else {
        lblticket3.innerText = 'Ticket ' + ticket3.numero;
        
    }
    if (!ticket4) {
        lblticket4.innerText = 'No hay ticket';
        lblEscritorio4.innerText = 'Escritorio libre esperando ticket'
    } else {
        lblticket4.innerText = 'Ticket ' + ticket4.numero;
        
    }

})