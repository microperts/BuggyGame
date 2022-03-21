import Phaser from 'phaser'
import SizeHandler from './sizeHandler'

let handlerScene = null
let clock, time, totalTime = 0, lapTime
let bg, buggy

let sensorBody, playerBody, playerSprite, sensorSprite

let vec, dx,dy, vx,vy, speed = 2

let collided = false

let width, height

export default class Game extends Phaser.Scene
{
    constructor ()
    {
        super({key: 'game'});
        this.GAME_WIDTH = 900
        this.GAME_HEIGHT = 600
    }

    create ()
    {    
        this.physicsTimeout = 0;
        this.matterTimeStep = 16.66;  

        // this.matter.world.setBounds(0,0,5000, 1200, false, false, false, false)
        clock = this.plugins.get('rexClock').add(this);
        clock.start();

        bg = this.add.image(800/2, 600/2, 'bg')
        bg.setScale(0.5)

        this.add.image(-800, 225, 'bg').setScale(0.5).setFlipX(true)
        buggy = this.matter.add.sprite(400, 250, 'buggy', undefined, {label: 'buggy'}).setScale(0.3)
        this.buggy2 = this.matter.add.sprite(200, 150, 'buggy', undefined,
        {
            label: 'grass'
        }).setScale(0.3)
        this.buggy2.setSensor(true)

        this.buggy3 = this.matter.add.sprite(10, 70, 'buggy', undefined,
        {
            label: 'road'
        }).setScale(0.3)
        this.buggy3.setSensor(true)

        this.matter.world.on('collisionstart', (event)=>{
            let pair = event.pairs
            for (var i = 0; i < pair.length; i++)
            {
                this.bodyA = pair[i].bodyA;
                this.bodyB = pair[i].bodyB;

                console.log(this.bodyA)

                if(this.bodyA.isSensor === true){
                    sensorBody = this.bodyB
                    playerBody = this.bodyA
                }

                else if(this.bodyB.isSensor === true){
                    sensorBody = this.bodyA
                    playerBody = this.bodyB
                }

                playerSprite = playerBody.gameObject
                sensorSprite = sensorBody.gameObject
            
                console.log("Sensor body: "+sensorBody.label)
                if(playerBody.label === 'grass'){
                    collided = true
                }
                if(playerBody.label != 'grass'){
                    collided = false
                }
            }
        })

        lapTime = this.add.text(560, 500, '').setScrollFactor(0)
        // this.cameras.main.setBounds(0, 0, 1800, 1200)
        this.cameras.main.startFollow(buggy)

        this.add.text(1000, 300, '1000px', { fill: 'white' });    
        this.add.text(2000, 300, '2000px', { fill: 'white' });    
        this.add.text(3000, 300, '3000px', { fill: 'white' });    
        this.add.text(4000, 300, '4000px', { fill: 'white' });

        this.matter.world.update30Hz();

        this.input.on( "pointermove", this.updateShip, this );


    }

    update (time, delta) 
    {
        // bg.setTilePosition( this.cameras.main.worldView.x, this.cameras.main.worldView.y );

        // this.physicsTimeout += delta;
        // while(this.physicsTimeout >= this.matterTimeStep) {
        //   this.physicsTimeout -= this.matterTimeStep;
        //   this.matter.world.step(this.matterTimeStep);
        // }

        time = clock.now /1000
        time += totalTime

        lapTime.setText('Lap time: '+time.toFixed(2))

        dx = (this.input.activePointer.worldX - buggy.x.toFixed())
        dy = (this.input.activePointer.worldY - buggy.y.toFixed())

        // console.log("dx: " +dx)
        vec = Math.atan2(dy,dx)
        // console.log("vec: " +vec)
        
        // vec = new Phaser.Math.Vector2(dx, dy).normalize() 
        // this.vec2 = vec
        // vec = Math.atan2(this.vec2.y,this.vec2.y)

        // let angle = Phaser.Math.Angle.Between( buggy.x, buggy.y, 
        //     this.input.activePointer.worldX, this.input.activePointer.worldY);
        // buggy.setRotation( vec );

        if(this.input.activePointer.isDown === true){
            // console.log(collided)
            // if(collided === false){
            //     buggy.setFlipY(true)
            //     buggy.setFlipX(true)
                
            //     speed +=0.002
    
            //     console.log('speed: '+speed)
            // }
            // else if (collided === true){
            //     console.log('collided')
            //     speed = 2.005
            // }

            buggy.thrust(speed)

            // buggy.setRotation(vec)

            // vx = Math.cos(angle) * 0.002
            // vy = Math.sin(angle) * 0.002
       
            // buggy.setVelocityX(vx)
            // buggy.setVelocityY(vy)

            // buggy.applyForce({x: vx, y: vy})

            // console.log("dx: " +dx)
            // console.log("dy: " +dy)
        }
        // else {
        //     if(speed >2){
        //         speed -= 0.002
        //     }
        // }
    }

    updateShip( pointer ){
        this.pointer = pointer;
       // rotate ship to the pointer
       let angle = Phaser.Math.Angle.Between( buggy.x, buggy.y, pointer.worldX, pointer.worldY);
        buggy.setRotation( angle );
    
       
      // move the ship to the target
     let divX = Math.abs( this.input.activePointer.worldX - buggy.x );
      let divY = Math.abs( this.input.activePointer.worldY - buggy.y );
      if( divX>20 || divY>20 ){
          speed = 0.002
      }else{
          speed = 0;
      }
    }
}
