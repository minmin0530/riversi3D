class Renderer {
  constructor(field) {
    var width = 960;
    var height = 540;
    this.canvas = document.querySelector('#myCanvas');
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width/ height);
    this.camera.position.set(0, 0, C * 15);
    this.controls = new THREE.OrbitControls(this.camera);
    var imgPath = '/clouds1/';
    var urls = [
        imgPath+'clouds1_east.bmp',
        imgPath+'clouds1_west.bmp',
        imgPath+'clouds1_up.bmp',
        imgPath+'clouds1_down.bmp',
        imgPath+'clouds1_north.bmp',
        imgPath+'clouds1_south.bmp'
    ];

    this.sphereList = [];
    this.sphere3DArray = [];
    var self = this;
    const mesh = new Mesh();
    const plane = mesh.plane();
    self.scene.add(plane);
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    cubeTextureLoader.load( urls, function( textureCube){
      textureCube.format = THREE.RGBFormat;
      textureCube.mapping = THREE.CubeReflectionMapping; // 屈折

      self.scene.add(mesh.skybox(textureCube));
      for (var z = -C/2; z < C/2; ++z) {var yy = [];
      for (var y = -C/2; y < C/2; ++y) {var xx = [];
      for (var x = -C/2; x < C/2; ++x) {
        const sphere = mesh.sphere(textureCube);
        sphere.position.set(x * 15, y * 15, z * 15);
        if (x < -1 || y < -1 || z < -1 ||
           x >= 1 || y >= 1 || z >= 1) {
          sphere.visible = false;
        } else {
          sphere.material.opacity = 0.5;
          sphere.material.transparent = true;
        }
        self.sphereList.push(sphere);
        xx.push(sphere);
        self.scene.add(sphere);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
      } yy.push(xx);
      } self.sphere3DArray.push(yy);
      }
    });

//    const ambientLight = new THREE.AmbientLight(0x333333);
//    this.scene.add(ambientLight);

    this.directionalLight = [];
    for (var v = 0; v < 2; ++v) {
      this.directionalLight.push(new THREE.DirectionalLight(0xFFFFFF));
      this.directionalLight[v].position.set(-50,50,-50);
      this.scene.add(this.directionalLight[v]);
      this.directionalLight[v].castShadow = true;
//      this.directionalLight[v].shadow.camera.near    = 0;
//      this.directionalLight[v].shadow.camera.far     = 50;
      this.directionalLight[v].shadow.camera.top     = 80;
      this.directionalLight[v].shadow.camera.bottom  = -80;
      this.directionalLight[v].shadow.camera.left    = -80;
      this.directionalLight[v].shadow.camera.right   = 80;
      this.directionalLight[v].shadow.mapSize.width  = 2048;
      this.directionalLight[v].shadow.mapSize.height = 2048;
//      var directionalLightShadowHelper = new THREE.CameraHelper(this.directionalLight[v].shadow.camera);
//      this.scene.add( directionalLightShadowHelper);
//      var directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight[v]);
//      this.scene.add( directionalLightHelper);
    }
    plane.receiveShadow = true;
    this.renderer.shadowMap.enabled = true;
      
    this.frameFloatCount = 0.0;
  }
  update() {
    this.directionalLight[0].position.set(50 * Math.cos(this.frameFloatCount), 50, 50 * Math.sin(this.frameFloatCount));
    this.directionalLight[1].position.set(50 * Math.cos(this.frameFloatCount + Math.PI), 50, 50 * Math.sin(this.frameFloatCount + Math.PI));
    this.frameFloatCount += 0.006;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
};