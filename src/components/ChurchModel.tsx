"use client";

import React, { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Sky } from "@react-three/drei";
import * as THREE from "three";

// Colors extracted from historical context (Timber temporary church)
const Colors = {
    exteriorWood: "#3a2820", // dark stained timber cladding
    interiorWood: "#8e7052", // warm exposed interior timber framing
    roofSlate: "#2d3436", // dark slate or shingled roof
    woodDark: "#261711", // pews, screens, and main trusses
    stoneTrim: "#e2ddce", // salvaged stone features (altar, traceries)
    floorLight: "#c8bca7", // stone paving
    floorDark: "#3a3a3a",
};

// Reusable Wall Component with different in/out colors via materials array if needed, 
// here kept simple with color switching or DoubleSide
const Wall = ({ position, args, rotation = [0, 0, 0], transparent = false, color = Colors.exteriorWood }: any) => {
    return (
        <mesh position={position} rotation={rotation as any} castShadow receiveShadow>
            <boxGeometry args={args} />
            {transparent ? (
                <meshPhysicalMaterial
                    color="#a0c0e0"
                    transparent={true}
                    opacity={0.25}
                    roughness={0.1}
                    metalness={0.1}
                    side={THREE.DoubleSide}
                />
            ) : (
                <meshStandardMaterial color={color} roughness={0.9} />
            )}
        </mesh>
    );
};

// Helper for the Pitched Roof
const PitchedRoof = ({ length, width, height, position, color }: any) => {
    // Create a triangular prism for the roof
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(width / 2, height);
    shape.lineTo(width, 0);
    shape.lineTo(0, 0);

    const extrudeSettings = {
        depth: length,
        bevelEnabled: false,
    };

    return (
        <mesh position={position} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
    );
};

