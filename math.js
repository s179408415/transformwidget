function Vector() {
	if (arguments.length==0) {
		this.x = this.y = this.z=0;
	} else if(arguments.length==1) {
		this.x = this.y = this.z=arguments[0];
	} else if (arguments.length==2) {
		this.x = arguments[0];
		this.y = arguments[1];
		this.z = 0;
	} else {
		this.x=arguments[0];
		this.y = arguments[1];
		this.z = arguments[2];
	}
}

Vector.prototype = {};

Vector.prototype.get = function(index) {
	if (index==0) {
		return this.x;
	} else if(index==1) {
		return this.y;
	} else {
		return this.z;
	}
}

Vector.prototype.set = function(index,val) {
	if (index==0) {
		this.x=val;
	} else if(index==1) {
		this.y=val;
	} else {
		this.z=val;
	}
}
Vector.prototype.neg = function() {
	return new Vector(-this.x,-this.y,-this.z);
}
Vector.prototype.length = function() {
	return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
}
Vector.prototype.lengthSquared = function() {
	return this.x*this.x+this.y*this.y+this.z*this.z;
}
Vector.prototype.normalized = function() {
	let ret = new Vector();
	let len = this.length();
	if (len!=0)
	{
		let invlen = 1.0/len;
		return this.mul(invlen);
	}
}
Vector.prototype.add = function(other) {
	if (typeof(other) == 'number') {
		// scalar
		return new Vector(this.x+other,this.y+other,this.z+other);
	} else if(other instanceof Vector) {
		return new Vector(this.x+other.x, this.y+other.y, this.z+other.z);
	}
}
Vector.prototype.addSelf = function(other) {
	if (typeof(other) == 'number') {
		// scalar
		this.x+=other;
		this.y+=other;
		this.z+=other;
	} else if(other instanceof Vector) {
		this.x+=other.x;
		this.y+=other.y;
		this.z+=other.z;
	}
}

Vector.prototype.sub=function(other) {
	if (typeof(other) == 'number') {
		// scalar
		return new Vector(this.x-other,this.y-other,this.z-other);
	} else if(other instanceof Vector) {
		return new Vector(this.x-other.x, this.y-other.y, this.z-other.z);
	}
}
Vector.prototype.subSelf=function(other) {
	if (typeof(other) == 'number') {
		// scalar
		this.x-=other;
		this.y-=other;
		this.z-=other;
	} else if(other instanceof Vector) {
		this.x-=other.x;
		this.y-=other.y;
		this.z-=other.z;
	}
}

Vector.prototype.mul = function(other) {
	if (typeof(other) == 'number') {
		return new Vector(this.x*other,this.y*other,this.z*other);
	} else if(other instanceof Vector) {
		return new Vector(this.x*other.x, this.y*other.y, this.z*other.z);
	} else if(other instanceof Matrix3) {
		return new Vector(this.dot(other.col(0)),this.dot(other.col(1)),this.dot(other.col(2)));
	}
}
Vector.prototype.mulSelf = function(other) {
	if (typeof(other) == 'number') {
		this.x*=other;
		this.y*=other;
		this.z*=other;
	} else if(other instanceof Vector) {
		this.x*=other.x;
		this.y*=other.y;
		this.z*=other.z;
	} else if(other instanceof Matrix3) {
		let ret = new Vector(this.dot(other.col(0)),this.dot(other.col(1)),this.dot(other.col(2)));
		this.x=ret.x;
		this.y=ret.y;
		this.z=ret.z;
	}
}
Vector.prototype.div = function(other) {
	if (typeof(other) == 'number') {
		return new Vector(this.x/other,this.y/other,this.z/other);
	} else if(other instanceof Vector) {
		return new Vector(this.x/other.x, this.y/other.y, this.z/other.z);
	}
}
Vector.prototype.divSelf = function(other) {
	if (typeof(other) == 'number') {
		this.x/=other;
		this.y/=other;
		this.z/=other;
	} else if(other instanceof Vector) {
		this.x/=other.x;
		this.y/=other.y;
		this.z/=other.z;
	}
}
Vector.prototype.dot = function(other) {
	if (other instanceof Vector) {
		return this.x*other.x+this.y*other.y+this.z*other.z;
	}
}
Vector.prototype.cross=function(other) {
	if (other instanceof Vector) {
		return new Vector(this.y*other.z-this.z*other.y,this.z*other.x-this.x*other.z,this.x*other.y-this.y*other.x);
	}
}
Vector.prototype.clone = function() {
	return new Vector(this.x,this.y,this.z);
}
function Vector4() {
	if (arguments.length==0) {
		this.x = this.y = this.z= this.w = 0;
	} else if(arguments.length==1) {
		this.x = this.y = this.z= this.w=arguments[0];
	}else if(arguments.length==2) {
		this.x = arguments[0];
		this.y = arguments[1];
		this.z= 0;
		this.w = 0;
	}else if(arguments.length==3) {
		this.x = arguments[0];
		this.y = arguments[1];
		this.z=  arguments[2];
		this.w = 0;
	}else{
		this.x = arguments[0];
		this.y = arguments[1];
		this.z=  arguments[2];
		this.w = arguments[3];
	}
	
}

