import { useMemo } from "react";
import { Frame } from "./getFrame";
import { arrayBounds } from "./helpers";

const gradientStart = { r: 0, g: 0, b: 255 };
const gradientEnd = { r: 255, g: 0, b: 0 };


/**
 * Creates a function that can caluclate the appropiate color based on the gradient for a given height
 * @param minValue minimum height on the point cloud
 * @param maxValue maximum height on the point cloud
 * @returns 
 */
function makeGradientFucntion(
  minValue: number,
  maxValue: number
): (height: number) => [number, number, number] {
  return (height: number): [number, number, number] => {
    const scale = maxValue - minValue;
    const relative = height - minValue;
    const gradientPercentage = (relative * 100) / scale;

    return [gradientValue(gradientPercentage, "r"), gradientValue(gradientPercentage,"g"), gradientValue(gradientPercentage, "b") ];
  };
}

/**
 * @param p percentage of the gradient - 0 being the start of the gradient and 100 being the end of the gradient
 * @param channel color channel to compute the value
 * @returns the value corresponding to that percentage of the gradient for the given height
 */
function gradientValue(p: number, channel: keyof typeof gradientStart) {
  return (gradientStart[channel] + ((gradientEnd[channel] - gradientStart[channel]) * p) / 100) / 255;
}

export function FramePoints({ frame }: { frame: Frame }) {
  const pts = useMemo(
    () =>
      {
        return new Float32Array(
          frame.points.reduce((acc, curr) => {
            acc.push(...curr);
            return acc;
          }, [] as number[])
        );
      },
    [frame]
  );

  const colors = useMemo(() => {
    const yCoords = frame.points.map(([_, y]) => y);
    const [min, max] = arrayBounds(yCoords);
    const gradientFunction =  makeGradientFucntion(min, max);
    const bufferColor = yCoords.map(y => gradientFunction(y)).reduce((acc, curr) => {acc.push(...curr); return acc} ,[] as number[]);
    return new Float32Array(bufferColor);
  },[frame])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={pts}
          count={pts.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry >
      <pointsMaterial size={0.05} vertexColors={true}></pointsMaterial>
    </points>
  );
}
