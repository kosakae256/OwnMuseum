import * as THREE from 'three';
import { FirstPersonControls } from "./module/FPC";
import { GLTFLoader } from "./module/GLTFLoader";
import { GeoCreater } from "./geosetting/geometry_creater";
import { GamingMove } from "./geosetting/gamingmove";
import { Wall } from "./detect/is_wall";

const debugmode = false
//let material = new THREE.ShaderMaterial({
// vertexShader: vertexShader,
//fragmentShader: fragmentShader
//});

window.addEventListener('DOMContentLoaded', () => {
  const VIEWPORT_W = window.innerWidth;
  const VIEWPORT_H = window.innerHeight;

  const loader = new THREE.TextureLoader();

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, VIEWPORT_W / VIEWPORT_H, 1, 1000);
  const controls = new FirstPersonControls(camera, renderer.domElement);  //カメラにOrbitControls機能を付与

  // レンダラーのサイズを設定
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x89BDDE, 1);
  // canvasをbodyに追加
  document.body.appendChild(renderer.domElement);

  // シーンを作成
  const scene = new THREE.Scene();
  const gamingsphere = GeoCreater(scene);

  controls.lookSpeed = 0.00;
  controls.movementSpeed = 40.0;

  const clock = new THREE.Clock(true)

  document.addEventListener("mousedown", mousedown, false);
  function mousedown(e) {
    controls.lookSpeed = 0.25;
  }

  document.addEventListener("mouseup", mouseup, false);
  function mouseup(e) {
    controls.lookSpeed = 0.00;
  }

  //gamingsphere.geometry.colorsNeedUpdate = true;
  console.log(gamingsphere.material.color)

  const tick = () => {
    requestAnimationFrame(tick);

    controls.update(clock.getDelta())

    //一定以上高さに維持、壁判定
    if (debugmode != true) {
      Wall(camera)
    }

    GamingMove(gamingsphere);

    renderer.render(scene, camera);

    controls.handleResize()

  };
  tick();
});