Vector4.prototype = {};

Vector4.prototype.get = function(index) {
	if (index==0) {
		return this.x;
	} else if(index==1) {
		return this.y;
	} else if(index==2) {
		return this.z;
	} else {
		return this.w;
	}
}
Vector4.prototype.set = function(index,val) {
	if (index==0) {
		this.x=val;
	} else if(index==1) {
		this.y=val;
	} else if(index==2) {
		this.z=val;
	} else {
		this.w=val;
	}
}
Vector4.prototype.length = function() {
	return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);
}
Vector4.prototype.lengthSquared = function() {
	return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w;
}
Vector4.prototype.normalized = function() {
	let len = this.length();
	if (len!=0)
	{
		let invlen = 1.0/len;
		return this.mul(invlen);
	}
}
Vector4.prototype.neg = function() {
	return new Vector(-this.x,-this.y,-this.z,-this.w);
}
Vector4.prototype.add = function(other) {
	if (typeof(other) == 'number') {
		// scalar
		return new Vector4(this.x+other,this.y+other,this.z+other,this.w+other);
	} else if(other instanceof Vector4) {
		return new Vector4(this.x+other.x, this.y+other.y, this.z+other.z,this.w+other.w);
	}
}
Vector4.prototype.addSelf = function(other) {
	if (typeof(other) == 'number') {
		// scalar
		this.x+=other;
		this.y+=other;
		this.z+=other;
		this.w+=other;
	} else if(other instanceof Vector4) {
		this.x+=other.x;
		this.y+=other.y;
		this.z+=other.z;
		this.w+=other.w;
	}
}
Vector4.prototype.sub=function(other) {
	if (typeof(other) == 'number') {
		// scalar
		return new Vector4(this.x-other,this.y-other,this.z-other,this.w-other);
	} else if(other instanceof Vector4) {
		return new Vector4(this.x-other.x, this.y-other.y, this.z-other.z,this.w-other.w);
	}
}
Vector4.prototype.subSelf=function(other) {
	if (typeof(other) == 'number') {
		// scalar
		this.x-=other;
		this.y-=other;
		this.z-=other;
		this.w-=other;
	} else if(other instanceof Vector4) {
		this.x-=other.x;
		this.y-=other.y;
		this.z-=other.z;
		this.w-=other.w;
	}
}
Vector4.prototype.mul = function(other) {
	if (typeof(other) == 'number') {
		return new Vector4(this.x*other,this.y*other,this.z*other,this.w*other);
	} else if(other instanceof Vector4) {
		return new Vector4(this.x*other.x, this.y*other.y, this.z*other.z,this.w*other.w);
	} else if(other instanceof Matrix) {
		return new Vector4(this.dot(other.col(0)),this.dot(other.col(1)),this.dot(other.col(2)),this.dot(other.col(3)));
	}
}
Vector4.prototype.mulSelf = function(other) {
	if (typeof(other) == 'number') {
		this.x*=other;
		this.y*=other;
		this.z*=other;
		this.w*=other;
	} else if(other instanceof Vector4) {
		this.x*=other.x;
		this.y*=other.y;
		this.z*=other.z;
		this.w*=other.w;
	} else if(other instanceof Matrix) {
		let ret = new Vector4(this.dot(other.col(0)),this.dot(other.col(1)),this.dot(other.col(2)),this.dot(other.col(3)));
		this.x=ret.x;
		this.y=ret.y;
		this.z=ret.z;
		this.w=ret.w;
	}
}

