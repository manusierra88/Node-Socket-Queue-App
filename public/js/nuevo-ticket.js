//referencias HTML

const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnGenerar = document.querySelector('button');


const socket = io();



socket.on('connect', () => {
    btnGenerar.disabled = false;

});

socket.on('disconnect', () => {
    btnGenerar.disabled = true;
});

socket.on('ultimo-ticket', (ticket)=>{
    lblNuevoTicket.innerText = 'Último ticket: '+ ticket;
})



btnGenerar.addEventListener( 'click', () => {

    socket.emit( 'siguiente-ticket', null, (ticket ) => {  //como no mando el payload lo puedo pasar como null
        lblNuevoTicket.innerText = ticket;
    });

});