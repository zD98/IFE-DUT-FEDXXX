/**
 * Created by zd98 on 2016/3/26.
 */
function Vector(x,y,z) {
  this.x = x||0;
  this.y = y||0;
  this.z = z||0;
}

Vector.prototype.normalize = function(){
  var x = this.x,y = this.y,z= this.z;
  var len = Math.sqrt(x*x+y*y+z*z);
  this.x = x/len;
  this.y = y/len;
  this.z = z/len;
  return this;
};

Vector.prototype.cross = function(vector){
  var nV = new Vector();
  nV.x = this.y*vector.z - this.z*vector.y;
  nV.y = this.z*vector.x - this.x*vector.z;
  nV.z = this.x*vector.y - this.y*vector.x;
  return nV;
};

Vector.prototype.dot = function(vector){
  
};

Vector.prototype.sub = function(vector){
  var nV = new Vector();
  nV.x = this.x - vector.x;
  nV.y = this.y - vector.y;
  nV.z = this.z - vector.z;
  return nV;
};

Vector.prototype.add = function (vector) {
  var nV = new Vector();
  nV.x = this.x - vector.x;
  nV.y = this.y - vector.y;
  nV.z = this.z - vector.z;
  return nV;
};

Vector.prototype.arraylize = function(){
  return [this.x,this.y,this.z];
};

Vector.toArray = function(){
  var result = [];

  for(var i = 0,len = arguments.length;i<len;i++){
    if(arguments[i] instanceof Vector){
      var a = arguments[i].arraylize();
      result = result.concat(a);
    }
  }
  return result;
};
/**
 * Created by zd98 on 2016/3/25.
 */

function Matrix(matrix){
  if(matrix==undefined||Object.prototype.toString.call(matrix) !== '[object Array]'){
    matrix = [
      1,0,0,0,
      0,1,0,0,
      0,0,1,0,
      0,0,0,1
    ];
  }
  this.matrix = matrix;
}

