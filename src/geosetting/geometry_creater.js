import * as THREE from 'three';
import { OBJLoader } from "./../module/OBJLoader";
import { MTLLoader } from "./../module/MTLLoader";

//Geometry(boxとかメッシュとか)を作って返す。分割用。
export function GeoCreater(scene) {
    const loader = new THREE.TextureLoader();

    //scene.fog = new THREE.FogExp2(0x000000, 0.005);

    var flowling_img = loader.load('./imgs/flowling.jpg');
    flowling_img.wrapS = flowling_img.wrapT = THREE.RepeatWrapping;
    flowling_img.repeat.set(10, 10);

    var ground = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100, 10, 10),
        new THREE.MeshLambertMaterial({ map: flowling_img })
    );

    ground.rotation.x = Math.PI / -2;
    ground.position.y -= 7
    scene.add(ground);

    /*
        var gridHelper = new THREE.GridHelper(100, 20, 0xffffff, 0xffffff);
        gridHelper.position.y -= 7
        scene.add(gridHelper);
    */

    //平行光源を生成
    const light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(20, 1, 0);
    scene.add(light2);

    const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
    scene.add(light);

    /*
      const gltfLoader = new GLTFLoader();
        gltfLoader.load('./models/cotage.gltf', (gltf) => {
          const root = gltf.scene;
          scene.add(root);
        });
    */
    //横縦の画像貼り付けデータ
    let boxArrayData = [
        new Array(7),
        new Array(7),
        new Array(7),
    ];

    let imgArrayData = [
        new Array(7),
        new Array(7),
        new Array(7),
    ];

    let positionZData = [
        45, 30, 15, 0, -15, -30, -45
    ]
    let positionYData = [
        -2, 13, 28
    ]

    const geometry = new THREE.BoxGeometry(1, 10, 10);
    const plane = new THREE.PlaneGeometry(10, 10, 1, 1);
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 7; i++) {
            boxArrayData[j][i] = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x999999 }));
            boxArrayData[j][i].position.z = positionZData[i]
            boxArrayData[j][i].position.y = positionYData[j] - 0.01
            boxArrayData[j][i].position.x = -50
            scene.add(boxArrayData[j][i]);

            //あらかじめ画像はresizeしたほうがいいね
            imgArrayData[j][i] = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({ map: loader.load('./imgs/serval2.jpg') }));
            imgArrayData[j][i].position.z = positionZData[i];
            imgArrayData[j][i].position.y = positionYData[j];
            imgArrayData[j][i].position.x = -49.499;
            imgArrayData[j][i].rotation.y = Math.PI / 2;
            scene.add(imgArrayData[j][i]);
        }
    }
    const geometry2 = new THREE.BoxGeometry(1.5, 40, 103.001);
    const wall_img = loader.load('./imgs/stone_wall03.jpg');
    wall_img.wrapS = wall_img.wrapT = THREE.RepeatWrapping;
    wall_img.repeat.set(2.5, 2.5);

    const wall1 = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({ map: wall_img }));
    wall1.position.z = 0;
    wall1.position.y = 13;
    wall1.position.x = -50.5;
    scene.add(wall1);

    const wall2 = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({ map: wall_img }));
    wall2.position.z = 0;
    wall2.position.y = 13;
    wall2.position.x = 50.5;
    scene.add(wall2);

    const geometry3 = new THREE.BoxGeometry(103.001, 40, 1.5);
    const wall3 = new THREE.Mesh(geometry3, new THREE.MeshBasicMaterial({ map: wall_img }));
    wall3.position.z = 50.5;
    wall3.position.y = 13;
    wall3.position.x = 0;
    scene.add(wall3);

    const wall4 = new THREE.Mesh(geometry3, new THREE.MeshBasicMaterial({ map: wall_img }));
    wall4.position.z = -50.5;
    wall4.position.y = 13;
    wall4.position.x = 0;
    scene.add(wall4);

    //3Dモデル、フェネックを読み込み
    let mtlLoader = new MTLLoader();
    let objLoader = new OBJLoader();
    mtlLoader.load('./models/fennec/fennec.mtl', (materials) => {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load('./models/fennec/fennec.obj', (object) => {
            object.scale.x = 0.5;
            object.scale.y = 0.5;
            object.scale.z = 0.5;
            object.position.x = 46;
            object.position.y = -7;
            object.position.z = -25;
            object.rotation.y = Math.PI / -2;
            scene.add(object);
        })
    })

    //3Dモデル、ホワイトボード読込み
    let mtlLoader2 = new MTLLoader();
    let objLoader2 = new OBJLoader();
    mtlLoader2.load('./models/whiteboard/whiteboard.mtl', (materials) => {
        materials.preload();
        objLoader2.setMaterials(materials);
        objLoader2.load('./models/whiteboard/whiteboard.obj', (object) => {
            object.scale.x = 0.5;
            object.scale.y = 0.5;
            object.scale.z = 0.5;
            object.position.x = 46;
            object.position.y = -7;
            object.position.z = -35;
            object.rotation.y = Math.PI / -2;
            scene.add(object);
        })
    })

    //discordアイコン読み込み
    var discordicon = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 10, 10),
        new THREE.MeshLambertMaterial({ map: loader.load('./objicon/discord.png'), alphaTest: 0.5, })
    );
    discordicon.position.x = 45.8;
    discordicon.position.y = -0.5;
    discordicon.position.z = -39;
    discordicon.rotation.y = Math.PI / -2;
    scene.add(discordicon);

    //twitterアイコン読み込み
    var twittericon = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 10, 10),
        new THREE.MeshLambertMaterial({ map: loader.load('./objicon/twitter.png'), alphaTest: 0.5, })
    );
    twittericon.scale.x = 0.8;
    twittericon.scale.y = 0.8;
    twittericon.position.x = 45.8;
    twittericon.position.y = -0.5;
    twittericon.position.z = -37;
    twittericon.rotation.y = Math.PI / -2;
    scene.add(twittericon);


    //githubアイコン読み込み
    var githubicon = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 10, 10),
        new THREE.MeshLambertMaterial({ map: loader.load('./objicon/github.png'), alphaTest: 0.5, })
    );
    githubicon.scale.x = 0.8;
    githubicon.scale.y = 0.8;
    githubicon.position.x = 45.8;
    githubicon.position.y = -0.5;
    githubicon.position.z = -35;
    githubicon.rotation.y = Math.PI / -2;
    scene.add(githubicon);


    const fontloader = new THREE.FontLoader();

    fontloader.load('fonts/helvetiker_regular.typeface.json', function (font) {

        const textgeometry = new THREE.TextGeometry('Accounts', {
            font: font,
            size: 4,
            height: 1,
            curveSegments: 12,
        });
        var materials = [
            new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, overdraw: 0.5 }),
            new THREE.MeshBasicMaterial({ color: 0x000000, overdraw: 0.5 })
        ];
        var text = new THREE.Mesh(
            textgeometry,
            materials
        );
        text.position.x = 50;
        text.position.y = 6;
        text.position.z = -44
        text.rotation.y = Math.PI / -2;
        scene.add(text)
    });


    // ゲーミングキューブ！！！
    var gamingsphere = new THREE.Mesh(
        new THREE.SphereGeometry(8, 80, 80), // 形状     
        new THREE.MeshLambertMaterial({ color: 0xff0000, overdraw: 0.5 })
    );
    gamingsphere.position.set(0, 0, 0);
    gamingsphere.position.x = 40;
    gamingsphere.position.y = -7;
    gamingsphere.position.z = 40;
    gamingsphere.rotation.y = Math.PI / -2;
    scene.add(gamingsphere);

    return (gamingsphere);

}