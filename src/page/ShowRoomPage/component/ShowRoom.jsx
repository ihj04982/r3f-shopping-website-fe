import React, { useEffect, useRef, Suspense, useCallback } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { CameraControls, ContactShadows, useGLTF, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module";
import * as THREE from "three";
import { PART_MATCAP_PALETTES, PART_PATTERNS } from "../../../constants/showroom.constants";
import LoadingSpinner from "../../../common/component/LoadingSpinner";

const MODEL_URL = "https://7usit4sojdl2b6ev.public.blob.vercel-storage.com/sunglasses.glb";

const LoadingFallback = () => (
    <Html center>
        <LoadingSpinner size={40} message="모델을 불러오는 중..." />
    </Html>
);

const ShowRoom = ({ partColors, isRotating }) => {
    const cameraControlsRef = useRef(null);
    const textureCache = useRef(new Map());

    const gltf = useLoader(GLTFLoader, MODEL_URL, (loader) => {
        loader.setMeshoptDecoder(MeshoptDecoder);
    });

    const getPartType = useCallback((meshName) => {
        const lowerName = meshName.toLowerCase();
        for (const [partType, patterns] of Object.entries(PART_PATTERNS)) {
            if (patterns.some((pattern) => lowerName.includes(pattern))) {
                return partType;
            }
        }
        return null;
    }, []);

    const applyMaterial = useCallback((mesh, material) => {
        if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map(() => material.clone());
        } else {
            mesh.material = material;
        }
    }, []);

    const loadTexture = useCallback(async (url) => {
        if (textureCache.current.has(url)) {
            return textureCache.current.get(url);
        }

        return new Promise((resolve, reject) => {
            const loader = new THREE.TextureLoader();
            loader.load(
                url,
                (texture) => {
                    textureCache.current.set(url, texture);
                    resolve(texture);
                },
                undefined,
                reject
            );
        });
    }, []);

    const updateMaterials = useCallback(async () => {
        if (!gltf?.scene) return;

        for (const [partType, colorId] of Object.entries(partColors)) {
            const palette = PART_MATCAP_PALETTES[partType];
            const materialData = palette?.find((m) => m.id === colorId);
            if (!materialData) continue;

            let material;

            if (partType === "lense") {
                material = new THREE.MeshStandardMaterial({
                    color: materialData.color,
                    transparent: true,
                    opacity: 0.7,
                });
            } else {
                try {
                    const texture = await loadTexture(materialData.matcapUrl);
                    material = new THREE.MeshMatcapMaterial({ matcap: texture });
                } catch {
                    material = new THREE.MeshStandardMaterial({
                        color: materialData.previewColor,
                    });
                }
            }

            gltf.scene.traverse((child) => {
                if (child.type === "Mesh" && getPartType(child.name) === partType) {
                    applyMaterial(child, material);
                }
            });
        }
    }, [partColors, gltf, getPartType, applyMaterial, loadTexture]);

    useEffect(() => {
        const preloadTextures = async () => {
            const textureUrls = [];
            Object.values(PART_MATCAP_PALETTES).forEach((palette) => {
                palette.forEach((material) => {
                    if (material.matcapUrl) {
                        textureUrls.push(material.matcapUrl);
                    }
                });
            });

            await Promise.allSettled(textureUrls.map((url) => loadTexture(url)));
        };

        preloadTextures();
    }, [loadTexture]);

    useEffect(() => {
        updateMaterials();
    }, [updateMaterials]);

    useEffect(() => {
        if (gltf?.scene) {
            gltf.scene.traverse((obj) => {
                if (obj.type === "Mesh") {
                    obj.castShadow = true;
                    obj.receiveShadow = true;
                }
            });
        }
    }, [gltf]);

    useEffect(() => {
        const controls = cameraControlsRef.current;
        if (!controls) return;

        if (isRotating) {
            controls.setPosition(4, 1.5, 0, true);
            controls.setTarget(0, 0, 0, true);
        } else {
            controls.setPosition(1.5, 1.5, 2, false);
            controls.setTarget(-0.2, 0, 0, false);
        }
    }, [isRotating]);

    useFrame(() => {
        if (!isRotating || !cameraControlsRef.current) return;

        const t = Date.now() / 4000;
        const radius = 2;
        cameraControlsRef.current.setPosition(Math.sin(t) * radius, 1.5, Math.cos(t) * radius, false);
    });

    return (
        <Suspense fallback={<LoadingFallback />}>
            <CameraControls ref={cameraControlsRef} minDistance={2} maxDistance={10} enabled={!isRotating} />

            <primitive object={gltf.scene} />

            <ContactShadows position={[0, -0.05, 0]} opacity={0.3} scale={8} blur={2} far={4} />
        </Suspense>
    );
};

useGLTF.preload(MODEL_URL);

export default ShowRoom;
