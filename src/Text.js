import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useUpdate, useFrame } from "react-three-fiber";
import JSONfont from "./Akaya Telivigala_Regular.json";

export default function Text({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 1,
  color = "blue",
  ...props
}) {
  // load in font
  const font = new THREE.FontLoader().parse(JSONfont);
  const config = useMemo(
    () => ({
      font,
      size: 16,
      height: 30,
      /* curveSegments: 32, */
/*       bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 1.5,
      bevelOffset: 0,
      bevelSegments: 1, */
    }),
    [font]
  );
  const mesh = useUpdate(
    (self) => {
      const size = new THREE.Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(size);
      self.position.x =
        hAlign === "center" ? -size.x / 2 : hAlign === "right" ? 0 : -size.x;
      self.position.y =
        vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y;
    },
    [children]
  );

  const ref = useRef()

    // Animate model
    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
        ref.current.rotation.x = Math.cos(t / 2) / 8
        ref.current.rotation.y = Math.sin(t / 2) / 8
        ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
      })

  return (
    <group ref={ref} {...props} scale={[0.1 * size, 0.1 * size, 0.01]}>
      <mesh ref={mesh}>
        <textBufferGeometry args={[children, config]} />
        <meshStandardMaterial attach="material" />
      </mesh>
    </group>
  );
}