Vector4.prototype.div = function(other) {
	if (typeof(other) == 'number') {
		return new Vector4(this.x/other,this.y/other,this.z/other,this.w/other);
	} else if(other instanceof Vector4) {
		return new Vector4(this.x/other.x, this.y/other.y, this.z/other.z,this.w/other.w);
	}
}
Vector4.prototype.divSelf = function(other) {
	if (typeof(other) == 'number') {
		this.x/=other;
		this.y/=other;
		this.z/=other;
		this.w/=other;
	} else if(other instanceof Vector4) {
		this.x/=other.x;
		this.y/=other.y;
		this.z/=other.z;
		this.w/=other.w;
	}
}

Vector4.prototype.dot=function(other) {
	if (other instanceof Vector4) {
		return this.x*other.x+this.y*other.y+this.z*other.z+this.w*other.w;
	}
}

Vector4.prototype.clone = function() {
	return new Vector4(this.x,this.y,this.z,this.w);
}
function Matrix() {
	this.m=[];
	for (let i=0;i<4;i++) 
		this.m[i]= new Vector4();
	if (arguments.length == 4) {
		let bAllVector =true;
		for (let i=0;i<4;i++) {
			if (!arguments[i] instanceof Vector4) {
				bAllVector=false;
				break;
			}
		}
		if (bAllVector) {
			for (let i=0;i<4;i++) 
				this.m[i]= arguments[i].clone();
		}
	} else if(arguments.length==1) {
		if (arguments[0] instanceof Vector4) {
			for (let i=0;i<4;i++) 
				this.m[i]= arguments[0].clone();
		} else if (typeof(arguments[0]) == 'number') {
			for (let i=0;i<4;i++)
				this.m[i].x=this.m[i].y=this.m[i].z=this.m[i].w=arguments[0];
		}
	} else if(arguments.length == 16) {
		let bAllScalar =true;
		for (let i=0;i<16;i++) {
			if (typeof(arguments[i]) != 'number') {
				bAllScalar=false;
				break;
			}
		}
		if (bAllScalar) {
			for (let i=0;i<4;i++) {
				this.m[i].x = arguments[i*4];
				this.m[i].y = arguments[i*4+1];
				this.m[i].z = arguments[i*4+2];
				this.m[i].w = arguments[i*4+3];
			}
		}
	}
}

Matrix.prototype = {};

Matrix.prototype.row = function(index) {
	return this.m[index];
}
Matrix.prototype.col = function(index) {
	return new Vector4(this.m[0].get(index),this.m[1].get(index),this.m[2].get(index),this.m[3].get(index));
}
Matrix.prototype.arr = function() {
	return new Float32Array([this.m[0].x,this.m[0].y,this.m[0].z,this.m[0].w,
		this.m[1].x,this.m[1].y,this.m[1].z,this.m[1].w,
		this.m[2].x,this.m[2].y,this.m[2].z,this.m[2].w,
		this.m[3].x,this.m[3].y,this.m[3].z,this.m[3].w]);
}
Matrix.identity = function() {
	let ret = new Matrix();
	for (let i=0;i<4;i++)
		ret.m[i].set(i,1);
	return ret;
}

