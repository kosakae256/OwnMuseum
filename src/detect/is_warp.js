export function Warp(camera,controls)
{
    //ドームへ移動
    if (camera.position.x < 48 && camera.position.x > 32 && camera.position.y < 8 && camera.position.y > -8 && camera.position.z < 48 && camera.position.z > 32)
    {
        camera.position.z = 10000;
        camera.position.x = 10000;
        camera.position.y = 0
        camera.rotation = (0,0,0);
    }
    //ロビーに移動
    if (camera.position.x == 10000 && camera.position.y > 16 && camera.position.z == 10000)
    {
        camera.position.z = 0;
        camera.position.x = 0;
        camera.position.y = 0
        camera.rotation = (0,0,0);
    }
}
