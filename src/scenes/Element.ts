import DiamondTiledMap from "./DiamondTiledMap";
import {NodeData} from "./NodeData";
import {Main} from "./Main";

export default class Element extends Phaser.GameObjects.Container {
  scene: Main
  skin: Phaser.GameObjects.Image
  mdata: NodeData
  startX
  startY
  currentRow
  currentCol
  h: number

  constructor(scene, data: NodeData) {
    super(scene)
    this.mdata = data

    let {originX,originY} = data
    this.currentRow = originY
    this.currentCol = originX
    let p = this.getMapXY(this.currentRow,this.currentCol)
    this.x = p.x
    this.y = p.y
  }

  tiledmap(mdata?:any) {
    mdata = mdata || this.mdata
    let dtMap = new DiamondTiledMap(this.scene, mdata)
    this.add(dtMap)

    console.log(mdata.children)
    if(mdata.children){
      this.tiledmap(mdata.children)
    }
  }

  display() {
    let {anchorX, anchorY, originX, originY, row, col} = this.mdata
    // this.skin = this.scene.add.image(0, (maxH / 2) * this.h, 'jqr')
    console.log(this.mdata.img)
    this.skin = this.scene.add.image(0, 0, this.mdata.img)

    let {width, height} = this.skin
    let ax = anchorX / width
    let ay = anchorY / height
    // console.log(width, height, anchorX, anchorY, ax, ay)
    this.add(this.skin)
    this.skin.x -= (ax * width - width / 2)
    this.skin.y -= (ay * height - height / 2)
    // this.skin.x -= (ax * width - width / 2 + this.scene.stMap.mapData.tileWidth/2)
    // this.skin.y -= (ay * height - height / 2 + this.scene.stMap.mapData.tileHeight/2)
    this.skin.x += this.scene.stMap.mapData.tileWidth/2
    this.skin.y += this.scene.stMap.mapData.tileHeight/2
    // this.skin.setOrigin(ax,ay)
    // console.log(this.skin.x, this.skin.y)

    this.skin.setInteractive({
      pixelPerfect: true,
      draggable: true
    })
    this.skin.on('pointerdown', (pointer: any, gameObject: any) => {
      this.over()
      // console.log('originX:%d, originY:%d, row:%d, col:%d', originX, originY, row, col)
    })

    this.skin.on('pointerout', (pointer: any, gameObject: any) => {
      this.out()
    })

    this.skin.on('pointerup', (pointer: any, gameObject: any) => {
      this.out()
    })

    this.skin.on('dragstart', (pointer: any, gameObject: any, dragX: any, dragY: any) => {
      this.startX = this.x - this.skin.x
      this.startY = this.y - this.skin.y

      this.parentContainer.moveTo(this, this.parentContainer.list.length - 1)
    })

    this.skin.on('drag', (pointer, dragX, dragY) => {
      this.x = this.startX + dragX;
      this.y = this.startY + dragY;
    });

    this.skin.on('dragend', (pointer: any, gameObject: any, dragX: any, dragY: any) => {
      let {x, y} = this.getGridXY()
      window['TweenMax'].to(this, 0.3, {x,y, ease: window['Power2'].easeOut})
    })
  }

  getMapXY(row,col){
    return this.scene.stMap.mapData.map2screen(row,col)
  }

  getGridXY(){
    let {rowNum, columnNum} = this.scene.stMap.mapData.screen2map(this.x + this.scene.stMap.mapData.tileWidth/2, this.y + this.scene.stMap.mapData.tileHeight/2)
    return this.scene.stMap.mapData.map2screen(rowNum, columnNum)
  }

  over() {
    this.skin.setTint(Math.random() * 16000000)
  }

  out() {
    this.skin.clearTint()
  }
}
