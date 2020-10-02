
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
})

let text = $('input');
// console.log(text);

$('html').keydown( (e) =>{
    if (e.which == 13  && text.val().length !==0){ // 13 is for key enter 
        // console.log(text.val());
        socket.emit('message' , text.val());
        text.val('')
    }
   
});

// socket.on('createmessage', message =>{
//     // console.log("this is coming from server:  " + message );
//     $('ul').append(`<li class = "message"><b>user</b> </br> ${message} </li>`);
//     scrolltobottom();
// });

})




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
socket.on('createmessage', message =>{
    // console.log("this is coming from server:  " + message );
    $('ul').append(`<li class = "message"><b>user</b> </br> ${message} </li>`);
    scrolltobottom();
});
 const scrolltobottom = () =>{
    var d = $('.main__chat_window');
    d.scrollTop(d.prop("scrollHeight"));
}

    const muteUnmute = () => {
        const enabled = myVideoStream.getAudioTracks()[0].enabled;
        if (enabled) {
          myVideoStream.getAudioTracks()[0].enabled = false;
          setUnmuteButton();
        } else {
          setMuteButton();
          myVideoStream.getAudioTracks()[0].enabled = true;
        }
      }

      const setMuteButton = () => {
        const html = `
          <i class="fas fa-microphone"></i>
          <span>Mute</span>
        `
        document.querySelector('.main__mute_button').innerHTML = html;
      }
      
      const setUnmuteButton = () => {
        const html = `
          <i class="unmute fas fa-microphone-slash"></i>
          <span>Unmute</span>
        `
        document.querySelector('.main__mute_button').innerHTML = html;
      }


