import React, { Suspense, useState, useEffect, useRef } from 'react';
import { a, useSpring, animated } from '@react-spring/three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useCursor, Text, Float, Detailed } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

// Checks whether the browser supports webgl or not?
const isWebGLSupported = () => {
  try{
    const canvas = document.createElement("canvas");
    canvas.height = 0;
    canvas.width = 0;
    if(!window.WebGLRenderingContext){
      return false;
    }

    const webgl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl"); 
    if(!webgl){
      return false
    }

    return true;
    
  }catch(e){return false;}
}


const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  const [originalMaterial, setOriginalMaterial] = useState(null);
  const [originalMaterialObject22, setOriginalMaterialObject22] = useState(null);
  const [originalMaterialObject90, setOriginalMaterialObject90] = useState(null);
  const [objectPosition, setObjectPosition] = useState(null);
  const [objectPositionObject22, setobjectPositionObject22] = useState(null);
  const [objectPositionObject90, setobjectPositionObject90] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (scene) {
      scene.position.set(0, 0, 0);
      scene.scale.set(1, 1, 1);

      const targetObj = scene.getObjectByName('Object_16');
      if (targetObj) {
        // Compute bounding box for accurate height palcement
        const box = new THREE.Box3().setFromObject(targetObj);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        setObjectPosition(new THREE.Vector3(center.x, box.max.y + 0.2, center.z));
      }

      const targetObj2 = scene.getObjectByName('Object_22');
      if (targetObj2) {
        // Compute bounding box for accurate height palcement
        const box = new THREE.Box3().setFromObject(targetObj2);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        setobjectPositionObject22(new THREE.Vector3(center.x, box.max.y + 0.2, center.z));
      }

      const targetObj3 = scene.getObjectByName('Object_96');
      if (targetObj3) {
        // Compute bounding box for accurate height palcement
        const box = new THREE.Box3().setFromObject(targetObj3);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        setobjectPositionObject90(new THREE.Vector3(center.x, box.max.y + 0.2, center.z));
      }

    }
  }, [scene]);

  useCursor(!!originalMaterial); // Change cursor when hovering
  useCursor(!!originalMaterialObject22); // Change cursor for Object_22 while hovering
  useCursor(!!originalMaterialObject90); // Change cursor for Object_90 while hovering

  const handlePointerOver = (e) => {
    console.log(e.object.name);
    if (e.object.name === "Object_16") {
      e.stopPropagation();
      if (!originalMaterial) {
        setOriginalMaterial(e.object.material);
        // Create a clone of the original material and add emission
        const newMaterial = e.object.material.clone();
        newMaterial.emissive = new THREE.Color('white');
        newMaterial.emissiveIntensity = 1; // Adjust this value to control outline brightness
        e.object.material = newMaterial;
      }
      //e.object.material = new THREE.MeshStandardMaterial({ color: "cyan" }); // Change color
    }

    if (e.object.name === "Object_22") {
      e.stopPropagation();
      if (!originalMaterialObject22) {
        setOriginalMaterialObject22(e.object.material);
        // Create a clone of the original material and add emission
        const newMaterial = e.object.material.clone();
        newMaterial.emissive = new THREE.Color('white');
        newMaterial.emissiveIntensity = 1; // Adjust this value to control outline brightness
        e.object.material = newMaterial;
      }
      //e.object.material = new THREE.MeshStandardMaterial({ borderColor: "cyan", borderWidth: 0.1 }); // Change color
    }

    if (e.object.name === "Object_96") {
      e.stopPropagation();
      if (!originalMaterialObject90) {
        setOriginalMaterialObject90(e.object.material);
        // Create a clone of the original material and add emission
        const newMaterial = e.object.material.clone();
        newMaterial.emissive = new THREE.Color('white');
        newMaterial.emissiveIntensity = 1; // Adjust this value to control outline brightness
        e.object.material = newMaterial;
      }
      //e.object.material = new THREE.MeshStandardMaterial({ borderColor: "cyan", borderWidth: 0.1 }); // Change color
    }

  };

  const handlePointerOut = (e) => {
    if (e.object.name === "Object_16" && originalMaterial) {
      e.object.material = originalMaterial; // Restore original material
      setOriginalMaterial(null);
    }

    if (e.object.name === "Object_22" && originalMaterialObject22) {
      e.object.material = originalMaterialObject22; // Restore original material
      setOriginalMaterialObject22(null);
    }

    if (e.object.name === "Object_96" && originalMaterialObject90) {
      e.object.material = originalMaterialObject90; // Restore original material
      setOriginalMaterialObject90(null);
    }

  };

  const handleClick = (e) => {

    console.log(e.object.name);
    if (e.object.name === "Object_16") {
      // Issue, when clicking on the "About" button, the scene is not updated, the object material should be updated.
      navigate("/about");
    } else if (e.object.name === "Object_22") {
      navigate("/schedule");
    }

  };

  return (
    <>
      <primitive
        object={scene}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e)}
      />
      {objectPosition && (
        <group position={objectPosition}>
          {/* Circle Background */}
          <mesh position={[0, 0, -0.01]}>
            <circleGeometry args={[0.1, 32]} /> {/* Circle with radius 0.2 */}
            <meshBasicMaterial color="black" transparent opacity={0.4} />
          </mesh>

          {/* Text Inside Circle */}
          <Text
            fontSize={0.1}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            1
          </Text>
        </group>
      )}

      {objectPositionObject22 && (
        <group position={objectPositionObject22}>
          {/* Circle Background */}
          <mesh position={[0, 0, -0.01]}>
            <circleGeometry args={[0.1, 32]} /> {/* Circle with radius 0.2 */}
            <meshBasicMaterial color="black" transparent opacity={0.4} />
          </mesh>

          {/* Text Inside Circle */}
          <Text
            fontSize={0.1}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            2
          </Text>
        </group>
      )}

      {objectPositionObject90 && (
        <group position={objectPositionObject90}>
          {/* Circle Background */}
          <mesh position={[0, 0, -0.01]}>
            <circleGeometry args={[0.1, 32]} /> {/* Circle with radius 0.2 */}
            <meshBasicMaterial color="black" transparent opacity={0.4} />
          </mesh>

          {/* Text Inside Circle */}
          <Text
            fontSize={0.1}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            3
          </Text>
        </group>
      )}

    </>
  );
};

