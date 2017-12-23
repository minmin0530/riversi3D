var self;
class Game {
  constructor() {
    this.turn = 0;
    this.riversi = new Riversi();
    this.renderer = new Renderer(this.riversi.field);
    this.raycaster = new THREE.Raycaster();

    this.mouse = new THREE.Vector2();
    this.mouseDownFlag = false;      
    this.renderer.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.renderer.canvas.addEventListener("mousedown" , this.handleMouseDown);


    self = this;
    self.mainLoop();
  }
  handleMouseMove(event) {
        var element = event.currentTarget;
        // canvas要素上のXY座標
        var x = event.clientX - element.offsetLeft;
        var y = event.clientY - element.offsetTop;
        // canvas要素の幅・高さ
        var w = element.offsetWidth;
        var h = element.offsetHeight;

        // -1〜+1の範囲で現在のマウス座標を登録する
        self.mouse.x = ( x / w ) * 2 - 1;
        self.mouse.y = -( y / h ) * 2 + 1;
  }
  handleMouseDown(event) {
    self.mouseDownFlag = true;
  }
  mainLoop() {
    self.raycaster.setFromCamera(self.mouse, self.renderer.camera);

    const intersects2 = self.raycaster.intersectObjects(self.renderer.sphereList);
    for (let z = 0; z < C; z++) {
    for (let y = 0; y < C; y++) {
    for (let x = 0; x < C; x++) {
      if(intersects2.length > 0 && self.renderer.sphere3DArray[z][y][x] === intersects2[0].object) {
        if (self.mouseDownFlag) {
          if (self.turn % 2 == 0) {
            self.renderer.sphere3DArray[z][y][x].material.color.setHex(0xFF0000);
            self.riversi.field[z][y][x] = 0;
          } else if (self.turn % 2 == 1) {
            self.renderer.sphere3DArray[z][y][x].material.color.setHex(0x00FF00);
            self.riversi.field[z][y][x] = 1;
          }
          ++self.turn;
          var canPut = self.riversi.findPlacesWhereYouCanPut(self.turn % 2);
          for (var v = 0; v < canPut.length; ++v) {
            self.renderer.sphere3DArray[canPut[v].z][canPut[v].y][canPut[v].x].visible = true;
          }
//          tipOver(turn % 2, x, y, z);
        }
      }
    }
    }
    }
    self.mouseDownFlag = false;
    self.renderer.update();
    requestAnimationFrame(self.mainLoop);
  }
};
new Game();