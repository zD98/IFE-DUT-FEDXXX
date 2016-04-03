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
    var view = Matrix.lookAt([0,10,-10],[0,0,0],[0,1,0]);
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

