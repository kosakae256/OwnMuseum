import * as THREE from 'three';
import { OBJLoader } from "./../module/OBJLoader";
import { MTLLoader } from "./../module/MTLLoader";

//Geometry(boxとかメッシュとか)を作って返す。分割用。
export function GeoCreater(scene) {
    var returnobjects = []

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

        var testobj = new THREE.Mesh(
            new THREE.BoxGeometry(2,2,2), // 形状     
            new THREE.MeshLambertMaterial({ color: 0xff0000,opacity : 0.99,transparent: true,side: THREE.DoubleSide})
        );
        testobj.position.set(0, 0, 0);
        testobj.position.x = 10000;
        testobj.position.y = 0;
        testobj.position.z = 10000;
        testobj.rotation.y = Math.PI / -4;
        testobj.rotation.z = Math.PI / -4;
        testobj.rotation.x = Math.PI / -4;
        scene.add(testobj);

/*
    //平行光源を生成
    const light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(10000, 100, 10000);
    //scene.add(light2);

    const light3 = new THREE.PointLight(0xffffff, 2, 9, 0.95);
    light3.position.set(10000, -3, 10000);
    //scene.add(light3);

    const light5 = new THREE.PointLight(0xffffff, 2, 9, 0.9);
    light5.position.set(10000, 3, 10000);
    //scene.add(light5);
*/

    const light = new THREE.AmbientLight(0x444444, 1.0);
    scene.add(light);
    
    const light4 = new THREE.SpotLight(0xffffff, 2, 18, Math.PI/2, 100,0.1);
    light4.position.set(10000,10,10000);
    light4.target = testobj;
    scene.add(light4);
    const light5 = new THREE.SpotLight(0xffffff, 1, 13, Math.PI/3, 0.2, 0.4);
    light5.position.set(10000,3,10000);
    light5.target = testobj;
    //scene.add(light5);
    const light6 = new THREE.SpotLight(0xffffff, 1, 13, Math.PI/4, 0.2, 0.4);
    light6.position.set(10000,3,10000);
    light6.target = testobj;
    //scene.add(light6);

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
    mtlLoader.load('./models/fennec/fennec.mtl', (mtl) => {
        mtl.preload();
        mtl.materials.side = THREE.DoubleSide;
        objLoader.setMaterials(mtl);
        objLoader.load('./models/fennec/fennec.obj', (object) => {
            object.scale.x = 0.5;
            object.scale.y = 0.5;
            object.scale.z = 0.5;
            object.position.x = 46;
            object.position.y = -7;
            object.position.z = -25;
            object.rotation.y = Math.PI / -2;
            object.name = "fennec3D"
            scene.add(object);
        })
    })

    //フェネックの当たり判定
    const geometry_fene = new THREE.BoxGeometry(4, 20, 4);
    const fennec_hantei = new THREE.Mesh(geometry_fene, new THREE.MeshBasicMaterial({ color : 0xffffff, opacity : 0.0,transparent: true,}));
    fennec_hantei.position.x = 46;
    fennec_hantei.position.y = -7;
    fennec_hantei.position.z = -25;
    fennec_hantei.rotation.y = Math.PI / -2;
    scene.add(fennec_hantei);

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

    //steve読み込み
    let mtlLoader3 = new MTLLoader();
    let objLoader3 = new OBJLoader();
    mtlLoader3.load('./models/steve/steve.mtl', (materials) => {
        materials.preload();
        objLoader3.setMaterials(materials);
        objLoader3.load('./models/steve/steve.obj', (object) => {
            object.scale.x = 1;
            object.scale.y = 1;
            object.scale.z = 1;
            object.position.x = 46;
            object.position.y = -3.5;
            object.position.z = -20;
            object.rotation.y = Math.PI / -2;
            scene.add(object);
        })
    })

    //dome読み込み
    let mtlLoader4 = new MTLLoader();
    let objLoader4 = new OBJLoader();
    mtlLoader4.load('./models/dome/dome.mtl', (mtl) => {
        mtl.preload();
        console.log(mtl)
        mtl.materials.side = THREE.DoubleSide;
        objLoader4.setMaterials(mtl);
        objLoader4.load('./models/dome/dome.obj', (object) => {
            console.log(object)
            object.scale.x = 30;
            object.scale.y = 30;
            object.scale.z = 30;
            object.position.x = 10000;
            object.position.y = -7;
            object.position.z = 10000;
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

    //文字1,アカウント
    const fontloader = new THREE.FontLoader();
    fontloader.load('fonts/helvetiker_regular.typeface.json', function (font) {

        const textgeometry = new THREE.TextGeometry('Accounts', {
            font: font,
            size: 4,
            height: 1,
            curveSegments: 12,
        });
        var materials = [
            new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff, overdraw: 0.5 }),
            new THREE.MeshLambertMaterial({ color: 0x000000, overdraw: 0.5 })
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

    //文字2,協力者
    const fontloader2 = new THREE.FontLoader();
    fontloader2.load('fonts/helvetiker_regular.typeface.json', function (font) {

        const textgeometry = new THREE.TextGeometry('Cooperation', {
            font: font,
            size: 4,
            height: 1,
            curveSegments: 12,
        });
        var materials = [
            new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff, overdraw: 0.5 }),
            new THREE.MeshLambertMaterial({ color: 0x000000, overdraw: 0.5 })
        ];
        var text = new THREE.Mesh(
            textgeometry,
            materials
        );
        text.position.x = 24;
        text.position.y = 6;
        text.position.z = 50
        text.rotation.y = Math.PI;
        scene.add(text)
    });

    //文字3 3dモデル提供者
    const fontloader3 = new THREE.FontLoader();
    fontloader3.load('fonts/helvetiker_regular.typeface.json', function (font) {

        const textgeometry = new THREE.TextGeometry('from AT-GOOLD\nfennec 3D model\nhttps://3d.nicovideo.jp/works/td29482', {
            font: font,
            size: 0.7,
            height: 0.01,
            curveSegments: 12,
        });
        var materials = [
            new THREE.MeshLambertMaterial({ color: Math.random() * 0x000000, overdraw: 0.5 }),
            new THREE.MeshLambertMaterial({ color: 0x000000, overdraw: 0.5 })
        ];
        var text = new THREE.Mesh(
            textgeometry,
            materials
        );
        text.position.x = 24;
        text.position.y = 3.5;
        text.position.z = 49.5;
        text.rotation.y = Math.PI;
        scene.add(text)
    });

    //文字4 three.js
    const fontloader4 = new THREE.FontLoader();
    fontloader4.load('fonts/helvetiker_regular.typeface.json', function (font) {

        const textgeometry = new THREE.TextGeometry('Used main librarys\nThree.js(javascript library)\n\nThanks.', {
            font: font,
            size: 0.7,
            height: 0.01,
            curveSegments: 12,
        });
        var materials = [
            new THREE.MeshLambertMaterial({ color: Math.random() * 0x000000, overdraw: 0.5 }),
            new THREE.MeshLambertMaterial({ color: 0x000000, overdraw: 0.5 })
        ];
        var text = new THREE.Mesh(
            textgeometry,
            materials
        );
        text.position.x = 24;
        text.position.y = -1;
        text.position.z = 49.5;
        text.rotation.y = Math.PI;
        scene.add(text)
    });

    //文字5 comingsoon
    const fontloader5 = new THREE.FontLoader();
    fontloader5.load('fonts/helvetiker_regular.typeface.json', function (font) {

        const textgeometry = new THREE.TextGeometry('~ Coming Soon ~', {
            font: font,
            size: 0.7,
            height: 0.01,
            curveSegments: 12,
        });
        var materials = [
            new THREE.MeshLambertMaterial({ color: Math.random() * 0x000000, overdraw: 0.5 }),
            new THREE.MeshLambertMaterial({ color: 0x000000, overdraw: 0.5 })
        ];
        var text = new THREE.Mesh(
            textgeometry,
            materials
        );
        text.position.x = 37;
        text.position.y = 2;
        text.position.z = 31;
        text.rotation.y = Math.PI/4 + Math.PI;
        scene.add(text)
    });


    // ゲーミングキューブ！！！
    var gamingsphere = new THREE.Mesh(
        new THREE.SphereGeometry(8, 80, 80), // 形状     
        new THREE.MeshLambertMaterial({ color: 0xff0000, overdraw: 0.5})
    );
    gamingsphere.position.set(0, 0, 0);
    gamingsphere.position.x = 40;
    gamingsphere.position.y = -7;
    gamingsphere.position.z = 40;
    gamingsphere.rotation.y = Math.PI / -2;
    scene.add(gamingsphere);

    var returnobjects = [gamingsphere,discordicon,twittericon,githubicon,fennec_hantei];
    //returnobjects.push(scene.getObjectByName("fennec3D"));

    return (returnobjects);

}
