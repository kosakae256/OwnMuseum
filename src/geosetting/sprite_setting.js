import * as THREE from 'three';


class SpriteControl {
    constructor() {
        //sprite情報(オブジェクト、速度、滞在時間(f))
        this.sprites = [];

        //最大滞在フレーム
        this.maxtime = 200;


        //生成範囲(正方形)
        this.SIZE = 100;
        this.SIZE2 = 100;
        // 配置する個数
        this.LENGTH = 1000;
        this.LENGTH2 = 10000;

        this.vertices = [];
        this.vertices2 = [];

        this.update = function () {
            this.movesprite();


        };

        this.setsprite = function (scene) {

                // 頂点情報を格納する配列
                for (let i = 0; i < this.LENGTH; i++) {
                    const x = this.SIZE * (Math.random() - 0.5) + 10000;
                    const y = this.SIZE * (Math.random() - 0.5)+50;
                    const z = this.SIZE * (Math.random() - 0.5) + 10000;

                    this.vertices.push(x, y, z);
                }

                // 形状データを作成
                const geometry = new THREE.BufferGeometry();
                geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices, 3));

                // マテリアルを作成
                const material = new THREE.PointsMaterial({
                    // 一つ一つのサイズ
                    size: 0.1,
                    // 色
                    color: 0xffffff,
                    opacity:1,
                    transparent:true
                });

                // 物体を作成
                this.mesh = new THREE.Points(geometry, material);
                scene.add(this.mesh); // シーンは任意の THREE.Scene インスタンス

                //2つめ
                // 頂点情報を格納する配列
                for (let i = 0; i < this.LENGTH2; i++) {
                    const x = this.SIZE2 * (Math.random() - 0.5);
                    const y = this.SIZE2 * (Math.random() - 0.5);
                    const z = this.SIZE2 * (Math.random() - 0.5);

                    this.vertices2.push(x, y, z);
                }

                // 形状データを作成
                const geometry2 = new THREE.BufferGeometry();
                geometry2.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices2, 3));

                // マテリアルを作成
                const material2 = new THREE.PointsMaterial({
                    // 一つ一つのサイズ
                    size: 0.1,
                    // 色
                    color: 0xffffff,
                    opacity:1,
                    transparent:true
                });

                // 物体を作成
                this.mesh2 = new THREE.Points(geometry2, material2);
                this.mesh2.name = "particle";
                scene.add(this.mesh2); // シーンは任意の THREE.Scene インスタンス
                
                
        };


        this.movesprite = function () {
            const particlePositions = this.mesh.geometry.attributes.position.array;
            const particlePositions2 = this.mesh2.geometry.attributes.position.array;
            // 頂点情報を格納する配列
            for (let i = 0; i < this.LENGTH; i++) {
                particlePositions[i*3+1] = particlePositions[i*3+1] - 0.1;
                if (particlePositions[i*3+1] < -7)
                {
                    particlePositions[i*3] = this.SIZE * (Math.random() - 0.5) + 10000;
                    particlePositions[i*3+1] = this.SIZE*0.5;
                    particlePositions[i*3+2] = this.SIZE * (Math.random() - 0.5) + 10000;
                }
            }

            for (let i = 0; i < this.LENGTH2; i++) {
                particlePositions2[i*3+1] = particlePositions2[i*3+1] + 0.01;
                if (particlePositions2[i*3+1] > 50)
                {
                    particlePositions2[i*3] = this.SIZE2 * (Math.random() - 0.5);
                    particlePositions2[i*3+1] = -7;
                    particlePositions2[i*3+2] = this.SIZE2 * (Math.random() - 0.5);
                }
            }
            //更新を通知するフラグ
            this.mesh.geometry.attributes.position.needsUpdate = true;
            this.mesh2.geometry.attributes.position.needsUpdate = true;
        };
    }
}

export { SpriteControl };