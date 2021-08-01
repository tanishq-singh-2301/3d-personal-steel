import * as THREE from "three";
import React from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

class Light extends React.Component {
    async componentDidMount() {
        console.clear();
        const scene = new THREE.Scene();
        const gui = new dat.GUI();

        const parameters = {
            height: window.innerHeight,
            width: window.innerWidth,
            color: 0x7e31eb,
            canvas: document.querySelector(".webgl")
        };

        const camera = new THREE.PerspectiveCamera(75, parameters.width / parameters.height);
        camera.position.set(0, 0, 6);
        scene.add(camera);


        // Meshes
        const material = new THREE.MeshStandardMaterial({
            roughness: 0.4
        });


        // Sphere
        const sphere = new THREE.Mesh(
            new THREE.SphereBufferGeometry(0.5, 32, 32),
            material
        );
        sphere.position.set(-1.5, 0, 0);
        scene.add(sphere);


        // Box
        const box = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            material
        );
        box.geometry.computeBoundingBox();
        scene.add(box);


        // Torus
        const torus = new THREE.Mesh(
            new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64),
            material
        );
        torus.position.set(1.5, 0, 0)
        scene.add(torus);


        // Plane
        const plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(5, 5),
            material
        );
        plane.rotation.x = -3.14 / 2;
        plane.position.set(0, box.geometry.boundingBox.min.y * 1.42, 0);
        scene.add(plane);


        // Light
        const lightDebugFolder = gui.addFolder("Lights")

        const ambiantLight = new THREE.AmbientLight(0xffffff, 0.5);
        lightDebugFolder.add(ambiantLight, 'intensity').min(0).max(1).step(0.0001).name("Ambient Light");
        scene.add(ambiantLight);

        const pointLight = new THREE.PointLight(0xff9000, 0.5, 3);
        lightDebugFolder.add(pointLight, 'intensity').min(0).max(1).step(0.0001).name("Point Light Intensity");
        lightDebugFolder.add(pointLight, 'distance').min(0).max(10).step(0.0001).name("Point Light Distance");
        pointLight.position.set(1, -0.5, 1);
        scene.add(pointLight);

        const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
        lightDebugFolder.add(directionalLight, 'intensity').min(0).max(1).step(0.0001).name("Directional Light");
        directionalLight.position.set(1, 0.25, 0);
        scene.add(directionalLight);

        const hemishphericalLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
        lightDebugFolder.add(hemishphericalLight, 'intensity').min(0).max(1).step(0.0001).name("Hemisphere Light");
        scene.add(hemishphericalLight);

        const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
        lightDebugFolder.add(rectAreaLight, 'intensity').min(0).max(10).step(0.0001).name("RectArea Light");
        rectAreaLight.position.set(1, 0, 2)
        scene.add(rectAreaLight);

        const sportLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1);
        sportLight.position.set(0, 2, 3);
        lightDebugFolder.add(sportLight, 'intensity').min(0).max(1).step(0.0001).name("spot Light");
        scene.add(sportLight)


        // Render
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

        const clock = new THREE.Clock();

        const animate = function () {
            const elaspedTime = clock.getElapsedTime();

            sphere.rotation.set(elaspedTime / 30, elaspedTime / 30, 0);
            box.rotation.set(elaspedTime / 30, elaspedTime / 30, 0);
            torus.rotation.set(elaspedTime / 30, elaspedTime / 30, 0);

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
                    <div id="review-box" className="center" onClick={() => window.location.href = "https://3d-threejs.vercel.app/review/light"}>
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

export default Light;