Matrix.prototype.transform = function(){
  let matrix = this.matrix;
  return [
    matrix[0],matrix[4],matrix[8],matrix[12],
    matrix[1],matrix[5],matrix[9],matrix[13],
    matrix[2],matrix[6],matrix[10],matrix[14],
    matrix[3],matrix[7],matrix[11],matrix[15]
  ];
};
Matrix.prototype.translate = function(){
  var mat = this.matrix;
  var dist = [];
  for(let i = 0;i<12;i++){
    dist[i] = mat[i];
  }
  dist[12] = mat[0] * vec3[0] + mat[4] * vec3[1] + mat[8]  * vec3[2] + mat[12];
  dist[13] = mat[1] * vec3[0] + mat[5] * vec3[1] + mat[9]  * vec3[2] + mat[13];
  dist[14] = mat[2] * vec3[0] + mat[6] * vec3[1] + mat[10] * vec3[2] + mat[14];
  dist[15] = mat[3] * vec3[0] + mat[7] * vec3[1] + mat[11] * vec3[2] + mat[15];
  return dist
};
Matrix.prototype.multiply = function(fol){
  var pre = this.matrix;
  var matrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 0];
  for (var i = 0; i < 16; i++) {
    var value = 0;
    for (var j = 0; j < 4; j++) {
      value += fol[j * 4 + i % 4] * pre[j + 4 * Math.floor((i / 4))];
    }
    matrix[i] = value;
  }
  return matrix;
};
Matrix.prototype.scale =  function (vec3){
  var dist = [], mat = this.matrix;
  for(let i = 0;i<12;i++){
    dist[i] = mat[i]*vec3(i/3);
  }
  for(let i = 12;i<16;i++){
    dist[i] = mat[i];
  }
  return this.matrix = dist;
};
Matrix.prototype.inverse = function(){
  var dist = [];mat = this.matrix;
  var a = mat[0],  b = mat[1],  c = mat[2],  d = mat[3],
    e = mat[4],  f = mat[5],  g = mat[6],  h = mat[7],
    i = mat[8],  j = mat[9],  k = mat[10], l = mat[11],
    m = mat[12], n = mat[13], o = mat[14], p = mat[15],
    q = a * f - b * e, r = a * g - c * e,
    s = a * h - d * e, t = b * g - c * f,
    u = b * h - d * f, v = c * h - d * g,
    w = i * n - j * m, x = i * o - k * m,
    y = i * p - l * m, z = j * o - k * n,
    A = j * p - l * n, B = k * p - l * o,
    ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
  dist[0]  = ( f * B - g * A + h * z) * ivd;
  dist[1]  = (-b * B + c * A - d * z) * ivd;
  dist[2]  = ( n * v - o * u + p * t) * ivd;
  dist[3]  = (-j * v + k * u - l * t) * ivd;
  dist[4]  = (-e * B + g * y - h * x) * ivd;
  dist[5]  = ( a * B - c * y + d * x) * ivd;
  dist[6]  = (-m * v + o * s - p * r) * ivd;
  dist[7]  = ( i * v - k * s + l * r) * ivd;
  dist[8]  = ( e * A - f * y + h * w) * ivd;
  dist[9]  = (-a * A + b * y - d * w) * ivd;
  dist[10] = ( m * u - n * s + p * q) * ivd;
  dist[11] = (-i * u + j * s - l * q) * ivd;
  dist[12] = (-e * z + f * x - g * w) * ivd;
  dist[13] = ( a * z - b * x + c * w) * ivd;
  dist[14] = (-m * t + n * r - o * q) * ivd;
  dist[15] = ( i * t - j * r + k * q) * ivd;
  return this.matrix = dist;
};
Matrix.prototype.rotate = function( angle, axis){
  var dist,mat = this.matrix  ;
  var sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
  if(!sq){return [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];}
  var a = axis[0]/sq,b = axis[1]/sq,c = axis[2]/sq;
  var tc = Math.cos(angle); var ts = Math.sin(angle);
  var r = [
    a*a*(1-tc)+tc, a*b*(1-tc)+c*ts, a*c*(1-tc)-b*ts,0,
    a*b*(1-tc)-c*ts,b*b*(1-tc) +tc,b*c*(1-tc)+a*ts,0,
    a*c*(1-tc)+b*ts,b*c*(1-tc) - a*ts,c*c*(1-tc)+tc,0,
    0,0,0,1
  ];
  console.log(mat);
  dist = Matrix.multiply(r, mat);
  return this.matrix = dist;

};

