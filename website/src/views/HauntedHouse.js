import * as THREE from "three";
import React from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { doorcolortexture, dooralphatexture, doorambientOcclusiontexture, doorheighttexture, doornormaltexture, doorroughnesstexture } from '../assets/textures/door/allDoor';
import { brickambientOcclusiontexture, brickcolortexture, bricknormaltexture, brickroughnesstexture } from "../assets/textures/bricks/allBricks";
import * as grassTexture from '../assets/textures/grass/allGrass';

class HauntedHouse extends React.Component {
    async componentDidMount() {
        console.clear();
        console.time("Program-started");
        const scene = new THREE.Scene();

        /*
            TEXTURES
        */
        const textureLoader = new THREE.TextureLoader();
        const grassColorT = textureLoader.load(grassTexture.color);
        const grassAOT = textureLoader.load(grassTexture.ambientOcculusion);
        const grassNormalT = textureLoader.load(grassTexture.normal);
        const grassRoughnessT = textureLoader.load(grassTexture.roughness);

        grassColorT.repeat.set(8, 8);
        grassAOT.repeat.set(8, 8);
        grassNormalT.repeat.set(8, 8);
        grassRoughnessT.repeat.set(8, 8);

        grassColorT.wrapS = THREE.RepeatWrapping;
        grassAOT.wrapS = THREE.RepeatWrapping;
        grassNormalT.wrapS = THREE.RepeatWrapping;
        grassRoughnessT.wrapS = THREE.RepeatWrapping;

        grassColorT.wrapT = THREE.RepeatWrapping;
        grassAOT.wrapT = THREE.RepeatWrapping;
        grassNormalT.wrapT = THREE.RepeatWrapping;
        grassRoughnessT.wrapT = THREE.RepeatWrapping;

        const fog = new THREE.Fog("#262837", 1, 15);
        scene.fog = fog;

        const parameters = {
            height: window.innerHeight,
            width: window.innerWidth,
            boxColor: 0x7e31eb,
            canvas: document.querySelector(".webgl")
        }

        const camera = new THREE.PerspectiveCamera(75, parameters.width / parameters.height)
        camera.position.set(0, 5, 12);
        scene.add(camera);


        /*
            OBJECTS
        */

        // Floor
        const floor = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(20, 20),
            new THREE.MeshStandardMaterial({
                map: grassColorT,
                aoMap: grassAOT,
                normalMap: grassNormalT,
                roughness: grassRoughnessT
            })
        );
        floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2));
        floor.rotation.set(-Math.PI / 2, 0, 0);
        scene.add(floor);

        // House
        const house = new THREE.Group();
        scene.add(house);

        // walls
        const walls = new THREE.Mesh(
            new THREE.BoxBufferGeometry(4, 2.5, 4),
            new THREE.MeshStandardMaterial({
                map: textureLoader.load(brickcolortexture),
                transparent: true,
                aoMap: textureLoader.load(brickambientOcclusiontexture),
                normalMap: textureLoader.load(bricknormaltexture),
                roughness: textureLoader.load(brickroughnesstexture)
            })
        );
        walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2));
        walls.position.set(0, 1.25, 0);
        house.add(walls);

        // Door
        const door = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 2, 100, 100),
            new THREE.MeshStandardMaterial({
                map: textureLoader.load(doorcolortexture),
                transparent: true,
                alphaMap: textureLoader.load(dooralphatexture),
                aoMap: textureLoader.load(doorambientOcclusiontexture),
                displacementMap: textureLoader.load(doorheighttexture),
                displacementScale: 0.1,
                normalMap: textureLoader.load(doornormaltexture),
                metalness: 0.4,
                roughness: textureLoader.load(doorroughnesstexture)
            })
        );
        door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2));
        door.position.set(0, 1, 2.01);
        house.add(door);

        // Roof
        const roof = new THREE.Mesh(
            new THREE.ConeBufferGeometry(3.5, 1, 4),
            new THREE.MeshStandardMaterial({
                color: '#b35f45'
            })
        );
        roof.rotation.set(0, Math.PI / 4, 0);
        roof.position.set(0, 3, 0);
        house.add(roof);

        // Bushes
        const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
        const bushMaterial = new THREE.MeshStandardMaterial({
            map: grassColorT,
            aoMap: grassAOT,
            normalMap: grassNormalT,
            roughness: grassRoughnessT
        });
        bushGeometry.setAttribute('uv2', new THREE.Float32BufferAttribute(bushGeometry.attributes.uv.array, 2));

        const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
        bush1.scale.set(0.5, 0.5, 0.5);
        bush1.position.set(0.8, 0.2, 2.2);

        const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
        bush2.scale.set(0.25, 0.25, 0.25);
        bush2.position.set(1.4, 0.1, 2.1);

        const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
        bush3.scale.set(0.4, 0.4, 0.4);
        bush3.position.set(-1, 0.1, 2.2);

        const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
        bush4.scale.set(0.15, 0.15, 0.15);
        bush4.position.set(-1, 0.05, 2.6);

        scene.add(bush1, bush2, bush3, bush4);

        // Graves
        const graves = new THREE.Group();
        scene.add(graves);

        const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
        const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

        for (var i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 3 + Math.random() * 6;
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;

            const grave = new THREE.Mesh(graveGeometry, graveMaterial);
            grave.position.set(x, 0.3, z);
            grave.rotation.set(0, Math.random() - 0.5 * 0.4, Math.random() - 5 * 0.04);

            grave.castShadow = true;
            scene.add(grave);
        }

        /*
            GHOSTS
        */
        const ghost1 = new THREE.PointLight('#ff00ff', 2, 3);
        scene.add(ghost1);

        const ghost2 = new THREE.PointLight('#00ffff', 2, 3);
        scene.add(ghost2);

        const ghost3 = new THREE.PointLight('#ffff00', 2, 3);
        scene.add(ghost3);


        /*
            LIGHTS
        */

        // Ambient Light
        const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
        scene.add(ambientLight);

        // Directional Light
        const directionalLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
        directionalLight.position.set(4, 5, -2);
        scene.add(directionalLight);

        // Door Light
        const doorLight = new THREE.PointLight("#ff7d46", 2, 7);
        doorLight.position.set(0, 2.2, 2.7);
        house.add(doorLight);



        const renderer = new THREE.WebGL1Renderer({
            canvas: parameters.canvas,
            antialias: true,
            alpha: false
        });
        renderer.setSize(parameters.width, parameters.height);
        renderer.setClearColor("#262837");
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Shadows
        renderer.shadowMap.enabled = true;
        directionalLight.castShadow = true;
        doorLight.castShadow = true;
        ghost1.castShadow = true;
        ghost2.castShadow = true;
        ghost3.castShadow = true;

        walls.castShadow = true;
        bush1.castShadow = true;
        bush2.castShadow = true;
        bush3.castShadow = true;
        bush4.castShadow = true;

        floor.receiveShadow = true;

        doorLight.shadow.mapSize.width = 256;
        doorLight.shadow.mapSize.height = 256;
        doorLight.shadow.camera.far = 7;

        directionalLight.shadow.mapSize.width = 256;
        directionalLight.shadow.mapSize.height = 256;
        directionalLight.shadow.camera.far = 7;

        ghost1.shadow.mapSize.width = 256;
        ghost1.shadow.mapSize.height = 256;
        ghost1.shadow.camera.far = 7;

        ghost2.shadow.mapSize.width = 256;
        ghost2.shadow.mapSize.height = 256;
        ghost2.shadow.camera.far = 7;

        ghost3.shadow.mapSize.width = 256;
        ghost3.shadow.mapSize.height = 256;
        ghost3.shadow.camera.far = 7;

        const orbitControls = new OrbitControls(camera, parameters.canvas);
        orbitControls.enableDamping = true;

        // windows
        window.addEventListener('resize', () => {
            parameters.width = window.innerWidth
            parameters.height = window.innerHeight
        });

        const clock = new THREE.Clock();

        console.timeEnd("Program-started");

        const animate = function () {
            const elaspedTime = clock.getElapsedTime();

            const ghost1Angle = elaspedTime * 0.5;
            ghost1.position.set(
                Math.cos(ghost1Angle) * 4,
                Math.sin(ghost1Angle) * 4,
                Math.sin(ghost1Angle) * 4
            );

            const ghost2Angle = elaspedTime * -0.3;
            ghost2.position.set(
                Math.cos(ghost2Angle) * 3,
                Math.sin(ghost2Angle) * 2.3,
                Math.sin(ghost2Angle) * 5
            );

            const ghost3Angle = elaspedTime * 0.7;
            ghost3.position.set(
                ((Math.cos(ghost3Angle) * 3) + 2.7 * Math.sin(ghost3Angle * 3)),
                ((Math.sin(ghost3Angle) * 2.3) + 2.7 * Math.cos(ghost3Angle * 3.4)),
                ((Math.sin(ghost3Angle) * 5) + 0.7 * Math.cos(ghost3Angle * 0.4))
            )

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
                <div id="designerDiv" onClick={() => window.location.href = "https://instagram.com/tanishq.singh.2301/"}>
                    <div id="glass"></div>
                    <span id="designerName">Designed by : TANISHQ SINGH</span>
                </div>
            </>
        )
    }
}

export default HauntedHouse;