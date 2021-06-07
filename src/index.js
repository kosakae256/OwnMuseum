import * as THREE from 'three';
import { FirstPersonControls } from "./module/FPC";
import { GLTFLoader } from "./module/GLTFLoader";
import { GeoCreater } from "./geosetting/geometry_creater";
import { GamingMove } from "./geosetting/gamingmove";
import { Wall } from "./detect/is_wall";
import { TouchExecute } from "./touch/touchExecute";
import { TouchDiscord, TouchTwitter, TouchGithub ,TouchFennec} from "./touch/functions";

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
  const touchobjects = GeoCreater(scene);
  const gamingsphere = touchobjects[0];

  controls.lookSpeed = 0.00;
  controls.movementSpeed = 25.0;


  document.addEventListener("mousedown", mousedown, false);
  function mousedown(e) {
    console.log(e)
      controls.lookSpeed = 0.25;
  }

  document.addEventListener("contextmenu", Contextmenu, false);
  function Contextmenu(e) {
    controls.lookSpeed = 0;
    
    //icon系のタッチ処理,disco,twi,gitの順
    TouchExecute([touchobjects[1]], e, TouchDiscord, camera,scene)
    TouchExecute([touchobjects[2]], e, TouchTwitter, camera,scene)
    TouchExecute([touchobjects[3]], e, TouchGithub, camera,scene)
    TouchExecute([touchobjects[4]], e, TouchFennec, camera,scene)
  }

  document.addEventListener("mouseup", mouseup, false);
  function mouseup(e) {
    controls.lookSpeed = 0.00;
  }
//リサイズの処理
  function onResize() {
    // サイズを取得
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
  
    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const clock = new THREE.Clock(true)
  const tick = () => {
    requestAnimationFrame(tick);
    controls.update(clock.getDelta())

    //一定以上高さに維持、壁判定
    if (debugmode != true) {
      Wall(camera)
    }

    GamingMove(gamingsphere);
    onResize();
    renderer.render(scene, camera);
    controls.handleResize()

  };
  tick();
});