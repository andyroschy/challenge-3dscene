import { useMemo } from "react";
import { Frame } from "./getFrame";

export function FramePoints({ frame }: { frame: Frame }) {
  const pts = useMemo(
    () =>
      new Float32Array(
        frame.points.reduce((acc, curr) => {
          acc.push(...curr);
          return acc;
        }, [] as number[])
      ),
    [frame]
  );

  return (
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
  );
}
