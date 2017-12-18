const C = 4;

class Renderer {
  constructor() {
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
        self.sphereList.push(sphere);
        xx.push(sphere);
        self.scene.add(sphere);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
      } yy.push(xx);
      } self.sphere3DArray.push(yy);
      }
    });
    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight.position.set(50,50,50);
    this.scene.add(this.directionalLight);
    const ambientLight = new THREE.AmbientLight(0x333333);
    this.scene.add(ambientLight);

    this.directionalLight.castShadow = true;
//    this.directionalLight.shadow.camera.near    = 0;
//    this.directionalLight.shadow.camera.far     = 50;
    this.directionalLight.shadow.camera.top     = 80;
    this.directionalLight.shadow.camera.bottom  = -80;
    this.directionalLight.shadow.camera.left    = -80;
    this.directionalLight.shadow.camera.right   = 80;
    this.directionalLight.shadow.mapSize.width  = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;

      
    this.directionalLight2 = new THREE.DirectionalLight(0xFFFFFF);
    this.directionalLight2.position.set(-50,50,-50);
    this.scene.add(this.directionalLight2);
    this.directionalLight2.castShadow = true;
//    this.directionalLight.shadow.camera.near    = 0;
//    this.directionalLight.shadow.camera.far     = 50;
    this.directionalLight2.shadow.camera.top     = 80;
    this.directionalLight2.shadow.camera.bottom  = -80;
    this.directionalLight2.shadow.camera.left    = -80;
    this.directionalLight2.shadow.camera.right   = 80;
    this.directionalLight2.shadow.mapSize.width  = 2048;
    this.directionalLight2.shadow.mapSize.height = 2048;
      
    plane.receiveShadow = true;
    this.renderer.shadowMap.enabled = true;
      
    var directionalLightShadowHelper = new THREE.CameraHelper(this.directionalLight.shadow.camera);
    this.scene.add( directionalLightShadowHelper);
    var directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight);
    this.scene.add( directionalLightHelper);
    this.frameFloatCount = 0.0;
  }
  update() {
    this.directionalLight.position.set(50 * Math.cos(this.frameFloatCount), 50, 50 * Math.sin(this.frameFloatCount));
    this.directionalLight2.position.set(50 * Math.cos(this.frameFloatCount + Math.PI), 50, 50 * Math.sin(this.frameFloatCount + Math.PI));
    this.frameFloatCount += 0.006;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
};