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