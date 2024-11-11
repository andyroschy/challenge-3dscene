import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Frame, getFrame } from "./getFrame";
import { FramePoints } from "./FramePoints";

export function Scene() {
  const [currentFrame, setCurrentFrame] = useState<Frame | null>(null);

  useEffect(() => {
    getFrame(7).then(setCurrentFrame);
  }, []);

  if (!currentFrame) return "loading...";

  return (
    <>
      <Canvas>
        <FramePoints frame={currentFrame} />
      </Canvas>
    </>
  );
}
