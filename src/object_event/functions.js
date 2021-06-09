import * as THREE from 'three';
export function TouchDiscord(scene) {
    //console.log("d")
    const fontloader = new THREE.FontLoader();

    fontloader.load('fonts/helvetiker_regular.typeface.json', function (font) {

        const textgeometry = new THREE.TextGeometry('kosakae#3667', {
            font: font,
            size: 0.5,
            height: 0.01,
            curveSegments: 12,
        });
        var materials = [
            new THREE.MeshBasicMaterial({ color: Math.random() * 0xff0000, overdraw: 0.5 }),
            new THREE.MeshBasicMaterial({ color: 0x000000, overdraw: 0.5 })
        ];
        var text = new THREE.Mesh(
            textgeometry,
            materials
        );
        text.position.x = 45.8;
        text.position.y = 1;
        text.position.z = -39;
        text.rotation.y = Math.PI / -2;
        scene.add(text);
    });
};

export function TouchTwitter(scene) {
    //console.log("t")
    //私のtwitterに飛ばす
    window.open('https://twitter.com/kosakae256', '_blank'); // 新しいタブを開き、ページを表示
};

export function TouchGithub(scene) {
    //console.log("g")
    //私のgithubサイトに飛ばす
    window.open('https://github.com/kosakae256', '_blank');
};

export function TouchFennec(scene) {
    //console.log("g")
    //フェネック配布サイトに飛ばす
    window.open('https://3d.nicovideo.jp/works/td29482', '_blank');
};

export function TouchTwitterBot(scene) {
    //console.log("g")
    //twitterbotのgitへ
    window.open('https://github.com/kosakae256/TwitterApplybot', '_blank');
};

export function TouchAwareShe(scene) {
    //console.log("g")
    //AwareSheの紹介動画
    window.open('https://www.youtube.com/watch?v=nTWbbWN9AQo', '_blank');
};

export function TouchHackDay(scene) {
    //console.log("g")
    //フェネック配布サイトに飛ばす
    window.open('https://www.youtube.com/watch?v=lXl-brlEuRw', '_blank');
};

export function TouchMitou(scene) {
    //console.log("g")
    //未踏公式
    window.open('https://jr.mitou.org/', '_blank');
};

export function TouchOldSite(scene) {
    //console.log("g")
    //フェネック配布サイトに飛ばす
    window.open('http://k256port.html.xdomain.jp/', '_blank');
};

export function TouchParton(scene) {
    //console.log("g")
    var obj = scene.getObjectByName("particle");
    console.log(obj);
    obj.material.opacity = 1;
};

export function TouchPartoff(scene) {
    //console.log("g")
    var obj = scene.getObjectByName("particle");
    obj.material.opacity = 0;
};
