const socket= io('http://localhost:80');

const form = document.getElementById('msg-sender');
const msg = document.getElementById('msginp');
const msgContainer = document.querySelector(".container");

var audio= new Audio('ring.mp3');
const append = (message, position)=>{
    const msgelement = document.createElement('div');
    msgelement.innerHTML = message;
    msgelement.classList.add('message');
    msgelement.classList.add(position);
    msgContainer.append(msgelement);
    if(position=='left')
    {
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = msg.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    msg.value = ''
})
const nam = prompt("Enter your name to join-chat");
socket.emit('new-user-joined', nam);

socket.on('user-joined', name=>{
    append(`${name} : joined the chat`,'left');
})

socket.on('receive', data=>{
    append(`${data.name} : ${data.message}`,'left');
})

socket.on('left', name=>{
    append(`${name} : left the chat`,'left');
})
