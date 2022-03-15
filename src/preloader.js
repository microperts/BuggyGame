import Phaser from 'phaser'

let handlerScene = null
export default class Preloader extends Phaser.Scene
{
    constructor ()
    {
        super({key: 'preloader'});
    }

    preload ()
    {
        this.load.image('bg', './assets/bg.png')
        this.load.image('buggy', './assets/buggy.png')

        handlerScene = this.scene.get('sizeHandler')
    }
      
    create ()
    {
        this.scene.launch('game')
        handlerScene.updateResize(this)
    }
}