Matrix.transform = function(matrix){
  return [
    matrix[0],matrix[4],matrix[8],matrix[12],
    matrix[1],matrix[5],matrix[9],matrix[13],
    matrix[2],matrix[6],matrix[10],matrix[14],
    matrix[3],matrix[7],matrix[11],matrix[15]
  ];
};
Matrix.multiply  = function(pre, fol){
  var matrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 0];
  for (var i = 0; i < 16; i++) {
    var value = 0;
    for (var j = 0; j < 4; j++) {
      value += fol[j * 4 + i % 4] * pre[j + 4 * Math.floor((i / 4))];
    }
    matrix[i] = value;
  }
  return matrix;
};
Matrix.scale = function (mat, vec3){
    var dist = [];
    for(let i = 0;i<12;i++){
      dist[i] = mat[i]*vec3(i/3);
    }
    for(let i = 12;i<16;i++){
      dist[i] = mat[i];
    }
    return dist;
};
Matrix.rotate = function(mat, angle, axis){
  var dist  ;
  var sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
  if(!sq){return [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];}
  var a = axis[0]/sq,b = axis[1]/sq,c = axis[2]/sq;
  var tc = Math.cos(angle); var ts = Math.sin(angle);
  var r = [
    a*a*(1-tc)+tc, a*b*(1-tc)+c*ts, a*c*(1-tc)-b*ts,0,
    a*b*(1-tc)-c*ts,b*b*(1-tc) +tc,b*c*(1-tc)+a*ts,0, 
    a*c*(1-tc)+b*ts,b*c*(1-tc) - a*ts,c*c*(1-tc)+tc,0,
    0,0,0,1
  ];
  dist = Matrix.multiply(r, mat);
  return dist;

};
Matrix.translate = function(mat, vec3){
  var dist = [];
  for(let i = 0;i<16;i++){
    dist[i] = mat[i];
  }
  dist[3] = vec3[0] + mat[12];
  dist[7] = vec3[1] + mat[13];
  dist[11] = vec3[2] + mat[14];
  dist[15] = mat[15];
  return dist
};
Matrix.lookAt = function(eye, center, up){
  eye = new Vector(eye[0],eye[1],eye[2]);
  center = new Vector(center[0],center[1], center[2]);
  up = new Vector(up[0],up[1],up[2]);
  var n = center.sub(eye);
  n.normalize();
  var u = up;
  u.normalize();
  u = u.cross(n);

  var v = n.cross(u);
  var x = -eye.x;
  var y = -eye.y;
  var z = -eye.z;
  var matrix = [
    1,0,0,x,
    0,1,0,y,
    0,0,1,z,
    0,0,0,1
  ];
  return Matrix.multiply([
    u.x,u.y,u.z,0,
    v.x,v.y,v.z,0,
    n.x,n.y,n.z,0,
    0,0,0,1
  ],matrix);
};
Matrix.perspective  =  function(a,width,height,nZ,fZ){
  var matrix = [
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,1,0];
  var tana = Math.tan(a/2.0);
  var ar = width/height;
  var k = (-nZ-fZ)/(nZ-fZ);
  var b = (2*fZ*nZ)/(nZ-fZ);
  matrix[0] = 1/(tana*ar);
  matrix[5] = 1/tana;
  matrix[10] = k;
  matrix[11] = b;
  return matrix;
};
Matrix.inverse = function(mat){
  
  var dist = [];
  var a = mat[0],  b = mat[1],  c = mat[2],  d = mat[3],
    e = mat[4],  f = mat[5],  g = mat[6],  h = mat[7],
    i = mat[8],  j = mat[9],  k = mat[10], l = mat[11],
    m = mat[12], n = mat[13], o = mat[14], p = mat[15],
    q = a * f - b * e, r = a * g - c * e,
    s = a * h - d * e, t = b * g - c * f,
    u = b * h - d * f, v = c * h - d * g,
    w = i * n - j * m, x = i * o - k * m,
    y = i * p - l * m, z = j * o - k * n,
    A = j * p - l * n, B = k * p - l * o,
    ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
  dist[0]  = ( f * B - g * A + h * z) * ivd;
  dist[1]  = (-b * B + c * A - d * z) * ivd;
  dist[2]  = ( n * v - o * u + p * t) * ivd;
  dist[3]  = (-j * v + k * u - l * t) * ivd;
  dist[4]  = (-e * B + g * y - h * x) * ivd;
  dist[5]  = ( a * B - c * y + d * x) * ivd;
  dist[6]  = (-m * v + o * s - p * r) * ivd;
  dist[7]  = ( i * v - k * s + l * r) * ivd;
  dist[8]  = ( e * A - f * y + h * w) * ivd;
  dist[9]  = (-a * A + b * y - d * w) * ivd;
  dist[10] = ( m * u - n * s + p * q) * ivd;
  dist[11] = (-i * u + j * s - l * q) * ivd;
  dist[12] = (-e * z + f * x - g * w) * ivd;
  dist[13] = ( a * z - b * x + c * w) * ivd;
  dist[14] = (-m * t + n * r - o * q) * ivd;
  dist[15] = ( i * t - j * r + k * q) * ivd;
  return dist;
};
/**
 * Created by zd98 on 2016/3/30.
 */
/**
 *
 * @constructor
 */
