import { Euler } from "three";
import { Frame } from "./getFrame";

export function Cuboids({ frame }: { frame: Frame }) {
  

  return (
    <>
      {frame.cuboids.map((cuboid) => {
        return (
          <mesh
            key={cuboid.uuid}
            position={[
              cuboid.position.x,
              cuboid.position.y,
              cuboid.position.z,
            ]}
            rotation={new Euler(0,0, cuboid.yaw, 'XYZ')}
          >
            <boxGeometry args={[cuboid.dimensions.x, cuboid.dimensions.y, cuboid.dimensions.z]}></boxGeometry>
            <meshBasicMaterial color="green" wireframe></meshBasicMaterial>
          </mesh>
        );
      })}
    </>
  );
}
