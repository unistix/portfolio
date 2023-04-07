import React from 'react'
import { useGlobalContext} from '../context/context'
import '../styles/lava.css';



const Lava = () => {
    var canvas;
    var ctx;
    var _fillStyle = "black";
    var effect;


    const {darkMode} = useGlobalContext()
    if(darkMode){
        _fillStyle="white"

    }
    class Ball {
        /*handle movement and properties for each individual metaball object.
            how it moves
            what it looks like*/ 
            constructor(effect){
                this.effect = effect;
                //all metaballs startng in center so h-x coord is set.
                this.radius = Math.random() * 100 + 20 //(20->120)
                this.x = this.radius * 2 +(Math.random() * (this.effect.width - this.radius * 4)) //spread initial creation across x axis.
                
                this.y = -this.radius; //y can only be created at the top of the canvas 
        
                
                 
                //Sticky effect
                //When the droplets reach a certain mass then they should gin speed 
                this.gravity = Math.random() * 0.0005
                this.vy = 0 
        
        
                //move in every direction slightly
                this.speedX = Math.random() * 0.2 - 0.1; //randomise horizontal speed each ball have random speed between -0.5 and 0.5 pixels per frame
                //reduce horizontal sideways movement
                this.speedY = Math.random() * 1.5 + 0.5; //increase speed Y to show heavier gravity rather than just floating 
        
                this.angle = 0;
                this.va = Math.random() * 0.1 - 0.05 //further randommise cirle movement by adjusting for angles 
                this.range = Math.random() * 30 //ADJUST
        
            }
            update(){
                //make balls bounce at the edge of canvas
                //switch direction of movement when it hits edge swap speed to oposite value chaning direction
                //without radius balls only bounce when they are half way out the screen
                if(this.x < this.radius|| this.x > this.effect.width -this.radius) {this.speedX*= -1;}; //this.x <0 || this.x > this.effect.width x is greater than the edge
        
                //no more vertical bouncing instead reset back to the top 
                //if(this.y < this.radius|| this.y > this.effect.height -this.radius) {this.speedY*= -1;}; //this.x <0 || this.x > this.effect.width x is greater than the edge
                if( this.y > this.effect.height + this.radius){
                    this.radius = Math.random() * 80 + 20 //(20->100) //reset radius on position change
                    this.y = -this.radius
                    //once their off screen set velocity y to zero and reset speed value
                    this.vy = 0;
                    this.speedY = Math.random() * 1.5 + 0.5
                    this.x = this.radius * 2 +(Math.random() * (this.effect.width - this.radius * 4))
                }
        
                /*On each new frame increase velocity by gravity only when they vertical radius is high enough */
                if(this.y > this.radius * 1){ //increase value to make gravity apply later and top blob 
                    this.vy += this.gravity;
                    this.speedY += this.vy;
        
                }
                
                //fall at an increasing rate 
                //adjust boncing on sides to change at an angle too 
                //this.angle += this.va - no longer required
        
                //to make balls move
                //remove the angle from position calculations too 
                this.x += this.speedX//ADJUST
                this.y += this.speedY  //ADJUST
            }
            draw(){
                //specify the canvas we want to draw on
                ctx.beginPath(); //start drawing new path
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2)
                
                ctx.fill(); //this code draws a black circle because fill default is black
            }
            reset(){
                //this.x = this.effect.width * 0.5;
                //this.y = this.effect.height * 0.5;
        
                this.x = this.radius * 2 +(Math.random() * (this.effect.width - this.radius * 4)) //spread initial creation across x axis.
                
                this.y = -this.radius; //y can only be created at the top of the canvas 
            }


    }

    class MetaballsEffect{
        //creating and storing all metaball objects
    //width and height properties matching width and hieght so anim covers avialable canvas area.

        //create new ball when ball class in instantiated
        constructor(){
            this.width = canvas.width;
            this.height = canvas.height;
            this.metaballsArray = [];
        }
        init(numberOfBalls){
            //initialise effect
            for (let i=0; i< numberOfBalls; i++){
                //each time it runs it pushes on new ball into the array
                this.metaballsArray.push( new Ball(this)) //effect passed in this function
            }

        }
        update(){
            //call the update method on each ball
            this.metaballsArray.forEach(metaball => metaball.update())

        }
        draw(){
            this.metaballsArray.forEach(metaball => metaball.draw())
        }
        reset(newWidth, newHeight){
            this.width = newWidth;
            this.height = newHeight;
            this.metaballsArray.forEach(metaball => metaball.reset());
        }

    }
    function animate(){
        //objects not deleted because leaving trails so we can see animation of old frame
        ctx.clearRect(0,0, canvas.width, canvas.height)
    
        //update, position and redraw shapes on canvas
        effect.update()
        effect.draw()
        requestAnimationFrame(animate); 
        //objects not deleted because leaving trails so we can see animation of old frame
    
    }
    
    React.useEffect(() => {
    
        canvasGenerator()
        
        
    
    },[darkMode]);   //redraw the canvas on change

    function canvasGenerator(){
        canvas = document.getElementById('goo');
        ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = _fillStyle;

        effect = new MetaballsEffect() //holds instance of intire effect class.
        effect.init(25)
        console.log(effect)
        animate();

    }

    
    window.addEventListener('resize', function(){
        //canvas.width = window.innerWidth;
        //canvas.height = window.innerHeight;
        /*
        canvas = document.getElementById('goo');
        ctx = canvas.getContext("2d");
        ctx.fillStyle = _fillStyle;
        effect.reset(canvas.width, canvas.height);*/
        canvasGenerator()
    })
  return (
    <>
    <canvas className={darkMode?'dark' :''} id="goo"></canvas> {/*add the dark mode classname to change background colour*/}
    </>
  )
}

export default Lava