
export function Wall(camera) {
    if (camera.position.y < 0) {
        camera.position.y = 0
      }
      if (camera.position.y > 32 && camera.position.y < 33) {
        camera.position.y = 32
      }
      if (camera.position.z > 48 && camera.position.z < 49) {
        camera.position.z = 48
      }
      if (camera.position.z < -48 && camera.position.z > -49) {
        camera.position.z = -48
      }
      if (camera.position.x > 48 && camera.position.x < 49) {
        camera.position.x = 48
      }
      if (camera.position.x < -48 && camera.position.x > -49) {
        camera.position.x = -48
      }

      if ((camera.position.x>10000.00001 && camera.position.x<11000) || (camera.position.x<9999.9999 && camera.position.x>9000) || (camera.position.z>10000.00001 && camera.position.z<11000) || (camera.position.z<9999.9999 && camera.position.z>9000)){
        camera.position.x = 10000;
        camera.position.z = 10000;
      }
}