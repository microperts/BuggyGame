import Phaser from 'phaser'

let width, height

export default class SizeHandler extends Phaser.Scene{
    constructor ()
    {
        super({key: 'sizeHandler'});
    }

    create() {
        this.launchScene('preloader')
    }
    
    launchScene(scene, data) {
        this.scene.launch(scene, data)
        this.gameScene = this.scene.get(scene)
    }

    updateResize(scene) {
        scene.scale.on('resize', this.resize, scene)

        width = scene.scale.gameSize.width
        height = scene.scale.gameSize.width

        scene.parent = new Phaser.Structs.Size(width, height)
        scene.sizer = new Phaser.Structs.Size(800, 600,
            Phaser.Structs.Size.FIT, scene.parent)

        scene.parent.setSize (width, height)
        scene.sizer.setSize(width, height)

        this.updateCamera(scene)
    }

    resize(gameSize) {
        const width = Math.round(gameSize.width)
        const height = Math.round(gameSize.height)

        this.parent.setSize(width, height)
        this.sizer.setSize(width, height)

        const camera = this.cameras.main
        const scaleX = this.sizer.width / 800
        const scaleY = this.sizer.height / 600

        camera.setZoom(Math.max(scaleX, scaleY))
        camera.centerOn(800 / 2, 600 / 2)

        // this.scale.displaySize.setAspectRatio(this.scale.baseSize.aspectRatio)

        // this.updateCamera()
    }

    updateCamera(scene)
    {
        const camera = scene.cameras.main
        const x = Math.ceil((scene.parent.width - scene.sizer.width)* 0.5)
        const y = 0 
        const scaleX = scene.sizer.width/ 800
        const scaleY = scene.sizer.height / 600

        camera.setViewport(x,y,scene.sizer.width, scene.sizer.height)
        camera.setZoom(Math.max(scaleX, scaleY))
        camera.centerOn(Math.round(800 /2), Math.round(600 /2))

    }
    // getZoom(){
    //     return this.cameras.main.zoom
    // }
}