function Geometry(){
  this.matrix = [
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1
  ]
}

Geometry.prototype.scale = function (vec3){
  var mat = this.matrix;
  return this.matrix;
};
Geometry.prototype.identify = function(){
  this.matrix = [
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1
  ]
};
Geometry.prototype.rotate  = function(angle, axis){
  var mat = this.matrix ;
  var sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
  if(!sq){return [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];}
  var a = axis[0]/sq,b = axis[1]/sq,c = axis[2]/sq;
  var tc = Math.cos(angle); var ts = Math.sin(angle);
  var r = [
    a*a*(1-tc)+tc, a*b*(1-tc)+c*ts, a*c*(1-tc)-b*ts,0,
    a*b*(1-tc)-c*ts,b*b*(1-tc) +tc,b*c*(1-tc)+a*ts,0,
    a*c*(1-tc)+b*ts,b*c*(1-tc) - a*ts,c*c*(1-tc)+tc,0,
    0,0,0,1
  ];
  this.matrix = Matrix.multiply(r, mat);
  return this.matrix;
};
Geometry.prototype.translate = function(vec3){

  var mat = this.matrix;
  mat[3] =vec3[0] + mat[12];
  mat[7] =vec3[1] + mat[13];
  mat[11] =vec3[2] + mat[14];
  return this.matrix = mat;
};

function Sphere(radius, segments){
  this.radius = radius;
  this.segments = segments;
  this.renderInfo = null;
  this.init();
}

Sphere.prototype = new Geometry();
Sphere.prototype.init = function(){
  this.renderInfo = generalSphere(this.radius,this.segments);
};

function Ship (radius, row, column){
  this.radius = radius;
  this.row = row;
  this.column = column;
  this.renderInfo = null;
  this.init();
}
Ship.prototype = new Geometry();
Ship.prototype.init = function(){
  this.renderInfo = generalShip(this.radius,this.row,this.column);
};

function generalSphere(r, segments){
    let pos = [],nor = [], col = [], inx=[];
    for(let i =0 ;i<segments+1;i++){
      //经度
      let a = Math.PI*2/segments*i;

      let ca = Math.cos(a);
      let sa = Math.sin(a);
      for(let j = 0;j<segments+1;j++){
        //纬度
        let b = Math.PI*2/segments*j;
        let cb = Math.cos(b);
        let sb = Math.sin(b);
        let x = r*cb*ca;
        let y = r*sb;
        let z = r*cb*sa;
        pos.push(x,y,z);
        nor.push(cb*ca,sb,cb*sa);
        col.push(0.0,0.0,1.0,1.0);
      }
    }
    //general segments
    for(let i = 0;i<segments;i++){
      for(let j = 0;j<=segments;j++){
        r = i*segments+j;
        inx.push(r,r+segments,r+1);
        inx.push(r+1,r+segments+1,r+segments);
      }
    }
    return [pos,nor,col,inx];
}
function generalShip(r, row, column){
  let pos = [],nor = [],col = [],inx = [];

  let l = row/4;
  let seg = 4*r/row;
  let a,ca,sa,x,y,z;
  for(let i = 0;i<=row;i++){
    //纬度
    if(i<=l) {
      a = -Math.PI / 2 / l * (l - i);

    }else if(i>=3*l){
      a = -Math.PI / 2 / l *i;
    }else{
      a = 0;
    }
    ca = Math.cos(a);
    sa = Math.sin(a);
    y = seg*i + r * sa;

    for(let j = 0;j<=column;j++){
      let b = Math.PI*2/column*j;
      let cb = Math.cos(b);
      let sb = Math.sin(b);
      x = r*cb*ca;
      z = r*sb*ca;
      pos.push(x,y,z);
      nor.push(cb*ca,sa,sb*ca);
      col.push(1.0,0.0,0.0,1.0);
    }
  }

  for(let i =0;i<row;i++){
    for(let j =0;j<column;j++){
      let r = i*column+j;
      inx.push(r,r+1,r+column);
      inx.push(r+1,r+column+1,r+column);
    }
  }

 return [pos,nor,col,inx];
}



