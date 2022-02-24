import Phaser from 'phaser'
import ClockPlugin from 'phaser3-rex-plugins/plugins/clock-plugin.js'

import Preloader from './preloader'
import Game from './game'


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
    plugins: {
        global: [{
            key: 'rexClock',
            plugin: ClockPlugin,
            start: true
        }]
    },
    scene: [Preloader, Game]
};

let  game = new Phaser.Game(config);

export default module = game
