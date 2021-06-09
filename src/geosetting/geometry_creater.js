import * as THREE from 'three';
import { OBJLoader } from "./../module/OBJLoader";
import { MTLLoader } from "./../module/MTLLoader";

//Geometry(boxとかメッシュとか)を作って返す。分割用。
export function GeoCreater(scene,camera) {
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

    


    function artifact_creater(x, z, stry, color, ballname,hanten = false,caption) {

        var obj = new THREE.Mesh(
            new THREE.SphereGeometry(1.25, 80, 80), // 形状  , // 形状     
            new THREE.MeshLambertMaterial({ color: color, opacity: 0.25, transparent: true })
        );
        obj.position.set(0, 0, 0);
        obj.position.x = x;
        obj.position.y = 0;
        obj.position.z = z;
        scene.add(obj);

        var obj_decision = new THREE.Mesh(
            new THREE.SphereGeometry(1.30, 80, 80), // 形状  , // 形状     
            new THREE.MeshLambertMaterial({ color: color, opacity: 0, transparent: true })
        );
        obj_decision.position.set(0, 0, 0);
        obj_decision.position.x = x;
        obj_decision.position.y = 0;
        obj_decision.position.z = z;
        obj_decision.name = ballname
        scene.add(obj_decision);

        //3Dモデル、スタンド読み込み
        let mtlLoader = new MTLLoader();
        let objLoader = new OBJLoader();
        mtlLoader.load('./models/stand/stand.mtl', (mtl) => {
            mtl.preload();
            mtl.materials.side = THREE.DoubleSide;
            objLoader.setMaterials(mtl);
            objLoader.load('./models/stand/stand.obj', (object) => {
                object.scale.x = 1;
                object.scale.y = 1;
                object.scale.z = 1;
                object.position.x = x;
                object.position.y = -7;
                object.position.z = z;
                object.rotation.y = stry;
                scene.add(object);
            })
        });

        //アーティファクトクリック時のキャプション
        const fontloader = new THREE.FontLoader();
        fontloader.load('fonts/flopdesign.json', function (font) {
    
            const textgeometry = new THREE.TextGeometry(caption, {
                font: font,
                size: 0.7,
                height: 0.01,
                curveSegments: 12,
            });
            textgeometry.center();
            var materials = [
                new THREE.MeshLambertMaterial({ color: 0xffffff, overdraw: 0.5 }),
                new THREE.MeshLambertMaterial({ color: 0x000000, overdraw: 0.5 })
            ];
            var text = new THREE.Mesh(
                textgeometry,
                materials
            );
            text.position.x = x;
            text.position.y = 20;
            text.position.z = z;
            if (hanten==false) {text.rotation.y = stry + Math.PI/2;}
            else {text.rotation.y = stry + Math.PI/2 + Math.PI;}
            scene.add(text)
        });

        const light = new THREE.SpotLight(0xffff88, 2, 18, Math.PI / 2, 1, 0.5);
        light.position.set(x, 10, z);
        light.target = obj;
        light.penumbra = 1;
        scene.add(light);

        const lightx = new THREE.SpotLight(0xffebcd, 2, 60, Math.PI / 16, 1, 0);
        lightx.position.set(10000, 30, 10000);
        lightx.target = obj;
        scene.add(lightx);
    }

    var arti_info = [
        [9960, 9960, Math.PI / -4, 0xff0000, "ball1",false,"TwitterApplyBot\n\nツイッターでリアルマネーを稼ぐシステム\nアフィリエイトや詐欺など怪しい姑息なやりかたを使わずに\n半オート化に成功しました\n\nどうやってそんなのやってるのっていうのをよく聞かれるのですが\n正直、教えたくないやりかたを使ってます\nというのも、同じことをされるとこちら側の効率が下がります\nなのでここにはやりかたは書きません\n下のソースコードを読んで理解してください\n\nちなみに今は動かしてないです。半オートはだるい。"],
        [9960, 10040, Math.PI / 4, 0xffff00, "ball2",false,"~ Coming Soon ~"],
        [10040, 10040, Math.PI + Math.PI / -4, 0x00ff00, "ball3",false,""],
        [10040, 9960, Math.PI + Math.PI / 4, 0x00ffff, "ball4",false,"Aware She\n\n@takara2314 との共同開発で作った開発物です\n名前の通り「あなただけのガールフレンド」を創れます\n2次元のおんなのこの画像を”虚無から作り出す”システムです\n\n2021/06/09時点で私が創った開発物で最もレベルがたかいプロダクトです\n\n私は機械学習の部分を実装しました\n学内でおこなわれたハッカソン(開発物をみせあって競うやつ)で\n実質的な優勝を勝ち取りました\n\n様々な問題があり、ネット上に公開することは不可能でした\nそのうち公開できるといいですね\n\n下のアーティファクトから、製品の動作例をみることができますよ"],
        [10060, 10000, 0, 0x0000ff, "ball5",true,"Yahho HackDay2021\n\n24時間でなんでもいいから作って\nそれを2分で紹介して競い合おうというやつです\n参加チーム数は約70チームにのぼりました\n\nこのハッカソンを通して、私のレベルはまだまだ低いことを再確認しました。\nどの作品もレベルがたかかったのを覚えています\nおもしろいものばかりなので興味があればぜひみてください\n\nあ、2022もあるっぽいのでだれかいっしょにやりませんか..."],
        [10000, 10060, Math.PI / 2, 0xff00ff, "ball6",false,""],
        [9940, 10000, Math.PI, 0x000000, "ball7",true,"未踏ジュニア応募\n\n全国のつよつよプログラマが集まる未踏ジュニアに応募してました\n超優秀なメンターさんが開発を応援してくれます\nまた、50万円の開発費を提供してもらえます\n受かるだけで超ハイレベルといわれています(倍率8倍)\n\nま、私は落ちたんですけどね！！！！！！！\n1次試験は通ったんですよ。それだけで名誉なことではあるんですが...\n\n未踏に落ちてわかったこともたくさんあります\n今度は後悔しないように頑張ります\n\n下のアーティファクトは未踏ジュニアの公式サイトにとびます。\n17歳以下でしか応募できないので、興味があったらお早めに.."],
        [10000, 9940, Math.PI * 1.5, 0xffffff, "ball8",false,"本サイト\n\n本サイトは主にthree.jsによって作られています\njsを触るのが初めてなので、簡単な実装しかしていません\n\n@takara2314 がなんか3Dでやってたのでパクりました\nごめんなさい。\nパクったとかいわれないくらいにはサイトの形式が違うので許してね\n\nFirstPersonControlなどの操作関係は改造しました\n(本当はめちゃくちゃ操作しにくいんですよ？)\n\n本来このサイトは、絵を置くだけの予定だったのですが...\n\nここは開発物や活動を紹介する場所です\n下のアーティファクトを選択すると前のポートフォリオサイトにとびます\n(何も書かれていないものは、そのうち追加されていきます)"]
    ]

    for (var i = 0; i < 8; i++) {
        artifact_creater(arti_info[i][0], arti_info[i][1], arti_info[i][2], arti_info[i][3], arti_info[i][4],arti_info[i][5],arti_info[i][6])
    }

    const spotlight = new THREE.PointLight(0xffffff, 2, 20, 0.75);
    spotlight.position.set(10000, 5, 10000);
    scene.add(spotlight);


    const ambientlight = new THREE.AmbientLight(0xdddddd, 1.0);
    scene.add(ambientlight);

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
    const geometry_fene = new THREE.CylinderGeometry(2, 2, 10, 80);
    const fennec_decision = new THREE.Mesh(geometry_fene, new THREE.MeshBasicMaterial({ color: 0x1e90ff, opacity: 0, transparent: true, }));
    fennec_decision.position.x = 46;
    fennec_decision.position.y = -2;
    fennec_decision.position.z = -25;
    fennec_decision.rotation.y = Math.PI / -2;
    scene.add(fennec_decision);

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

    //discordアイコンの当たり判定
    var discord_dicision = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 0.1),
        new THREE.MeshBasicMaterial({ color: 0x1e90ff, opacity: 0, transparent: true, })
    );
    discord_dicision.position.x = 45.8;
    discord_dicision.position.y = -0.5;
    discord_dicision.position.z = -39;
    discord_dicision.rotation.y = Math.PI / -2;
    scene.add(discord_dicision)

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

    //twitterアイコンの当たり判定
    var twitter_dicision = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 0.1),
        new THREE.MeshBasicMaterial({ color: 0x1e90ff, opacity: 0, transparent: true, })
    );
    twitter_dicision.position.x = 45.8;
    twitter_dicision.position.y = -0.5;
    twitter_dicision.position.z = -37;
    twitter_dicision.rotation.y = Math.PI / -2;
    scene.add(twitter_dicision)


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

    //githubアイコンの当たり判定
    var github_dicision = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 0.1),
        new THREE.MeshBasicMaterial({ color: 0x1e90ff, opacity: 0, transparent: true, })
    );
    github_dicision.position.x = 45.8;
    github_dicision.position.y = -0.5;
    github_dicision.position.z = -35;
    github_dicision.rotation.y = Math.PI / -2;
    scene.add(github_dicision)

    //パーティクルを付けるボタン
    var parton = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 10, 10),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    parton.scale.x = 0.8;
    parton.scale.y = 0.8;
    parton.position.x = 49.5;
    parton.position.y = -2;
    parton.position.z = -16;
    parton.rotation.y = Math.PI / -2;
    scene.add(parton);

    //パーティクルを付けるボタンの当たり判定
    var parton_dicision = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 0.1),
        new THREE.MeshBasicMaterial({ color: 0x1e90ff, opacity: 0, transparent: true, })
    );
    parton_dicision.position.x = 49.5;
    parton_dicision.position.y = -2;
    parton_dicision.position.z = -16;
    parton_dicision.rotation.y = Math.PI / -2;
    scene.add(parton_dicision)

    //パーティクルを消すボタン
    var partoff = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 10, 10),
        new THREE.MeshLambertMaterial({ color: 0x000000 })
    );
    partoff.scale.x = 0.8;
    partoff.scale.y = 0.8;
    partoff.position.x = 49.5;
    partoff.position.y = -2;
    partoff.position.z = -14;
    partoff.rotation.y = Math.PI / -2;
    scene.add(partoff);

    //パーティクルを消すボタンの当たり判定
    var partoff_dicision = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 0.1),
        new THREE.MeshBasicMaterial({ color: 0x1e90ff, opacity: 0, transparent: true, })
    );
    partoff_dicision.position.x = 49.5;
    partoff_dicision.position.y = -2;
    partoff_dicision.position.z = -14;
    partoff_dicision.rotation.y = Math.PI / -2;
    scene.add(partoff_dicision)

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
            new THREE.MeshLambertMaterial({ color: 0xffd700, overdraw: 0.5 }),
            new THREE.MeshLambertMaterial({ color: 0xffa500, overdraw: 0.5 })
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
            new THREE.MeshLambertMaterial({ color: 0xffd700, overdraw: 0.5 }),
            new THREE.MeshLambertMaterial({ color: 0xffa500, overdraw: 0.5 })
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
            new THREE.MeshLambertMaterial({ color: 0xffffff, overdraw: 0.5 }),
            new THREE.MeshLambertMaterial({ color: 0xffffff, overdraw: 0.5 })
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
            new THREE.MeshLambertMaterial({ color: 0xffffff, overdraw: 0.5 }),
            new THREE.MeshLambertMaterial({ color: 0xffffff, overdraw: 0.5 })
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

    //文字5 develop products
    const fontloader5 = new THREE.FontLoader();
    fontloader5.load('fonts/helvetiker_regular.typeface.json', function (font) {

        const textgeometry = new THREE.TextGeometry('Develop Products', {
            font: font,
            size: 1,
            height: 0.5,
            curveSegments: 12,
        });
        var materials = [
            new THREE.MeshLambertMaterial({ color: 0xffd700, overdraw: 0.5 }),
            new THREE.MeshLambertMaterial({ color: 0xffa500, overdraw: 0.5 })
        ];
        var text = new THREE.Mesh(
            textgeometry,
            materials
        );
        text.position.x = 37;
        text.position.y = 2;
        text.position.z = 31;
        text.rotation.y = Math.PI / 4 + Math.PI;
        scene.add(text)
    });


    // ゲーミングキューブ！！！
    var gamingsphere = new THREE.Mesh(
        new THREE.SphereGeometry(12, 80, 80), // 形状     
        new THREE.MeshLambertMaterial({ color: 0xff0000, overdraw: 0.5, transparent: true, opacity: 0.75 })
    );
    gamingsphere.position.set(0, 0, 0);
    gamingsphere.position.x = 40;
    gamingsphere.position.y = -7;
    gamingsphere.position.z = 40;
    gamingsphere.rotation.y = Math.PI / -2;
    scene.add(gamingsphere);
    
    // ゲーミングキューブ2！！！
    var gamingsphere2 = new THREE.Mesh(
        new THREE.SphereGeometry(6, 80, 80), // 形状     
        new THREE.MeshLambertMaterial({ color: 0xff0000, overdraw: 0.5, transparent: true, opacity: 0.1 })
    );
    gamingsphere2.position.set(0, 0, 0);
    gamingsphere2.position.x = 10000;
    gamingsphere2.position.y = 20;
    gamingsphere2.position.z = 10000;
    scene.add(gamingsphere2);

    //当たり判定を持つオブジェクトのリスト
    var returnobjects = [gamingsphere,gamingsphere2, discord_dicision, twitter_dicision, github_dicision, fennec_decision];
    for (var i=1; i<9; i++) {
        returnobjects.push(scene.getObjectByName("ball"+i));
    }
    returnobjects.push(parton_dicision);
    returnobjects.push(partoff_dicision);

    return (returnobjects);

}
