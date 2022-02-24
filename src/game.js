import Phaser from 'phaser'

let bg, buggy

let vec, dx,dy, vx,vy

export default class Game extends Phaser.Scene
{
    constructor ()
    {
        super({key: 'game'});
    }
      
    create ()
    {
        bg = this.add.image(400, 220, 'bg').setScale(0.5)
        buggy = this.matter.add.sprite(400, 250, 'buggy').setScale(0.3)
    }

    update () 
    {
        dx = this.input.activePointer.worldX - buggy.x
        dy = this.input.activePointer.worldY - buggy.y

        vec = Math.atan2(dy,dx)

        if(this.input.activePointer.isDown === true){
            buggy.setRotation(vec)

            vx = Math.cos(vec) * 2
            vy = Math.sin(vec) * 2

            buggy.setVelocityX(vx)
            buggy.setVelocityY(vy)

            this.cameras.main.startFollow(buggy)
        }
    }
}
