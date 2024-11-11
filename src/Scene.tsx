import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Frame, getFrame } from "./getFrame";

export function Scene() {
  const [currentFrame, setCurrentFrame] = useState<Frame | null>(null);

  useEffect(() => {
    getFrame(0).then(setCurrentFrame);
  }, []);

  if (!currentFrame) return "loading...";

  const pts = new Float32Array(
    currentFrame.points.reduce((acc, curr) => {
      acc.push(...curr);
      return acc;
    }, [] as number[])
  );

  return (
    <>
      <Canvas>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={pts}
              count={pts.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial color={"red"} size={0.1}></pointsMaterial>
        </points>
      </Canvas>
    </>
  );
}
