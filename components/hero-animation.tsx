"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"

const InteractiveMesh = () => {
  const { mouse } = useThree()
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const geometryRef = useRef<THREE.BufferGeometry | null>(null)

  useEffect(() => {
    if (!meshRef.current) return

    // Create vertices for a web-like structure
    const vertices: number[] = []
    const indices: number[] = []
    const gridSize = 10

    // Create points in a circular pattern
    for (let i = 0; i < gridSize; i++) {
      const angle = (i / gridSize) * Math.PI * 2
      const radius = 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      const z = 0

      vertices.push(x, y, z)
    }

    // Add center point
    vertices.push(0, 0, 0)

    // Create connections
    for (let i = 0; i < gridSize; i++) {
      // Connect to center
      indices.push(i, gridSize)
      // Connect to next point
      indices.push(i, (i + 1) % gridSize)
    }

    // Create and set up geometry
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    
    // Store geometry reference
    geometryRef.current = geometry
    meshRef.current.geometry = geometry
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !geometryRef.current) return

    const time = state.clock.getElapsedTime()
    const mouseX = mouse.x * 5
    const mouseY = mouse.y * 5

    const positions = geometryRef.current.attributes.position.array as Float32Array

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]

      // Calculate distance from mouse
      const dx = x - mouseX
      const dy = y - mouseY
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Create wave effect
      const wave = Math.sin(distance * 2 - time * 2) * 0.5
      const repulsion = Math.max(0, 1 - distance / 2)

      // Update positions
      positions[i] = x + wave * 0.5 + repulsion * 0.5
      positions[i + 1] = y + wave * 0.5 + repulsion * 0.5
      positions[i + 2] = z + wave * 0.3
    }

    geometryRef.current.attributes.position.needsUpdate = true
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      rotation={[0, 0, 0]}
    >
      <meshPhongMaterial
        color={hovered ? 0x9333ea : 0x7e22ce}
        shininess={100}
        transparent
        opacity={0.8}
        wireframe
      />
    </mesh>
  )
}

const HeroAnimation = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-[600px] relative rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-2xl"></div>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <InteractiveMesh />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} color={0x9333ea} intensity={1} />
        <OrbitControls enableZoom={false} enablePan={false} />
        <Environment preset="city" />
      </Canvas>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 animate-pulse-slow flex items-center justify-center">
          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/40 to-pink-600/40 animate-float"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 glass-effect p-4 rounded-lg border border-white/10 max-w-[200px]">
        <div className="text-sm font-medium mb-1">AI-Generated Content</div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </div>

      <div className="absolute top-6 right-6 glass-effect p-4 rounded-lg border border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm">AI Models Active</span>
        </div>
      </div>
    </motion.div>
  )
}

export default HeroAnimation

