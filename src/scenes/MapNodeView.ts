export default class MapNodeView extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number, w: number, h: number, row: number, col: number, color: number = 0xeff4f8, alpha = 1) {
    super(scene, x, y)

    var graphics = scene.add.graphics();
    graphics.fillStyle(color, alpha);
    graphics.lineStyle(1, 0xffffff, 1);
    graphics.beginPath();
    graphics.moveTo(0, h / 2);
    graphics.lineTo(w / 2, 0);
    graphics.lineTo(w, h / 2);
    graphics.lineTo(w / 2, h);
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath()
    // graphics.setPosition(-w / 2, -h / 2)
    this.add(graphics)

    let txt = scene.add.text(0, 0, (row) + ',' + (col), {
      fontSize: 10
    })
    this.add(txt)
    txt.setPosition(w / 2 - txt.width / 2, h / 2 - txt.height / 2)
  }
}