Matrix.prototype.add = function(other) {
	let ret = new Matrix();
	if (other instanceof Matrix) {
		for (let i=0;i<4;i++) {
			ret.m[i] = this.m[i].add(other.m[i]);
		}
	} else if(typeof(other)=='number') {
		for (let i=0;i<4;i++) {
			ret.m[i] = this.m[i].add(other);
		}
	}
	return ret;
}
Matrix.prototype.sub = function(other) {
	let ret = new Matrix();
	if (other instanceof Matrix) {
		for (let i=0;i<4;i++) {
			ret.m[i] = this.m[i].sub(other.m[i]);
		}
	} else if(typeof(other)=='number') {
		for (let i=0;i<4;i++) {
			ret.m[i] = this.m[i].sub(other);
		}
	}
	return ret;
}
Matrix.prototype.mul = function(other) {
	let ret = new Matrix();
	if (typeof(other) == 'number' ||
		other instanceof Matrix) {
		for (let i=0;i<4;i++) {
			ret.m[i] = this.m[i].mul(other);
		}
	}
	return ret;
}

Matrix.prototype.transpose = function() {
	let ret = new Matrix();
	for (let i=0;i<4;i++) 
		ret.m[i] = this.col(i);
	return ret;
}
Matrix.prototype.transformPos = function(pos) {
	let ret4 = (new Vector4(pos.x,pos.y,pos.z,1)).mul(this);
	return new Vector(ret4.x/ret4.w,ret4.y/ret4.w,ret4.z/ret4.w);
}
Matrix.prototype.transformVec = function(vec) {
	let ret4 = (new Vector4(vec.x,vec.y,vec.z,0)).mul(this);
	return new Vector(ret4.x,ret4.y,ret4.z);
}
Matrix.prototype.mat3=function(i,j) {
	if (i==undefined && j==undefined) {
		i = j = 3;
	}
	let ii=0, jj=0;
	let nexti =()=>{
		if (ii==i)
			++ii;
		return ii++;
	}
	let nextj =()=>{
		if (jj==j)
			++jj;
		return jj++;
	}	
	let ret = new Matrix3();
	for (let _i=0;_i<3;_i++) {
		let ni=nexti();
		for (let _j=0;_j<3;_j++) {
			let nj=nextj();
			ret.m[_i].set(_j,this.m[ni].get(nj));
		}
		jj=0;
	}
	return ret;
}

Matrix.prototype.det = function() {
	let ret = 0;
	for (let i=0;i<4;i++) {
		ret += this.m[0].get(i)*(this.mat3(0,i).det())*Math.pow(-1,i);
	}
	return ret;
}

Matrix.prototype.inverse=function() {
	let invd = 1/this.det();
	let ret = new Matrix();
	for (let i=0;i<4;i++)
		for (let j=0;j<4;j++)
			ret.m[j].set(i,this.mat3(i,j).det()*Math.pow(-1,i+j)*invd);
	return ret;
}

function scale(s) {
	let ret = Matrix.identity();
	if (typeof(s)=='number') {
		for (let i=0;i<3;i++)
			ret.m[i].set(i,s);
	} else if(s instanceof Vector4) {
		for (let i=0;i<3;i++)
			ret.m[i].set(i,s.get(i));
	}
	return ret;
}

function translate(v) {
	let ret = Matrix.identity();
	for (let i=0;i<3;i++)
		ret.m[3].set(i,v.get(i));
	return ret;
}

function rotateX(a) {
	let c = Math.cos(a);
	let s = Math.sin(a);
	return new Matrix(1, 0, 0, 0,
					   0, c, s, 0,
					   0, -s, c, 0,
						0, 0, 0, 1);
}
function rotateY(a) {
	let c = Math.cos(a);
	let s = Math.sin(a);
	return new Matrix(c, 0, -s, 0,
					   0, 1, 0, 0,
					   s, 0, c, 0,
						0, 0, 0, 1);
}
function rotateZ(a) {
	let c = Math.cos(a);
	let s = Math.sin(a);
	return new Matrix(c, s, 0, 0,
					   -s, c, 0, 0,
						0, 0, 1, 0,
						0, 0, 0, 1);
}

