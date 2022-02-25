import Phaser from 'phaser'

let clock, time, totalTime = 0, lapTime
let bg, buggy

let sensorBody, playerBody, playerSprite, sensorSprite

let vec, dx,dy, vx,vy, speed = 2

export default class Game extends Phaser.Scene
{
    constructor ()
    {
        super({key: 'game'});
    }
      
    create ()
    {   
        clock = this.plugins.get('rexClock').add(this);
        clock.start();

        bg = this.add.image(400, 225, 'bg').setScale(0.5)
        this.add.image(-800, 225, 'bg').setScale(0.5).setFlipX(true)
        buggy = this.matter.add.sprite(400, 250, 'buggy', undefined, {label: 'buggy'}).setScale(0.3)
        this.buggy2 = this.matter.add.sprite(200, 150, 'buggy', undefined,
        {
            label: 'grass'
        }).setScale(0.3)
        this.buggy2.setSensor(true)

        // buggy.body.collisionFilter.group = 1
        // buggy.body.collisionFilter.mask = 0

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
                    sensorSprite.setFriction(10)
                }
            }
        })

        lapTime = this.add.text(560, 500, '').setScrollFactor(0)
    }

    update () 
    {
        this.cameras.main.startFollow(buggy)

        time = clock.now /1000
        time += totalTime

        lapTime.setText('Lap time: '+time.toFixed(2))

        dx = this.input.activePointer.worldX - buggy.x
        dy = this.input.activePointer.worldY - buggy.y

        vec = Math.atan2(dy,dx)

        if(this.input.activePointer.isDown === true){
            buggy.setFlipX(true)
            buggy.setRotation(vec)
            
            speed +=0.002

            // console.log('speed: '+speed)
            vx = Math.cos(vec) * speed
            vy = Math.sin(vec) * speed

            buggy.setVelocityX(vx)
            buggy.setVelocityY(vy)
        }
    }
}
