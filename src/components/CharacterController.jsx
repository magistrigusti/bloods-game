// import { Billboard, CameraControls, Text } from "@react-three/drei";
// import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
// import { isHost } from "playroomkit";
import { useEffect, useRef, useState } from "react";
import { CharacterSoldier } from "./CharacterSoldier";
const MOVEMENT_SPEED = 202;
const FIRE_RATE = 380;
export const WEAPON_OFFSET = {
  x: -0.2,
  y: 1.4,
  z: 0.8,
};

export const CharacterController = ({
  state, joystick, userPlayer, ...props
}) => {
  const [animation, setAnimation] = useState("Idle");
  const group = useRef();
  const character = useRef();
  const rigidbody = useRef();

  useFrame((_, delta) => {
    const angle = joystick.angle();
    if (joystick.isJoystickPressed() && angle) {
      setAnimation("Run");
      character.current.rotation.y = angle;

      const imulse = {
        x: Math.sin(angle) * MOVEMENT_SPEED * delta,
        y: 0,
        z: Math.cos(angle) * MOVEMENT_SPEED * delta,
      };

      rigidbody.current.applyImplse(imulse, true);
    } else {
      setAnimation("Idle");
    }
  })

  return (
    <group ref={group}>
      <RightBody ref={rigidbody} colliders={false}>
        <group ref={character}>
          <CharacterSoldier 
            color={state.state.provile?.color}
            animation={animation}
          />
        </group>

        <CapsuleCollider args={[0.7, 0.6]} position={[0, 1.28, 0]} />
      </RightBody>
    </group>
  )
}