function rotateAxisAngle(a, u) {
	let c = Math.cos(a);
	let s = Math.sin(a);
	let invc = 1-c;
	return new Matrix(invc*u.x*u.x+c, invc*u.x*u.y-s*u.z, invc*u.x*u.z+s*u.y, 0,
						invc*u.x*u.y+s*u.z, invc*u.y*u.y+c, invc*u.y*u.z - s*u.x, 0,
						invc*u.x*u.z-s*u.y, invc*u.y*u.z+s*u.x, invc*u.z*u.z+c, 0,
						0, 0, 0, 1);
}

// 右手系， z=-1 look位置 ndc[-1,1]
function lookAt(eye, pos, up) {
	let look = pos.sub(eye).normalized();
	let right = look.cross(up).normalized();
	up = right.cross(look);
	return new Matrix(right.x, up.x, -look.x, 0,
					right.y, up.y, -look.y, 0,
					right.z, up.z, -look.z, 0,
					-eye.dot(right), -eye.dot(up), eye.dot(look), 1);
}

function perspective(fov, aspect, n, f) {
	let t = Math.tan(fov/2);
	return new Matrix(1/t/aspect, 0, 0, 0,
						0, 1/t, 0, 0,
						0, 0, (f+n)/(n-f), -1,
						0, 0, 2*f*n/(n-f), 0);
}

function Matrix3() {
	this.m=[];
	for (let i=0;i<3;i++) 
		this.m[i]= new Vector();
	if (arguments.length == 3) {
		let bAllVector =true;
		for (let i=0;i<3;i++) {
			if (!arguments[i] instanceof Vector) {
				bAllVector=false;
				break;
			}
		}
		if (bAllVector) {
			for (let i=0;i<3;i++) 
				this.m[i]= arguments[i].clone();
		}
	} else if(arguments.length==1) {
		if (arguments[0] instanceof Vector) {
			for (let i=0;i<3;i++) 
				this.m[i]= arguments[0].clone();
		} else if (typeof(arguments[0]) == 'number') {
			for (let i=0;i<3;i++)
				this.m[i].x=this.m[i].y=this.m[i].z=arguments[0];
		}
	} else if(arguments.length == 9) {
		let bAllScalar =true;
		for (let i=0;i<9;i++) {
			if (typeof(arguments[i]) != 'number') {
				bAllScalar=false;
				break;
			}
		}
		if (bAllScalar) {
			for (let i=0;i<3;i++) {
				this.m[i].x = arguments[i*3];
				this.m[i].y = arguments[i*3+1];
				this.m[i].z = arguments[i*3+2];
			}
		}
	}
}

Matrix3.prototype = {};

Matrix3.prototype.row = function(index) {
	return this.m[index];
}
Matrix3.prototype.col = function(index) {
	return new Vector(this.m[0].get(index),this.m[1].get(index),this.m[2].get(index));
}
Matrix3.prototype.arr = function() {
	return new Float32Array([this.m[0].x,this.m[0].y,this.m[0].z,
		this.m[1].x,this.m[1].y,this.m[1].z,
		this.m[2].x,this.m[2].y,this.m[2].z]);
}
Matrix3.identity = function() {
	let ret = new Matrix3();
	for (let i=0;i<3;i++)
		ret.m[i].set(i,1);
	return ret;
}
Matrix3.prototype.add = function(other) {
	let ret = new Matrix3();
	if (other instanceof Matrix3) {
		for (let i=0;i<3;i++) {
			ret.m[i] = this.m[i].add(other.m[i]);
		}
	} else if(typeof(other)=='number') {
		for (let i=0;i<3;i++) {
			ret.m[i] = this.m[i].add(other);
		}
	}
	return ret;
}
Matrix3.prototype.sub = function(other) {
	let ret = new Matrix3();
	if (other instanceof Matrix3) {
		for (let i=0;i<3;i++) {
			ret.m[i] = this.m[i].sub(other.m[i]);
		}
	} else if(typeof(other)=='number') {
		for (let i=0;i<3;i++) {
			ret.m[i] = this.m[i].sub(other);
		}
	}
	return ret;
}
Matrix3.prototype.mul = function(other) {
	let ret = new Matrix3();
	if (typeof(other) == 'number' ||
		other instanceof Matrix3) {
		for (let i=0;i<3;i++) {
			ret.m[i] = this.m[i].mul(other);
		}
	} 
	return ret;
}

