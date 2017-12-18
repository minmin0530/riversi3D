class Mesh {
  constructor() {
  }
  sphere(textureCube) {
    const sphereGeometry = new THREE.SphereGeometry( 5, 32, 32 );
    const sphereMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            envMap: textureCube,
            reflectivity: 1.0
    });
    return new THREE.Mesh(sphereGeometry, sphereMaterial);
  }
  box() {
    const boxGeometry = new THREE.BoxGeometry(400,400,400);
    const boxMaterial = new THREE.MeshNormalMaterial();
    return new THREE.Mesh(boxGeometry, boxMaterial);
  }
  skybox(textureCube) {
    const shader = THREE.ShaderLib["cube"];
    shader.uniforms["tCube"].value = textureCube;
    const material = new THREE.ShaderMaterial({
       fragmentShader: shader.fragmentShader,
       vertexShader: shader.vertexShader,
       uniforms: shader.uniforms,
       depthWrite: false,
       side: THREE.DoubleSide
    });
    return new THREE.Mesh(new THREE.BoxGeometry(10000, 10000, 10000), material);
  }
  plane() {
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500, 10, 10),
      new THREE.MeshLambertMaterial({
        color: 0xffffff
      })
    );
    plane.position.y = -80;
    plane.rotation.x = -Math.PI / 2;
    return plane;
  }
  update() {
    this.boxMesh.rotation.y += 0.01;
  }
}
