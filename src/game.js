var self;
class Game {
  constructor() {
    this.renderer = new Renderer();
    this.raycaster = new THREE.Raycaster();

    this.mouse = new THREE.Vector2();
    this.mouseDownFlag = false;      
    this.renderer.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.renderer.canvas.addEventListener("mousedown" , this.handleMouseDown);

    self = this;
    self.mainLoop();
  }
  handleMouseMove(event) {
        const element = event.currentTarget;
        // canvas要素上のXY座標
        const x = event.clientX - element.offsetLeft;
        const y = event.clientY - element.offsetTop;
        // canvas要素の幅・高さ
        const w = element.offsetWidth;
        const h = element.offsetHeight;

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
          self.renderer.sphere3DArray[z][y][x].material.color.setHex(0xFF0000);
//          tipOver(turn % 2, x, y, z);
//          ++turn;
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