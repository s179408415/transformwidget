const pi = 3.1415926
window.onload=function() {
let canvas = document.querySelector('#canvas');
canvas.focus();

let gl = canvas.getContext('webgl2',{ stencil: true });
const program = gl.createProgram();
let vs = gl.createShader(gl.VERTEX_SHADER);
const vsSource=`#version 300 es
layout (location=0) in vec3 aPos;
uniform mat4 viewMat;
uniform mat4 projMat;
uniform mat4 worldMat;
out vec3 wPos;
void main() {
    gl_Position = projMat * viewMat* worldMat *vec4(aPos,1.);
    vec4 wPos4=worldMat *vec4(aPos,1.);
    wPos = wPos4.xyz/wPos4.w;
}
`;
gl.shaderSource(vs, vsSource);
gl.compileShader(vs);
if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
    console.error('Vertex shader compilation error:', gl.getShaderInfoLog(vs));
}
let fs = gl.createShader(gl.FRAGMENT_SHADER);
const fsSource=`#version 300 es
precision highp float;
uniform vec4 uColor;
in vec3 wPos;
out vec4 fragColor;
uniform int useLighting;
void main() {
    vec3 n = normalize(cross(dFdx(wPos),dFdy(wPos)));
    float ndotl = max(0., dot(vec3(0.2,0.6,0.8),n));
    ndotl = mix(1.,ndotl, float(useLighting));
    fragColor=uColor*ndotl;
}`;
gl.shaderSource(fs, fsSource);
gl.compileShader(fs);
if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    console.error('Vertex shader compilation error:', gl.getShaderInfoLog(fs));
}
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Shader program linking error:', gl.getProgramInfoLog(program));
}

gl.useProgram(program);

let vsSource1=`#version 300 es
layout (location=0) in vec3 aPos;
uniform mat4 viewMat;
uniform mat4 projMat;
uniform mat4 worldMat;
void main() {
    //gl_Position.xy = (vec2(gl_VertexID% 2, gl_VertexID/2)*2.-vec2(1.));
    gl_Position = projMat * viewMat* worldMat *vec4(aPos,1.);
    gl_Position.z += 0.00001 * gl_Position.w;
    // vec4 wPos4=worldMat *vec4(aPos,1.);
    // wPos = wPos4.xyz/wPos4.w;

    //gl_Position.zw = vec2(-1,1);
}
`;
let fsSource1=`#version 300 es
precision highp float;
out vec4 fragColor;
void main() {
    vec2 uv=gl_FragCoord.xy*0.5;
    
    vec2 patternxy = smoothstep(0.45,0.55,fract(uv));
    float pattern = patternxy.x*patternxy.y*0.5+0.5;
    fragColor=vec4(0,0,0,1.0)*pattern;
}
`;
const quadProgram = gl.createProgram();
vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, vsSource1);
gl.compileShader(vs);
if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
    console.error('Vertex shader compilation error:', gl.getShaderInfoLog(vs));
}

fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs, fsSource1);
gl.compileShader(fs);
if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    console.error('Vertex shader compilation error:', gl.getShaderInfoLog(fs));
}
gl.attachShader(quadProgram, vs);
gl.attachShader(quadProgram, fs);
gl.linkProgram(quadProgram);
if (!gl.getProgramParameter(quadProgram, gl.LINK_STATUS)) {
    console.error('Shader program linking error:', gl.getProgramInfoLog(quadProgram));
}

let [vb,ib]=createCube(1,1,1);
let [vbx,ibx]=createCube(1,0.05,0.05);
let [vby,iby]=createCube(0.05,1.0,0.05);
let [vbz,ibz]=createCube(0.05,0.05,1.0);

let vao = gl.createVertexArray();
gl.bindVertexArray(vao);
const bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
gl.bufferData(gl.ARRAY_BUFFER, vb, gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(0);

// const bufferId2 = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, bufferId2);
// gl.bufferData(gl.ARRAY_BUFFER, createQuad(), gl.STATIC_DRAW);
// locPos = gl.getAttribLocation(program, "aPos");
// gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);
// gl.enableVertexAttribArray(locPos);

const ibId = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibId);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ib, gl.STATIC_DRAW);

