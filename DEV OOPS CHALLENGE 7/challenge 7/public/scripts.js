const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined,{
    path : '/peerjs',
    host : '/',
    port : '3000'
}); 


let myVideoStream ;
navigator.mediaDevices.getUserMedia({

    video : true,
    audio : true

}).then( stream =>{
    myVideoStream = stream;
    addVideoStream(myVideo,stream);
});

socket.emit('join-room',ROOM_ID);

peer.on('open' ,id =>{
    socket.emit('join-room',ROOM_ID,id);

})
socket.on('user-connected', (userid)=>{
    connectToNewUser(userid);
});


const connectToNewUser = (userid) =>{
    console.log( "new user connected " + userid);
}



const addVideoStream = ( video , stream) =>{
    video.srcObject = stream ;
    video.addEventListener('loadedmetadata',() =>{

        video.play();

    });

    videoGrid.append(video);
}