export function GamingMove(mesh) {
    /*
    1,0,0 mode1
    1,1,0 mode2
    0,1,0
    0,1,1
    0,0,1
    1,0,1 mode6
    */

    //速度
    const v = 0.02;
    var red = mesh.material.color.r;
    var green = mesh.material.color.g;
    var blue = mesh.material.color.b;
    if (red>1 || red<0) {mesh.material.color.r = Math.round(mesh.material.color.r); red = Math.round(mesh.material.color.r);}
    if (green>1 || green<0) {mesh.material.color.g = Math.round(mesh.material.color.g); green = Math.round(mesh.material.color.g);}
    if (blue>1 || blue<0) {mesh.material.color.b = Math.round(mesh.material.color.b); blue = Math.round(mesh.material.color.b);}

    if (red==1 && green<1 && blue==0) {mesh.material.color.g += v; console.log("a");}
    if (red<=1 && red!=0 && green==1 && blue==0) {mesh.material.color.r -= v; console.log("b");}
    if (Math.abs(red)==0 && green==1 && blue<1) {mesh.material.color.b += v; console.log("c");}
    if (red==0 && green<=1 && green!=0 && blue==1) {mesh.material.color.g -= v; console.log("d");}
    if (red<1 && green==0 && blue==1) {mesh.material.color.r += v; console.log("e");}
    if (red==1 && green==0 && blue<=1 && blue!=0) {mesh.material.color.b -= v; console.log("f");}

    console.log(mesh.material.color);
    console.log(red,blue,green);
    console.log(Math.abs(red))
}