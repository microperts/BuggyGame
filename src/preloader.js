import Phaser from 'phaser'

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
    }
      
    create ()
    {
        this.scene.start('game')
    }
}