/**
 * Created by zd98 on 2016/3/30.
 */
var gl = (function(){

  var zd = function(){
    
    var gl,program,attL = [],attS=[],MVPMatrixLocation,lightDirectionLocation,invMatrixLocation;
    function init(){
      let canvas = document.querySelector('#canvas');
      canvas.width = 480;
      canvas.height = 360;
      gl = canvas.getContext('webgl');
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      let vertexShader = createShader(gl,'vertexShader',gl.VERTEX_SHADER);
      let fragShader = createShader(gl, 'fragmentShader', gl.FRAGMENT_SHADER);
      program = gl.createProgram();
      gl.attachShader(program,vertexShader);
      gl.attachShader(program,fragShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log("Unable to initialize the shader program.");
      }
      
      gl.useProgram(program);
      attL[0] = gl.getAttribLocation(program,"vPosition");
      attL[1] = gl.getAttribLocation(program,"vNormal");
      attL[2] = gl.getAttribLocation(program,"vColor");
      attS = [3,3,4];

      MVPMatrixLocation = gl.getUniformLocation(program,"MVPMatrix");
      invMatrixLocation = gl.getUniformLocation(program,"invMatrix");
      lightDirectionLocation = gl.getUniformLocation(program,"lightDirection")
    }
    init();
    var objects = [];

    var project = Matrix.perspective(Math.PI/2, 400,300,0.1,100);
    var view = Matrix.lookAt([0,20,-20],[0,0,0],[0,1,0]);
    var temp = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
    var pvMatrix = Matrix.multiply(project,view);

    var lightDirection = [0,2,0];

    var count = 0;

    return {
      render:function(){
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        for(let i=0,len = objects.length;i<len;i++){
          //[0] is pos,[1] is nor,[2] is color, [3] is index
          var info = objects[i].renderInfo;
          var vbos = [];
          vbos[0] = createVBO(gl,info[0]);
          vbos[1] = createVBO(gl,info[1]);
          vbos[2] = createVBO(gl,info[2]);
          setAttribute(gl,vbos,attL,attS);
          count++;
          var  m = objects[i].matrix;
          let invMatrix = Matrix.inverse(m);

          gl.uniformMatrix4fv(invMatrixLocation,false,invMatrix);
          gl.uniform3fv(lightDirectionLocation,lightDirection);

          var mvpMatrix = Matrix.multiply(pvMatrix,m);
          mvpMatrix = Matrix.transform(mvpMatrix);
          gl.uniformMatrix4fv(MVPMatrixLocation,false,mvpMatrix);


          var ibo = createIBO(gl,info[3]);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibo);
          gl.drawElements(gl.TRIANGLES,info[3].length,gl.UNSIGNED_SHORT,0);
          gl.flush();

          //requestAnimationFrame(arguments.callee);
        }
      },
      addObject:function(obj){
        objects. push(obj);
      },
      removeObject:function(obj){
        for(let i =0,len = objects.length;i<len;i++){
          if(objects[i] === obj){
            objects.splice(i,1);
            break;
          }
        }
      }
    };
  }();

  function createVBO(gl,data){
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
    return vbo;
  }
  function createIBO(gl,data){
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(data),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);
    return ibo;
  }
  function createProgram(vs, fs){

  }
  function createShader(gl, source, type){
    var shader= gl.createShader(type);
    source = document.getElementById(source).text;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }
  function setAttribute(gl,vbos, attL,attS){
    for(let i =0;i<vbos.length;i++){
      gl.bindBuffer(gl.ARRAY_BUFFER, vbos[i]);
      gl.enableVertexAttribArray(attL[i]);
      gl.vertexAttribPointer(attL[i],attS[i],gl.FLOAT,false,0,0);
    }
  }
  return zd;
})();

