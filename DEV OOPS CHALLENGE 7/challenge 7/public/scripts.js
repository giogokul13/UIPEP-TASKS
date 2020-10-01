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

    peer.on('call', (call) => {
        
          call.answer(stream); // Answer the call with an A/V stream.
          const video = document.createElement('video');
          call.on('stream', userVideoStream => {
            // Show stream in some video/canvas element.
            addVideoStream(video,userVideoStream);
          });
});

socket.on('user-connected', (userid)=>{
    connectToNewUser(userid , stream);
});

});


socket.emit('join-room',ROOM_ID);

peer.on('open' ,id =>{
    socket.emit('join-room',ROOM_ID,id);

})



const connectToNewUser = (userid, stream) =>{
    console.log( "new user connected " + userid);
    const call = peer.call(userid,stream);
    const video = document.createElement('video');
    call.on('stream',userVideoStream =>{
        addVideoStream(video, userVideoStream);
    });
}



const addVideoStream = ( video , stream) =>{
    video.srcObject = stream ;
    video.addEventListener('loadedmetadata',() =>{

        video.play();

    });

    videoGrid.append(video);
}