let vaox = gl.createVertexArray();
gl.bindVertexArray(vaox);
let vbox = gl.createBuffer(gl.ARRAY_BUFFER);
gl.bindBuffer(gl.ARRAY_BUFFER,vbox);
gl.bufferData(gl.ARRAY_BUFFER,vbx,gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(0);
let matTrans = translate(new Vector(1.0,0,0));
var geo1 = {vbx, matTrans};

let viox = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,viox);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,ibx,gl.STATIC_DRAW);

let vaoy = gl.createVertexArray();
gl.bindVertexArray(vaoy);
let vboy = gl.createBuffer(gl.ARRAY_BUFFER);
gl.bindBuffer(gl.ARRAY_BUFFER,vboy);
gl.bufferData(gl.ARRAY_BUFFER,vby,gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(0);
matTrans = translate(new Vector(0.0,1.0,0));
var geo2 = {vby, matTrans};

let vioy = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,vioy);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,iby,gl.STATIC_DRAW);

let vaoz = gl.createVertexArray();
gl.bindVertexArray(vaoz);
let vboz = gl.createBuffer(gl.ARRAY_BUFFER);
gl.bindBuffer(gl.ARRAY_BUFFER,vboz);
gl.bufferData(gl.ARRAY_BUFFER,vbz,gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(0);
matTrans = translate(new Vector(0.0,0,1.0));
var geo3 = {vbz, matTrans};

let vioz = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,vioz);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,ibz,gl.STATIC_DRAW);


gl.viewport(0,0,gl.canvas.width, gl.canvas.height);
let proj=perspective(pi/4, canvas.width/canvas.height,0.1,100.0);
let projMat = proj.arr();
let invProjMat= proj.inverse();
let q1 = Quat.fromAxisAngle(0, new Vector(1,0,0))
let q2 = Quat.fromAxisAngle(pi/6, (new Vector(1,1,0)).normalized())
let q3 = Quat.fromAxisAngle(pi/6, (new Vector(1,1,1)).normalized())

let startTime = Date.now();
var isMouseDown = false;
var moveButtonDown = false;
var widgetSize = 1;
var mousepos;
var camPos = new Vector(0,0,10);
var camEuler = new Vector();