export default function ChurchModel({ showInterior }: { showInterior: boolean }) {
    const t = showInterior; // shorthand

    return (
        <Canvas shadows camera={{ position: [25, 20, 30], fov: 45 }}>
            <Sky sunPosition={[50, 20, 30]} />
            <ambientLight intensity={0.5} />
            <directionalLight
                castShadow
                position={[20, 30, 20]}
                intensity={1.2}
                shadow-mapSize={[2048, 2048]}
            />
            <OrbitControls makeDefault minDistance={5} maxDistance={100} />

            {/* Ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.1, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#3d4c28" roughness={1} />
            </mesh>

            <group position={[0, 0, 0]}>
                {/* Floor Pattern Base */}
                <mesh position={[0, 0, 0]} receiveShadow castShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[11.8, 23.8]} />
                    {/* Simulated checkerboard tile material */}
                    <meshStandardMaterial color={Colors.floorLight} roughness={0.4} />
                </mesh>

                {/* Center aisle carpet/tiles */}
                <mesh position={[0, 0.02, 0]} receiveShadow castShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[3, 23.8]} />
                    <meshStandardMaterial color={Colors.floorDark} roughness={0.8} />
                </mesh>

                {/* --- EXTERIOR WALLS --- */}
                {/* Left & Right Walls */}
                <Wall position={[-6, 4, 0]} args={[0.4, 8, 24]} transparent={t} />
                <Wall position={[6, 4, 0]} args={[0.4, 8, 24]} transparent={t} />

                {/* Back Wall (Altar) */}
                <Wall position={[0, 4, -12]} args={[12.4, 8, 0.4]} transparent={t} />

                {/* Front Wall (Gable) */}
                <Wall position={[0, 4, 12]} args={[12.4, 8, 0.4]} transparent={t} />
                {/* Front Gable Triangle (filling in under roof) */}
                {!t && (
                    <mesh position={[-6.2, 8, 11.8]} rotation={[0, 0, 0]} castShadow>
                        <extrudeGeometry args={[
                            new THREE.Shape().moveTo(0, 0).lineTo(6.2, 4.5).lineTo(12.4, 0).lineTo(0, 0),
                            { depth: 0.4, bevelEnabled: false }
                        ]} />
                        <meshStandardMaterial color={Colors.exteriorWood} roughness={0.9} />
                    </mesh>
                )}
                {!t && (
                    <mesh position={[-6.2, 8, -12.2]} rotation={[0, 0, 0]} castShadow>
                        <extrudeGeometry args={[
                            new THREE.Shape().moveTo(0, 0).lineTo(6.2, 4.5).lineTo(12.4, 0).lineTo(0, 0),
                            { depth: 0.4, bevelEnabled: false }
                        ]} />
                        <meshStandardMaterial color={Colors.exteriorWood} roughness={0.9} />
                    </mesh>
                )}

                {/* Rose Window (Front) */}
                {!t && (
                    <group position={[0, 9, 12.25]}>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[1.5, 0.2, 16, 32]} />
                            <meshStandardMaterial color={Colors.stoneTrim} />
                        </mesh>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[1.4, 1.4, 0.1, 16]} />
                            <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
                        </mesh>
                        {/* Cross inside rose window */}
                        <mesh><boxGeometry args={[2.8, 0.1, 0.15]} /><meshStandardMaterial color={Colors.stoneTrim} /></mesh>
                        <mesh><boxGeometry args={[0.1, 2.8, 0.15]} /><meshStandardMaterial color={Colors.stoneTrim} /></mesh>
                        <mesh rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[2.8, 0.1, 0.15]} /><meshStandardMaterial color={Colors.stoneTrim} /></mesh>
                        <mesh rotation={[0, 0, -Math.PI / 4]}><boxGeometry args={[0.1, 2.8, 0.15]} /><meshStandardMaterial color={Colors.stoneTrim} /></mesh>
                    </group>
                )}

                {/* --- THE TOWER & SPIRE --- */}
                {/* Located at Front Right Corner (from inside looking out, so X=+6, Z=+12) */}
                <group position={[5.5, 0, 11.5]}>
                    <Wall position={[0, 6, 0]} args={[2.5, 12, 2.5]} transparent={t} />
                    {/* Spire */}
                    {!t && (
                        <mesh position={[0, 15, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
                            <coneGeometry args={[1.8, 6, 4]} />
                            <meshStandardMaterial color={Colors.roofSlate} roughness={0.8} />
                        </mesh>
                    )}
                </group>

                {/* --- MAIN ROOF --- */}
                {!t && (
                    <PitchedRoof
                        length={24.8}
                        width={13.2}
                        height={5}
                        position={[12.4, 8, -6.6]}
                        color={Colors.roofSlate}
                    />
                )}


                {/* --- INTERIOR DETAILS --- */}
                {/* Gothic Arched Side Windows (Represented by indentations/frames) */}
                {!t && Array.from({ length: 6 }).map((_, i) => (
                    <group key={`window-${i}`} position={[-6.25, 4, -9 + i * 3.5]}>
                        {/* Left side tall window elements */}
                        <mesh><boxGeometry args={[0.2, 4, 1]} /><meshStandardMaterial color={Colors.stoneTrim} /></mesh>
                        <mesh position={[12.3, 0, 0]}><boxGeometry args={[0.2, 4, 1]} /><meshStandardMaterial color={Colors.stoneTrim} /></mesh>
                    </group>
                ))}

                <group>
                    {/* Wooden Screen / Grille before Altar */}
                    {/* Ensure screen is always visible inside */}
                    <group position={[0, 4, -4]}>
                        {/* Base of screen */}
                        <mesh position={[0, -2.5, 0]} castShadow>
                            <boxGeometry args={[11.6, 3, 0.4]} />
                            <meshStandardMaterial color={Colors.woodDark} roughness={0.8} />
                        </mesh>
                        {/* Grille lattice */}
                        <mesh position={[0, 1.5, 0]} castShadow>
                            <boxGeometry args={[11.6, 5, 0.1]} />
                            <meshPhysicalMaterial color={Colors.woodDark} transparent={true} opacity={0.6} wireframe={true} />
                        </mesh>
                        {/* Top beam */}
                        <mesh position={[0, 4.1, 0]} castShadow>
                            <boxGeometry args={[11.6, 0.5, 0.6]} />
                            <meshStandardMaterial color={Colors.woodDark} />
                        </mesh>
                    </group>

                    {/* Altar Area */}
                    <group position={[0, 0, -8]}>
                        {/* Raised platform */}
                        <mesh position={[0, 0.2, 0]} receiveShadow castShadow>
                            <boxGeometry args={[10, 0.4, 7]} />
                            <meshStandardMaterial color={Colors.floorLight} />
                        </mesh>
                        {/* High Altar structure */}
                        <mesh position={[0, 1.5, -3]} castShadow>
                            <boxGeometry args={[4, 2, 1.5]} />
                            <meshStandardMaterial color={Colors.stoneTrim} />
                        </mesh>
                        {/* Tabernacle / Reredos */}
                        <mesh position={[0, 3.5, -3.5]} castShadow>
                            <boxGeometry args={[2, 3, 0.5]} />
                            <meshStandardMaterial color={Colors.stoneTrim} />
                        </mesh>
                    </group>

                    {/* Choir Stalls / Monastic Pews (facing the center aisle, intricate woodwork) */}
                    <group position={[0, 0, 2]}>
                        {/* Left Choir Stalls */}
                        <mesh position={[-4, 1, 0]} castShadow>
                            {/* Back panel */}
                            <boxGeometry args={[0.4, 3, 10]} />
                            <meshStandardMaterial color={Colors.woodDark} />
                        </mesh>
                        <mesh position={[-3, 0.6, 0]} castShadow>
                            {/* Seat */}
                            <boxGeometry args={[1.6, 0.5, 10]} />
                            <meshStandardMaterial color={Colors.woodDark} />
                        </mesh>
                        <mesh position={[-2.3, 1, 0]} castShadow>
                            {/* Desk/Front */}
                            <boxGeometry args={[0.4, 1.5, 10]} />
                            <meshStandardMaterial color={Colors.woodDark} />
                        </mesh>

                        {/* Right Choir Stalls */}
                        <mesh position={[4, 1, 0]} castShadow>
                            <boxGeometry args={[0.4, 3, 10]} />
                            <meshStandardMaterial color={Colors.woodDark} />
                        </mesh>
                        <mesh position={[3, 0.6, 0]} castShadow>
                            <boxGeometry args={[1.6, 0.5, 10]} />
                            <meshStandardMaterial color={Colors.woodDark} />
                        </mesh>
                        <mesh position={[2.3, 1, 0]} castShadow>
                            <boxGeometry args={[0.4, 1.5, 10]} />
                            <meshStandardMaterial color={Colors.woodDark} />
                        </mesh>
                    </group>

                    {/* Inner wall details - timber texture implied by color */}
                    {t && (
                        <group position={[0, 4, 0]}>
                            <Wall position={[-5.7, 0, 0]} args={[0.1, 7.8, 23.8]} color={Colors.interiorWood} />
                            <Wall position={[5.7, 0, 0]} args={[0.1, 7.8, 23.8]} color={Colors.interiorWood} />
                        </group>
                    )}

                </group>
            </group>
        </Canvas>
    );
}