const LoadingBox = ({ progress }) => {
  const radius = 1;
  const segments = 64;

  return (
    <group position={[0, 0, 0]}>
      {/* Background circle */}
      <mesh>
        <ringGeometry args={[radius - 0.1, radius, segments]} />
        <meshBasicMaterial color="#e5e7eb" transparent opacity={0.2} />
      </mesh>

      {/* Progress circle */}
      <mesh>
        <ringGeometry args={[radius - 0.1, radius, segments, 1, 0, (progress / 100) * Math.PI * 2]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>

      {/* Percentage text */}
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {`${Math.round(progress)}%`}
      </Text>
    </group>
  );
};


const ModelViewer = () => {
  const [error, setError] = useState(null);
  const modelPath = '/models/isometric_bedroom.glb';
  const [showModel, setShowModel] = useState(false);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    let loadingInterval;
    if (!showModel) {
      loadingInterval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 1;
          if (next >= 100) {
            clearInterval(loadingInterval);
            setShowModel(true);
            return 100;
          }
          return next;
        });
      }, 20);
    }
    return () => clearInterval(loadingInterval);
  }, []);

  const handleError = (err) => {
    console.error('Error loading model:', err);
    setError(err.message);
  };

  return (
    <div className="s" style={{ background: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)' }}>
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 p-4 text-center">
          <p className="font-bold mb-2">Error loading model</p>
          <p>Please check if:</p>
          <ul className="list-disc text-left">
            <li>The model file is in the public/models folder</li>
            <li>The file name matches exactly (case-sensitive)</li>
            <li>The file path is correct</li>
          </ul>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      ) : (
        <Canvas
          camera={{ position: [2, 2, 5], fov: 60 }}
          style={{ height: '100vh', width: '100vw', background: 'transparent' }}
          onError={handleError}
        >
          <ambientLight intensity={0.7} />
          <hemisphereLight skyColor="white" groundColor="gray" intensity={1} />

          {!showModel ? (
            <LoadingBox progress={progress} />
          ) : (
            <Suspense fallback={null}>
              <Model url={"%PUBLIC_URL%/media/model.glb"} />
            </Suspense>
          )}

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            autoRotate={false}

            maxPolarAngle={Math.PI / 3}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      )}
    </div>
  );
};

useGLTF.preload('/models/isometric_bedroom.glb');

export default ModelViewer;
