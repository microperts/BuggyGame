import Phaser from 'phaser'
import ClockPlugin from 'phaser3-rex-plugins/plugins/clock-plugin.js'

import Preloader from './preloader'
import Game from './game'
import SizeHandler from './sizeHandler';

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,  
    },
    parent: 'phaser-example',
    width: 900,
    height: 600,
    physics:{
        default: 'matter',
        matter: {
            gravity: {y:0},
            debug: true
        }
    },
    plugins: {
        global: [{
            key: 'rexClock',
            plugin: ClockPlugin,
            start: true
        }]
    },
    scene:[SizeHandler,Preloader, Game]
};

let  game = new Phaser.Game(config);

export default module = game
