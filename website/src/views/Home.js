import * as THREE from "three";
import React from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import texture1 from '../assets/matcaps/8.png';
import font1 from '../assets/fonts/helvetiker_regular.typeface.json';

class Home extends React.Component {
  async componentDidMount() {
    console.clear();
    const scene = new THREE.Scene();
    const textureLoader = new THREE.TextureLoader();

    const parameters = {
      height: window.innerHeight,
      width: window.innerWidth,
      boxColor: 0x7e31eb,
      canvas: document.querySelector(".webgl")
    }

    const camera = new THREE.PerspectiveCamera(75, parameters.width / parameters.height)
    camera.position.set(0, 0, 5);
    scene.add(camera)

    const text = new THREE.Mesh(
      new THREE.TextBufferGeometry("3d-threejs", {
        font: new THREE.FontLoader().parse(font1),
        size: 1,
        height: 0.7,
        curveSegments: 4,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.03,
        bevelOffset: 0,
        bevelSegments: 4
      }),
      new THREE.MeshMatcapMaterial({
        matcap: textureLoader.load(texture1),
      })
    );
    text.material.wireframe = true;
    text.geometry.center();
    scene.add(text);

    const light = new THREE.AmbientLight(0x000000, 0.001); // soft white light
    scene.add(light);

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
          <div id="review-box" className="center" onClick={() => window.location.href = "http://localhost:3000/review/homepage"}>
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

export default Home;
