/**
 * Created by zd98 on 2016/3/30.
 */
function Sphere(radius, segments){
  this.radius = radius;
  this.segments = segments;
  this.renderInfo = null;
  this.init();
}

Sphere.prototype = {
  constructor:Sphere,
  init:function(){
    this.renderInfo = generalSphere(this.radius, this.segments);
  }
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

function generalShip(){

  

}


