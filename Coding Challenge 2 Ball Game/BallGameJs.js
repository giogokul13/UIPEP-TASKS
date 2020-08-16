(function(){
    var ballradius = 15 ;

    function start(){
        alert(" Click on Play Button to start Adding the Balls inside the canvas !!!");
        var canvas = document.getElementById("canvas");
        var c = canvas.getContext("2d");
        var CancelAnimation = "";
        var posspeed = 6;
        var HitCollision = 0;
        var canvaswidth = canvas.clientWidth;
        var canvasheight = canvas.clientHeight;
        var Container = {x:0,y:0,width:canvaswidth,height:canvasheight};
        var Balls = [
        {x: 400, y:400 , r:ballradius , color: 360 * Math.random(),vx : -5 ,vy: -8 },
        {x: 500, y:150 , r:ballradius , color:360 * Math.random(),vx : 5 ,vy: 8 }
         ];
        
    
         
        function DrawBall(){
            c.clearRect(Container.x,Container.y,Container.width,Container.height);
            for(var i=0; i <Balls.length; i++){
                c.fillStyle = 'hsl(' + Balls[i].color + ',100%,50%)';
                c.beginPath();
                c.arc(Balls[i].x,Balls[i].y,Balls[i].r,0,2 * Math.PI,false);
                c.closePath();
                c.fill();

                
                
                if((Balls[i].x + Balls[i].vx + Balls[i].r > Container.x + Container.width) || (Balls[i].x - Balls[i].r + Balls[i].vx < Container.x)){
                    Balls[i].vx = - Balls[i].vx;
                    //BallCollision.innerHTML = HitCollision;
                        setTimeout(function(){ 
                        HitCollision +=1;
                        BallCollision.innerHTML = HitCollision;
                    },1000) ;
                    
                    

                }
                if((Balls[i].y + Balls[i].vy + Balls[i].r > Container.y + Container.height) || (Balls[i].y - Balls[i].r + Balls[i].vy < Container.y)){
                    Balls[i].vy = - Balls[i].vy;
                    // BallCollision.innerHTML = HitCollision;
                     setTimeout(function(){ 
                        HitCollision +=1;
                        BallCollision.innerHTML = HitCollision;
                     },1000) ;
                    
                        
                }

                Balls[i].x +=Balls[i].vx;
                Balls[i].y +=Balls[i].vy;
                HitCollision = 0;
            }
            CancelAnimation = requestAnimationFrame(DrawBall);
            // BallCollision.innerHTML = HitCollision;
            // console.log("hit :" + HitCollision);
            
    }   
        // fn here//

        function StartAnimation(){
            requestAnimationFrame(DrawBall);    
        }

        function StopAnimation(){
            cancelAnimationFrame(CancelAnimation);
        }

        function AddBall(event){
           var tempAngle = Math.floor(Math.random() * 360);
           var tempRadians = tempAngle * 3.1415 / 180;
            var ball = {
                 x : event.clientX - canvas.getBoundingClientRect().left ,
                 y : event.clientY - canvas.getBoundingClientRect().top ,
                 r : ballradius,
                 color : 360*Math.random(),
                //  vx : (Math.random() * 16) -8,
                //  vy : (Math.random() * 16) -8
                 vx : Math.cos(tempRadians) * posspeed ,
		         vy : Math.sin(tempRadians) * posspeed
            }
            Balls.push(ball);

        }  // end AddBall

        //slider motion ..

        var slider = document.querySelector("#slider");
        var speed = document.getElementById("speed");
        speed.innerHTML = slider.value + " %";
        slider.onchange = function(){
        speed.innerHTML = slider.value + " %";
        var factor = slider.value;
        posspeed = factor * 0.5;
            for (var i=0 ;i<Balls.length;i++){
                Balls[i].vx = posspeed / 2 ;
                Balls[i].vy = posspeed / 2 ;
              
            }
      //end slider function      
    };
        // Animation start button

        var startButton = document.getElementById('startButton');
        startButton.addEventListener('click',StartAnimation,false);
        // Animation stop
        var pauseButton = document.getElementById("pauseButton");
        pauseButton.addEventListener('click',StopAnimation,false);
        
        // Adding a new Ball inside the canvas
        var BallAdd = document.getElementById('canvas');
        BallAdd.addEventListener('click',AddBall,false);

        var BallCollision = document.querySelector("#HitCounter");
        

   // end start      
 }
        window.addEventListener('load',start,false);


  // end @main@ function   
}());