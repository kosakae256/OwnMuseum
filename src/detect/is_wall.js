
export function Wall(camera) {
    if (camera.position.y < 0) {
        camera.position.y = 0
      }
      if (camera.position.z > 48) {
        camera.position.z = 48
      }
      if (camera.position.z < -48) {
        camera.position.z = -48
      }
      if (camera.position.x > 48) {
        camera.position.x = 48
      }
      if (camera.position.x < -48) {
        camera.position.x = -48
      }
}