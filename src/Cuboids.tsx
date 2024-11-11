import { BoxGeometry, Euler } from "three";
import { Frame } from "./getFrame";

export function Cuboids({ frame }: { frame: Frame }) {
  return (
    <>
      {frame.cuboids.map((cuboid) => {
        return (
          <group>
            <mesh
              key={cuboid.uuid}
              position={[
                cuboid.position.x,
                cuboid.position.y,
                cuboid.position.z,
              ]}
              rotation={new Euler(0, cuboid.yaw, 0, "XYZ")}
            >
              <boxGeometry
                args={[
                  cuboid.dimensions.x,
                  cuboid.dimensions.y,
                  cuboid.dimensions.z,
                ]}
              ></boxGeometry>
              <meshBasicMaterial
                color="green"
                transparent={true}
                opacity={0.3}
              ></meshBasicMaterial>
            </mesh>
            <lineSegments
              position={[
                cuboid.position.x,
                cuboid.position.y,
                cuboid.position.z,
              ]}
              rotation={new Euler(0, cuboid.yaw, 0, "XYZ")}
            >
              <edgesGeometry
                args={[
                  new BoxGeometry(
                    cuboid.dimensions.x,
                    cuboid.dimensions.y,
                    cuboid.dimensions.z
                  ),
                ]}
              ></edgesGeometry>
              <lineBasicMaterial color="teal"></lineBasicMaterial>
            </lineSegments>
          </group>
        );
      })}
    </>
  );
}
