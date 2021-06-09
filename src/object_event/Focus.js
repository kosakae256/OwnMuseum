import * as THREE from 'three';

export function SeenObjects(camera, e, touchobjects, scene,) {
    console.log(touchobjects)
    for (var i = 2; i < 16; i++) {
        var rect = e.target.getBoundingClientRect();

        // スクリーン上のマウス位置を取得する
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;

        // 取得したスクリーン座標を-1〜1に正規化する（WebGLは-1〜1で座標が表現される）
        mouseX = (mouseX / window.innerWidth) * 2 - 1;
        mouseY = -(mouseY / window.innerHeight) * 2 + 1;

        // マウスの位置ベクトル
        var pos = new THREE.Vector3(mouseX, mouseY, 1);

        // pos はスクリーン座標系なので、オブジェクトの座標系に変換
        // オブジェクト座標系は今表示しているカメラからの視点なので、第二引数にカメラオブジェクトを渡す
        // new THREE.Projector.unprojectVector(pos, camera); ↓最新版では以下の方法で得る
        pos.unproject(camera);

        // 始点、向きベクトルを渡してレイを作成
        var ray = new THREE.Raycaster(camera.position, pos.sub(camera.position).normalize());

        // 交差判定
        // 引数は取得対象となるMeshの配列を渡す。以下はシーン内のすべてのオブジェクトを対象に。
        var objs = ray.intersectObjects([touchobjects[i]]);

        //ヒエラルキーを持った子要素も対象とする場合は第二引数にtrueを指定する
        //var objs = ray.intersectObjects(scene.children, true);

        if (objs.length > 0) {
            // 交差していたらobjsが1以上になるので、やりたいことをやる。
            touchobjects[i].material.opacity = 0.5;
        }
        else{
            touchobjects[i].material.opacity = 0;
        }
    }
}