Matrix3.prototype.det = function() {
	return this.m[0].cross(this.m[1]).dot(this.m[2]);
}


Matrix3.prototype.inverse=function() {
	let invd = 1.0/this.det();
	let ret = new Matrix();
	for (let i=0;i<3;i++)
		for(let j=0;j<3;j++)
			ret.m[j].set(i,(this.m[(i+1)%3].get((j+1)%3)*this.m[(i+2)%3].get((j+2)%3)-this.m[(i+2)%3].get((j+1)%3)*this.m[(i+1)%3].get((j+2)%3))*invd);
	return ret;
}

Matrix3.prototype.toEuler = function() {
	let pitch = -Math.asin(this.m[2].y);
	let cospitch = Math.cos(pitch);
	let yaw = Math.acos(this.m[2].z/cospitch);
	let roll = Math.acos(this.m[1].y/cospitch);
	return new Vector(pitch, yaw, roll);
}

Matrix3.prototype.transpose = function() {
	let ret = new Matrix3();
	for (let i=0;i<3;i++) 
		ret.m[i] = this.col(i);
	return ret;
}

Matrix3.prototype.transform = function(p) {
	return p.mul(this);
}

Matrix3.prototype.mat4 = function() {
	let ret = new Matrix();
	for (let i=0;i<3;i++)
		for (let j=0;j<3;j++)
			ret.m[i].set(j,this.m[i].get(j));
	return ret;
}

function scale3(s) {
	let ret = Matrix3.identity();
	if (typeof(s)=='number') {
		for (let i=0;i<3;i++)
			ret.m[i].set(i,s);
	} else if(s instanceof Vector) {
		for (let i=0;i<3;i++)
			ret.m[i].set(i,s.get(i));
	}
	return ret;
}
function rotateX3(a) {
	let c = Math.cos(a);
	let s = Math.sin(a);
	return new Matrix3(1, 0, 0,
					   0, c, s,
					   0, -s, c);
}
function rotateY3(a) {
	let c = Math.cos(a);
	let s = Math.sin(a);
	return new Matrix3(c, 0, -s,
					   0, 1, 0,
					   s, 0, c);
}
function rotateZ3(a) {
	let c = Math.cos(a);
	let s = Math.sin(a);
	return new Matrix3(c, s, 0,
					   -s, c, 0,
						0, 0, 1);
}

function rotateAxisAngle3(a, u) {
	let c = Math.cos(a);
	let s = Math.sin(a);
	let invc = 1-c;
	return new Matrix3(invc*u.x*u.x+c, invc*u.x*u.y-s*u.z, invc*u.x*u.z+s*u.y,
						invc*u.x*u.y+s*u.z, invc*u.y*u.y+c, invc*u.y*u.z - s*u.x,
						inc*u.x*u.z-s*u.y, invc*u.y*u.z+s*u.x, invc*u.z*u.z+c);
}
function fromEuler(eu) {
	return rotateZ3(eu.z).mul(rotateX3(eu.x)).mul(rotateY3(eu.y));
}

