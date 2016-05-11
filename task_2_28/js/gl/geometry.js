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


