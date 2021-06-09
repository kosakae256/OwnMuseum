import * as THREE from 'three';
import { FirstPersonControls } from "./module/FPC";
import { GLTFLoader } from "./module/GLTFLoader";
import { GeoCreater } from "./geosetting/geometry_creater";
import { GamingMove } from "./geosetting/gamingmove";
import { SpriteControl } from "./geosetting/sprite_setting";
import { Wall } from "./detect/is_wall";
import { Warp } from "./detect/is_warp";
import { TouchExecute} from "./object_event/touchExecute";
import { TouchDiscord, TouchTwitter, TouchGithub, TouchFennec, TouchAwareShe, TouchHackDay, TouchMitou, TouchOldSite, TouchTwitterBot, TouchPartoff, TouchParton} from "./object_event/functions";
import { SeenObjects } from "./object_event/Focus";


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
  renderer.shadowMap.enabled = true;

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, VIEWPORT_W / VIEWPORT_H, 1, 1000);
  const controls = new FirstPersonControls(camera, renderer.domElement);  //カメラにOrbitControls機能を付与
  camera.position.x = 40;

  // レンダラーのサイズを設定
  renderer.setSize(VIEWPORT_W, VIEWPORT_H);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x89BDDE, 1);
  // canvasをbodyに追加
  document.body.appendChild(renderer.domElement);

  // シーンを作成
  const scene = new THREE.Scene();
  const touchobjects = GeoCreater(scene,camera);
  const gamingsphere = touchobjects[0];
  const gamingsphere2 = touchobjects[1];

  controls.lookSpeed = 0.00;
  controls.movementSpeed = 25.0;

  const spritecontrol = new SpriteControl();
  spritecontrol.setsprite(scene)


  document.addEventListener("mousedown", mousedown, false);
  function mousedown(e) {
    console.log(e)
    controls.lookSpeed = 0.25;
  }

  document.addEventListener("contextmenu", Contextmenu, false);
  function Contextmenu(e) {
    controls.lookSpeed = 0;

    //icon系のタッチ処理,disco,twi,gitの順
    TouchExecute([touchobjects[2]], e, TouchDiscord, camera, scene)
    TouchExecute([touchobjects[3]], e, TouchTwitter, camera, scene)
    TouchExecute([touchobjects[4]], e, TouchGithub, camera, scene)
    TouchExecute([touchobjects[5]], e, TouchFennec, camera, scene)
    TouchExecute([touchobjects[6]], e, TouchTwitterBot, camera, scene)
    TouchExecute([touchobjects[9]], e, TouchAwareShe, camera, scene)
    TouchExecute([touchobjects[10]], e, TouchHackDay, camera, scene)
    TouchExecute([touchobjects[12]], e, TouchMitou, camera, scene)
    TouchExecute([touchobjects[13]], e, TouchOldSite, camera, scene)
    TouchExecute([touchobjects[14]], e, TouchParton, camera, scene)
    TouchExecute([touchobjects[15]], e, TouchPartoff, camera, scene)
  }

  document.addEventListener("mouseup", mouseup, false);
  function mouseup(e) {
    controls.lookSpeed = 0.00;
  }
  document.addEventListener("mousemove", mousemove, false);
  function mousemove(e) {
    //focusするやつ
    SeenObjects(camera,e,touchobjects,scene);
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
  //camera.position.z = 10000;
  //camera.position.x = 10000;
 
  const tick = () => {
    controls.update(clock.getDelta())
    requestAnimationFrame(tick);

    //一定以上高さに維持、壁判定
    if (debugmode != true) {
      Wall(camera);
    }
    Warp(camera,controls);

    GamingMove(gamingsphere);
    GamingMove(gamingsphere2)

    spritecontrol.update()

    onResize();
    renderer.render(scene, camera);
    controls.handleResize()
  };
  tick();
});