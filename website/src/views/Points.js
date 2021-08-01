import * as THREE from "three";
import React from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as particleTextures from '../assets/textures/particles/allParticles';

class Points extends React.Component {
    async componentDidMount() {
        console.clear();
        console.time("program-started");
        const scene = new THREE.Scene();
        const textureLoader = new THREE.TextureLoader();

        const parameters = {
            height: window.innerHeight,
            width: window.innerWidth,
            boxColor: 0x7e31eb,
            canvas: document.querySelector(".webgl")
        }

        const camera = new THREE.PerspectiveCamera(75, parameters.width / parameters.height);
        camera.position.set(0, 0, 3);
        scene.add(camera);



        /*
           OBJECTS 
        */

        const particleGeometry = new THREE.BufferGeometry();
        const count = 5000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (var i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 5) * 11;
            colors[i] = (Math.random());
        }

        particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));


        const particleMaterial = new THREE.PointsMaterial({
            size: 0.035,
            sizeAttenuation: true,
            transparent: true,
            alphaMap: textureLoader.load(particleTextures.b),
            vertexColors: true
        });
        const particle = new THREE.Points(particleGeometry, particleMaterial);
        particle.geometry.center();
        scene.add(particle);



        /*
           LIGHTS
        */
        scene.add(new THREE.AmbientLight(0xffffff, 1)); // Ambient Light

        // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Directional Light
        // directionalLight.position.set(2, 3, 2)
        // scene.add(new THREE.DirectionalLightHelper(directionalLight, 0.5))
        // scene.add(directionalLight);




        /*
           Renders
        */

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
        console.timeEnd("program-started");
        const animate = function () {
            const elaspedTime = clock.getElapsedTime();

            for (var i = 0; i < count; i++) {
                const i3 = i * 3;
                particleGeometry.attributes.position.array[i3 + 1] = Math.sin(elaspedTime + particleGeometry.attributes.position.array[i3]);
            }
            particleGeometry.attributes.position.needsUpdate = true;
            orbitControls.update();

            renderer.setSize(parameters.width, parameters.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            camera.aspect = parameters.width / parameters.height;
            camera.updateProjectionMatrix();

            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();
    }
    render() {
        return (
            <>
                <canvas className="webgl" />
                <header id="header" className="center">
                    <div id="review-box" className="center" onClick={() => window.location.href = "https://3d-threejs.vercel.app/review/points"}>
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

export default Points;
