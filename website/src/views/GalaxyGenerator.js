import * as THREE from "three";
import React from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

class GalaxyGenerator extends React.Component {
    async componentDidMount() {
        console.clear();
        const scene = new THREE.Scene();
        const gui = new dat.GUI({ width: 360 });

        const parameters = {
            height: window.innerHeight,
            width: window.innerWidth,
            canvas: document.querySelector(".webgl")
        };

        const camera = new THREE.PerspectiveCamera(75, parameters.width / parameters.height);
        camera.position.set(0, 0, 5);
        scene.add(camera);

        /*
            GALAXY
        */
        const galaxyParameters = {
            count: 500,
            size: 0.02,
            radius: 4
        };

        let galaxyGeometry = null;
        let galaxyMaterial = null;
        let galaxyMesh = null;

        const generateGalaxy = () => {
            if (galaxyMesh !== null) {
                galaxyGeometry.dispose();
                galaxyMaterial.dispose();
                scene.remove(galaxyMesh);
            }

            const positions = new Float32Array(galaxyParameters.count * 3);

            galaxyMaterial = new THREE.PointsMaterial({
                size: galaxyParameters.size,
                sizeAttenuation: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });

            galaxyGeometry = new THREE.BufferGeometry()

            for (var i = 0; i < galaxyParameters.count; i++) {
                const i3 = i * 3;
                positions[i3] = (Math.random() - 5) * 9.8;
                positions[i3 + 1] = (Math.random() - 5) * 7.9;
                positions[i3 + 2] = (Math.random() - 5) * 8.7;
            }

            galaxyGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
            galaxyMesh = new THREE.Points(galaxyGeometry, galaxyMaterial);
            galaxyMesh.geometry.center();
            scene.add(galaxyMesh);
        };
        generateGalaxy();

        const galaxyDebugFolder = gui.addFolder("Galaxy");
        galaxyDebugFolder.add(galaxyParameters, "count").name("No of Particles").min(10).max(5000).step(0.01).onFinishChange(generateGalaxy);
        galaxyDebugFolder.add(galaxyParameters, "size").name("Particles Size").min(0.002).max(0.1).step(0.001).onFinishChange(generateGalaxy);
        galaxyDebugFolder.add(galaxyParameters, "radius").name("Radius of Galaxy").min(0.002).max(0.1).step(0.001).onFinishChange(generateGalaxy);



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
                    <div id="review-box" className="center" onClick={() => window.location.href = "https://3d-threejs.vercel.app/review/galaxygenerator"}>
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

export default GalaxyGenerator;
