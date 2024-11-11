import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Frame, getFrame } from "./getFrame";
import { FramePoints } from "./FramePoints";
import { Cuboids } from "./Cuboids";
import { OrbitControls } from "@react-three/drei";

export function Scene() {
  const [frameN, setFrameN] = useState(0);
  const [currentFrame, setCurrentFrame] = useState<Frame | null>(null);

  useEffect(() => {
    setCurrentFrame(null);
    getFrame(frameN).then(setCurrentFrame);
  }, [frameN]);

  if (!currentFrame) return "loading...";

  return (
    <>
      <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: 9999
      }}>
        <button onClick={() => setFrameN((n) => --n)}>-</button>
        {frameN}
        <button onClick={() => setFrameN((n) => ++n)}>+</button>
      </div>
      <Canvas>
        <OrbitControls />
        <FramePoints frame={currentFrame} />
        <Cuboids frame={currentFrame}/>
      </Canvas>
    </>
  );
}
