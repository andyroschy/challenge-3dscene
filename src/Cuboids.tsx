import { BoxGeometry, Euler } from "three";
import { Cuboid, Frame } from "./getFrame";
import { useState } from "react";
import { Text } from "@react-three/drei";

interface CuboidsProp {
  frame: Frame;
  onDisplayDetails: (cuboid: Cuboid, mouseCoords: [number]) => void;
}

export function Cuboids({
  frame,
  onDisplayDetails: onViewDetail,
}: CuboidsProp) {
  return (
    <>
      {frame.cuboids.map((cuboid) => {
        return (
          <SingleCuboid
            cuboid={cuboid}
            key={cuboid.uuid}
            onViewDetail={onViewDetail}
          />
        );
      })}
    </>
  );
}

function SingleCuboid({
  cuboid,
}: {
  cuboid: Cuboid;
  onViewDetail: CuboidsProp["onDisplayDetails"];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      key={cuboid.uuid}
      onPointerEnter={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {hovered ? (
        <Text
          position={[cuboid.position.x, cuboid.position.y + 3, cuboid.position.z]}
          fontSize={0.5} 
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {`
        Object type: ${cuboid.label}
        Sensor id:  ${cuboid.sensorId}
        Camera: ${cuboid.cameraUsed}
        `}
        </Text>
      ) : undefined}
      <mesh
        position={[cuboid.position.x, cuboid.position.y, cuboid.position.z]}
        rotation={new Euler(0, cuboid.yaw, 0, "XYZ")}
      >
        <boxGeometry
          args={[cuboid.dimensions.x, cuboid.dimensions.y, cuboid.dimensions.z]}
        ></boxGeometry>
        <meshBasicMaterial
          color={hovered ? "orange" : "teal"}
          transparent={true}
          opacity={0.4}
        ></meshBasicMaterial>
      </mesh>
      <lineSegments
        position={[cuboid.position.x, cuboid.position.y, cuboid.position.z]}
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
        <lineBasicMaterial
          color={hovered ? "red" : "yellow"}
        ></lineBasicMaterial>
      </lineSegments>
    </group>
  );
}
