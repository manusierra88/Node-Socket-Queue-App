//referencias HTML
const titulo = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const ticketPendientes = document.querySelector('.alert');
const enAtencion = document.querySelector('small');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams) {
    window.location('index.html');
    throw new Error('Escritorio necesario');
}


const escritorio = searchParams.get('escritorio');

titulo.innerText = escritorio;

ticketPendientes.style.display = 'none';


const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});


socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('tickets-pendientes', (tickets)=>{
    if(tickets === 0){
        lblPendientes.style.display = 'none';
    }else{
        lblPendientes.style.display = '';
        ticketPendientes.style.display = 'none';
        lblPendientes.innerText = tickets;
    }
})

btnAtender.addEventListener('click', () => {


    socket.emit('pedir-ticket', { escritorio }, ({ok,msg,ticket}) => {

        if(!ok){
            enAtencion.innerText = 'Nadie.';
            return ticketPendientes.style.display = '';
        }

        enAtencion.innerText = 'Ticket: ' + ticket.numero;


    }) //el payload que es argumento del callback va a venir como respuesta desde el backend
});