let view = translate(camPos.neg()).mul(rotateY(-camEuler.y)).mul(rotateX(-camEuler.x)).mul(rotateZ(-camEuler.z));
setInterval(()=>{

    updateInput();
    let viewWidgetPos = view.transformPos(widgetPos);
    widgetSize = Math.abs(viewWidgetPos.z/10);

    
    let curTime = (Date.now()-startTime)/1000;
    let t1 = curTime%1*3;
    let t2 = Math.floor(t1)
    let t3 = t1-t2;
    let q,p;
    if (t2==0) {
        q=q1;
        p=q2;
    }else if(t2==1) {
        q=q2;
        p=q3;
    } else {
        q=q3;
        p=q1;
    }
    let o = q.slerp(p,t3);
    let {theta, u} = o.toAxisAngle()
    let m = rotateAxisAngle(theta, u);
    m = Matrix.identity();
    gl.clearColor(0,0,0,1);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.STENCIL_TEST);

    gl.clearDepth(1.0);
    gl.clearStencil(0);
    // gl.colorMask(false, false, false, false);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT|gl.STENCIL_BUFFER_BIT);
    gl.useProgram(program);
    // let viewMat = lookAt(new Vector(0,0,10), new Vector(0,0,0), new Vector(0,1,0)).arr();
    view = translate(camPos.neg()).mul(rotateY(-camEuler.y)).mul(rotateX(-camEuler.x)).mul(rotateZ(-camEuler.z));
    let viewMat = view.arr();
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "viewMat"), false, viewMat);
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projMat"), false, projMat);
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "worldMat"), false, m.arr());
    gl.uniform1i( gl.getUniformLocation(program, "useLighting"), 0);

    let widgetPosTrans = translate(widgetPos);
    gl.stencilFunc(gl.ALWAYS, 1, 0xff);
    // gl.stencilMask(0xFF);
    gl.stencilOp(gl.KEEP,gl.KEEP,gl.REPLACE);

    gl.bindVertexArray(vaox);
    let trans = scale(widgetSize).mul(widgetPosTrans);
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "worldMat"), false,m.mul(geo1.matTrans).mul(trans).arr());
    gl.uniform4fv(gl.getUniformLocation(program, "uColor"),pickAxis == EPickAxis.X ? [1,1,0,1]:[1,0,0,1]);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(vaoy);
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "worldMat"), false, m.mul(geo2.matTrans).mul(trans).arr());
    gl.uniform4fv(gl.getUniformLocation(program, "uColor"),pickAxis == EPickAxis.Y ? [1,1,0,1]:[0,1,0,1]);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(vaoz);
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "worldMat"), false, m.mul(geo3.matTrans).mul(trans).arr());
    gl.uniform4fv(gl.getUniformLocation(program, "uColor"),pickAxis == EPickAxis.Z ? [1,1,0,1]:[0,0,1,1]);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

    gl.uniform1i( gl.getUniformLocation(program, "useLighting"), 1);
    gl.colorMask(true,true,true,true);
    gl.stencilFunc(gl.EQUAL, 0, 0xff);
    gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);
    gl.bindVertexArray(vao);
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "worldMat"), false,m.mul(widgetPosTrans).arr());
    gl.uniform4fv(gl.getUniformLocation(program, "uColor"),[1,1,1,1]);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

    // gl.disable(gl.STENCIL_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.STENCIL_TEST);
    gl.useProgram(quadProgram);
    gl.bindVertexArray(vao);
    gl.uniformMatrix4fv( gl.getUniformLocation(quadProgram, "viewMat"), false, viewMat);
    gl.uniformMatrix4fv( gl.getUniformLocation(quadProgram, "projMat"), false, projMat);
    gl.uniformMatrix4fv( gl.getUniformLocation(quadProgram, "worldMat"), false,m.mul(widgetPosTrans).arr());
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
    // gl.stencilFunc(gl.LESS,1, 0xff);
    // gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);
    // gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    gl.disable(gl.BLEND);
}, 0.1);
    var EPickAxis = {
        X:0,
        Y:1,
        Z:2,
        None:-1
    };
    var pickAxis = EPickAxis.None;
    var dragStartPos;
    var widgetPos = new Vector(0,0,0);
    let viewWidgetPos = view.transformPos(widgetPos);
    widgetSize = Math.abs(viewWidgetPos.z/10);
    var rayo;
    var royd;
    function doIntersectTest(x,y) {
        var glX = (x / canvas.width) * 2 - 1;
        var glY = ((canvas.height - y) / canvas.height) * 2 - 1;
        let viewPos = invProjMat.transformPos(new Vector4(glX,glY,-1.0,1.0)).normalized();
        let invViewMat = view.inverse();
        let o = invViewMat.transformPos(new Vector());
        let d = invViewMat.transformVec(viewPos);
        rayo = o;
        rayd = d;
        if (moveButtonDown == false) {
            pickAxis = EPickAxis.None;
            let widgetPosTrans = translate(widgetPos);
            let trans = scale(widgetSize).mul(widgetPosTrans);
            if (isRayIntersect(o,d,vbx,geo1.matTrans.mul(trans))) {
                pickAxis = EPickAxis.X;
            } else if(isRayIntersect(o,d,vby,geo2.matTrans.mul(trans))) {
                pickAxis = EPickAxis.Y;
            } else if (isRayIntersect(o,d,vbz,geo3.matTrans.mul(trans))) {
                pickAxis = EPickAxis.Z;
            }
        }
    }


    

    canvas.addEventListener("mousemove", function(event) {
        // 获取鼠标在 canvas 上的坐标
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        if (isMouseDown) {
            let delta = new Vector(x-mousepos[0],y-mousepos[1]);
            camEuler.x-=delta.y*0.001;
            camEuler.y-=delta.x*0.001;
        } else if(moveButtonDown) {
            if (pickAxis != EPickAxis.None) {
                let axis = pickAxis == EPickAxis.X ? [1,0,0] : (pickAxis == EPickAxis.Y ? [0,1,0] : [0,0,1]);
                axis = new Vector(...axis);
                let up = rayd.cross(axis);
                let norm = rayd.cross(up).normalized();
                // norm*[o+n*t]- norm(rayo);
                let t = (norm.dot(rayo) - norm.dot(widgetPos))/norm.dot(axis); 
                let dragNewPos = widgetPos.add(axis.mul(t));
                let delta = dragNewPos.sub(dragStartPos);
                widgetPos.addSelf(delta);
                dragStartPos = dragNewPos;
            }
        }
        
        doIntersectTest(x,y);
    
        mousepos = [x,y];
    });

    canvas.addEventListener("mousedown", function(event) {
        // 获取鼠标在 canvas 上的坐标
        if (event.button == 1) {
            isMouseDown = true;
            var rect = canvas.getBoundingClientRect();
    
            mousepos = [event.clientX-rect.left, event.clientY-rect.top];
        } else if(event.button == 0) {
            if (pickAxis != EPickAxis.None) {
                let axis = pickAxis == EPickAxis.X ? [1,0,0] : (pickAxis == EPickAxis.Y ? [0,1,0] : [0,0,1]);
                axis = new Vector(...axis);
                let up = rayd.cross(axis);
                let norm = rayd.cross(up).normalized();
                // norm*[o+n*t]- norm(rayo);
                let t = (norm.dot(rayo) - norm.dot(widgetPos))/norm.dot(axis); 
                dragStartPos = widgetPos.add(axis.mul(t));

                //isRayIntersect(rayo, rayd, axis);
                moveButtonDown = true;
            }
        }
    
    });
    window.addEventListener("mouseup", function(event) {
        // 获取鼠标在 canvas 上的坐标
        isMouseDown = false;
        moveButtonDown = false;
        keys.clear();
    });
    var keys = new Set();
    
    var velocity = new Vector();
    function updateInput() {
        if (keys.size>0)
        {
            let eumat = fromEuler(camEuler);
            var look = eumat.transform(new Vector(0,0,-1));
            var right = eumat.transform(new Vector(1,0,0));
            var up = eumat.transform(new Vector(0,1,0));
        }
        let speed = 0.01;
        keys.forEach(e => {
            switch (e) {
                case 'w':
                    velocity.addSelf(look.mul(speed));
                    break;
                case 's':
                    velocity.addSelf(look.mul(speed).neg());
                    break;
                case 'a':
                    velocity.addSelf(right.mul(speed).neg());
                    break;
                case 'd':
                    velocity.addSelf(right.mul(speed));
                    break;
                case 'q':
                    velocity.addSelf(up.mul(speed));
                    break;
                case 'z':
                    velocity.addSelf(up.mul(speed).neg());
                    break;
            }
        });
        velocity.mulSelf(0.96);
        camPos.addSelf(velocity);
    }

    document.body.addEventListener("keydown", function(event) {
        // 获取按下的键码
        if (isMouseDown) {
            var keyCodeChar = String.fromCharCode(event.keyCode).toLowerCase();
            if (keyCodeChar == 'w'|| keyCodeChar=='s'||keyCodeChar == 'a'||
             keyCodeChar =='d'|| keyCodeChar =='q'|| keyCodeChar =='z') {
                keys.add(keyCodeChar);
            }
        }
    });

    document.body.addEventListener("keyup", function(event) {
        // 获取释放的键码
        var keyCodeChar = String.fromCharCode(event.keyCode).toLowerCase();
        keys.delete(keyCodeChar);
    });
}


function isRayIntersect(o,d,vb,wt) {
    let vsize = vb.length /3;
    let min = new Vector(100000,100000,100000);
    let max = new Vector(-100000,-100000,-100000)
    let vertices = [];
    for (let i=0;i<vsize;i++) {
        vertices.push( wt.transformPos(new Vector(vb[i*3],vb[i*3+1],vb[i*3+2])));
    }
    for (let i=0;i<vsize;i++) {
        for (let j=0;j<3;j++) {
            let v = vertices[i].get(j);
            if (v<min.get(j))
                min.set(j, v);
            if (v>max.get(j))
                max.set(j, v);
        }
    }
    min.subSelf(o);
    max.subSelf(o);
    let mint = -1000000;
    let maxt = 1000000;
    for (let i=0;i<3;i++) {
        if (d.get(i) == 0) {
            if ( min.get(i)>0 || max.get(i)<0)
                return false;
        } else {
            let en = min.get(i) / d.get(i);
            let ou = max.get(i)/d.get(i);
            if (en > ou) {
                let tmp = en;
                en = ou;
                ou = tmp;
            }
            mint = Math.max(mint, en);
            maxt = Math.min(maxt, ou);
        }
    }
    return mint <= maxt;
}