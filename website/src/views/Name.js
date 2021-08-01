import * as THREE from "three";
import React from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import texture1 from '../assets/matcaps/8.png';
import font1 from '../assets/fonts/helvetiker_regular.typeface.json';

class Name extends React.Component {
    async componentDidMount() {
        console.clear();
        var name = prompt('Enter your name')
        while (!name)
            name = prompt('Enter your name')

        const scene = new THREE.Scene();
        const textureLoader = new THREE.TextureLoader();

        const parameters = {
            height: window.innerHeight,
            width: window.innerWidth,
            boxColor: 0x7e31eb,
            canvas: document.querySelector(".webgl")
        }

        const camera = new THREE.PerspectiveCamera(75, parameters.width / parameters.height)
        camera.position.set(0, 0, 6);
        scene.add(camera)

        const mat = new THREE.MeshMatcapMaterial({
            matcap: textureLoader.load(texture1),
        });
        mat.wireframe = true


        const text = new THREE.Mesh(
            new THREE.TextBufferGeometry(name, {
                font: new THREE.FontLoader().parse(font1),
                size: 1,
                height: 0.7,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.03,
                bevelOffset: 0,
                bevelSegments: 4
            }),
            mat
        );
        text.geometry.center();
        scene.add(text);


        console.time('donut')

        const geo = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
        for (var i = 0; i < 70; i++) {
            const donut = new THREE.Mesh(geo, mat);
            donut.position.set(
                ((Math.random() - 0.5) * 10),
                ((Math.random() - 0.5) * 10),
                ((Math.random() - 0.5) * 10)
            );
            donut.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                0
            );
            scene.add(donut);
        }

        console.timeEnd('donut')

        const renderer = new THREE.WebGL1Renderer({
            canvas: parameters.canvas,
            antialias: true,
            alpha: false
        });
        renderer.setSize(parameters.width, parameters.height);

        const orbitControls = new OrbitControls(camera, parameters.canvas)
        orbitControls.enableDamping = true;

        // windows
        window.addEventListener('resize', () => {
            parameters.width = window.innerWidth
            parameters.height = window.innerHeight
        });

        const animate = function () {
            orbitControls.update();

            renderer.setSize(parameters.width, parameters.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            camera.aspect = parameters.width / parameters.height;
            camera.updateProjectionMatrix();

            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate()
    }
    render() {
        return (
            <>
                <canvas className="webgl" />
                <header id="header" className="center">
                    <div id="review-box" className="center" onClick={() => window.location.href = "https://3d-threejs.vercel.app/review/name"}>
                        <span id="review-span">review</span>
                    </div>
                </header>
                <footer id="footer" className="center">
                    <div id="designerDivNameBox" className="center" onClick={() => window.location.href = "https://instagram.com/tanishq.singh.2301/"}>
                        <span id="designerName">Designed by : TANISHQ SINGH</span>
                    </div>
                </footer>
            </>
        )
    }
}

export default Name;
