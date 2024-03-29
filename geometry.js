function createCube(a,b,c) {
    let vb = new Float32Array([
        -a,b,c, a,b,c, a,b,-c, -a,b,-c,
        -a,-b,c, -a,-b,-c, a,-b,-c, a,-b,c
    ]);
    let ib = new Uint16Array([
        0,1,2,0,2,3,4,5,6,4,6,7,
        4,7,1,4,1,0,6,5,3,6,3,2,
        5,4,0,5,0,3,7,6,2,7,2,1
    ]);
   return [vb,ib];
}

function createQuad() {
    return new Float32Array([
        -1,-1,1,-1,1,1,-1,1
    ]);
}