function Quat() {
	if (arguments.length==0)
		this.x=this.y=this.z=this.w=0;
	else if(arguments.length==2) {
		if (typeof(arguments[0]) == 'number' &&
			arguments[1] instanceof Vector) {
			this.w = arguments[0];
			this.x = arguments[1].x;
			this.y = arguments[1].y;
			this.z = arguments[1].z;
		}
	} else if (arguments.length == 1 && arguments[0] instanceof Vector4) {
		this.x = arguments[0].x;
		this.y = arguments[0].y;
		this.z = arguments[0].z;
		this.w = arguments[0].w;
	} else if (arguments.length == 4) {
		this.x = arguments[0];
		this.y = arguments[1];
		this.z = arguments[2];
		this.w = arguments[3];
	}
	
}
Quat.prototype = {};

Quat.prototype.add = function(other) {
	let ret = new Quat();
	ret.x=this.x+other.x;
	ret.y=this.y+other.y;
	ret.z=this.z+other.z;
	ret.w=this.w+other.w;
	return ret;
}
Quat.prototype.sub = function(other) {
	let ret = new Quat();
	ret.x=this.x-other.x;
	ret.y=this.y-other.y;
	ret.z=this.z-other.z;
	ret.w=this.w-other.w;
	return ret;
}
Quat.prototype.mul = function(other) {
	if (typeof(other) == 'number') {
		return new Quat(this.x*other,this.y*other,this.z*other,this.w*other);
	} else if(other instanceof Quat) {
		let ret = new Quat;
		ret.x = this.w *other.x+this.x*other.w+this.y*other.z-this.z*other.y;
		ret.y = this.w*other.y+this.y*owhter.w-this.x*other.z+this.z*other.x;
		ret.z = this.w*other.z+this.z*other.w+this.x*other.y-this.y-other.x;
		ret.w = this.w*other.w-this.x*other.x-this.y*other.y-this.z*other.z;
		return ret;
	}
}
Quat.prototype.length = function() {
	return Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
}
Quat.prototype.lengthSquared = function() {
	return this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z;
}
Quat.prototype.normalized=function() {
    let length = this.length();
    let ret = new Quat();
    ret.w = this.w / length;
    ret.x = this.x / length;
    ret.y = this.y / length;
    ret.z = this.z / length;
    return ret;
}

Quat.prototype.conj = function() {
	let ret = new Quat();
	ret.x = -this.x;
	ret.y = -this.y;
	ret.z = -this.z;
	ret.w = this.w;
	return ret;
}
Quat.prototype.inverse = function() {
	return this.conj().mul(1/this.lengthSquared());
}
Quat.prototype.dot = function(other) {
	if (other instanceof Quat) {
		return this.x*other.x+this.y*other.y+this.z*other.z+this.w*other.w; 
	}
}
Quat.prototype.rotate=function(v) {
	let vq = Quat(0,v);
	let vqp =this.mul(vq).mul(this.conj());
	return new Vector(vqp.x,vqp.y,vqp.z);
}

Quat.prototype.slerp=function(q,t) {
	let theta = Math.acos(this.dot(q));
	let s = Math.sin(theta);
	let p1=this.mul(Math.sin((1-t)*theta)/s);
	let p2 =  q.mul(Math.sin(t*theta)/s)
	return p1.add(p2);
}
Quat.prototype.lerp=function(q,t) {
	let d = q.sub(this);
	return this.add(d.mul(t));
}
Quat.fromAxisAngle = function(theta, u) {
	let ht = theta/2;
	return new Quat(Math.cos(ht), u.mul(Math.sin(ht)));
}
Quat.prototype.toAxisAngle = function() {
	let ht = Math.acos(this.w);
	let s =  Math.sin(ht);
	if (s != 0) {
		let u = (new Vector(this.x, this.y, this.z)).div(s);
		return {theta:ht*2,u};
	} else {
		return {theta:ht*2,u:new Vector(0,1,0)};
	}
}