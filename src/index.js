import Phaser from 'phaser';
import Preloader from './preloader';
import Game from './game';


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics:{
        default: 'matter',
        matter: {
            gravity: {y:0},
            debug: true
        }
    },
    scene: [Preloader, Game]
};

const game = new Phaser.Game(config);
