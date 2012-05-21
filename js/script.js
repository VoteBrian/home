var mNoGL = false;
var mCtx;
var mGL;
var mCanvas;
var mShaderProgram;
var mVPBuffer;
var mWidth;
var mHeight;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

function drawBG() {
    drawCircles();
}

function drawSquares() {
    mCanvas = document.getElementById('bg');
    if (mCanvas.getContext) {

        var colors = new Array();
        colors[0] = "#615046";
        colors[1] = "#44503A";
        colors[2] = "#9BA29A";
        colors[3] = "#39455F";
        colors[4] = "#44474E";

        bgClr = "#F4F4F4";

        mWidth = window.innerWidth;
        mHeight = window.innerHeight;

        initGL();
        initShaders();
        initBuffers();

        mGL.clearColor(1.0, 0.0, 0.0, 1.0);
        mGL.enable(mGL.depthTest);

        draw();

        sqrW = Math.ceiling(w/10);
        sqrH = sqrW;

        var squares = new Array();
        for (x=0; x < 10; x++) {
                c
        }
    }
}

function initGL() {
    try{
        mGL = mCanvas.getContext('experimental-webgl')
        mGL.viewportWidth = mWidth;
        mGL.viewportHeight = mHeight;
    } catch(e) {
    }

    if(!mGL) {
        mNoGL = true;
        alert("Your browser doesn't support WebGL.  :(");
    }
}

function initShaders() {
    var fragmentShader = getShader(mGL, "shader-fs");
    var vertexShader = getShader(mGL, "shader-vs");

    mShaderProgram = mGL.createProgram();
    mGL.attachShader(mShaderProgram, vertexShader);
    mGL.attachShader(mShaderProgram, fragmentShader);
    mGL.linkProgram(mShaderProgram);

    if (!mGL.getProgramParameter(mShaderProgram, mGL.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    mGL.useProgram(mShaderProgram);

    mShaderProgram.vertexPositionAttribute = mGL.getAttribLocation(mShaderProgram, "aVertexPosition");
    mGL.enableVertexAttribArray(mShaderProgram.vertexPositionAttribute);

    mShaderProgram.pMatrixUniform = mGL.getUniformLocation(mShaderProgram, "uPMatrix");
    mShaderProgram.mvMatrixUniform = mGL.getUniformLocation(mShaderProgram, "uMVMatrix");
}

function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function initBuffers() {
    mVPBuffer = mGL.createBuffer();
    mGL.bindBuffer(mGL.ARRAY_BUFFER, mVPBuffer);
    var vertices = [
         0.0,  1.0,  0.0,
        -1.0, -1.0,  0.0,
         1.0, -1.0,  0.0
    ];
    mGL.bufferData(mGL.ARRAY_BUFFER, new Float32Array(vertices), mGL.STATIC_DRAW);
    mVPBuffer.itemSize = 3;
    mVPBuffer.numItems = 3;
}

function draw() {
    mGL.viewport(0, 0, mGL.viewportWidth, mGL.viewportHeight);
    mGL.clear(mGL.COLOR_BUFFER_BIT | mGL.DEPTH_BUFFER_BIT);

    mat4.perspective(45, mGL.viewportWidth / mGL.viewportHeight, 0.1, 100.0, pMatrix);

    mat4.identity(mvMatrix);

    mat4.translate(mvMatrix, [-1.5, 0.0, -7.0]);
    mGL.bindBuffer(mGL.ARRAY_BUFFER, mVPBuffer);
    mGL.vertexAttribPointer(shaderProgram.vertexPositionAttribute, mVPBuffer.itemSize, mGL.FLOAT, false, 0, 0);
    setMatrixUniforms();
    mGL.drawArrays(mGL.TRIANGLES, 0, mVPBuffer.numItems);
}

function drawCircles() {
    var bgCanvas = document.getElementById('bg');
    if(bgCanvas.getContext) {
        var ctx = bgCanvas.getContext('2d');

        var colors = new Array();
        colors[0] = "#615046";
        colors[1] = "#44503A";
        colors[2] = "#9BA29A";
        colors[3] = "#39455F";
        colors[4] = "#44474E";

        bgClr = "#F4F4F4";

        w = window.innerWidth;
        h = window.innerHeight;

        ctx.canvas.width = w;
        ctx.canvas.height = h;

        ctx.fillStyle = "rgba(244, 244, 244, 1.0)";
        ctx.fillRect(0, 0, w, h);

        cntX = 0;
        cntY = 0;
        rad = 0;

        for(x=0; x < 50; x++) {
            prvX = cntX;
            prvY = cntY;
            prvR = rad;

            if(Math.floor(Math.random()*2)) {
                signX = 1;
            } else signX = -1;

            if(Math.floor(Math.random()*2)) {
                signY = 1;
            } else signY = -1;

            rad = Math.floor(Math.random()*150)+20;
            maxDev = rad+prvR;

            cntX = prvX + (signX * Math.floor(Math.random()*maxDev));
            if(cntX < 0) {
                cntX = 0;
            } else if(cntX > w) {
                cntX = w;
            }
            cntY = prvY + (signY * Math.floor(Math.random()*maxDev));
            if(cntY < 0) {
                cntY = 0;
            } else if(cntY > h) {
                cntY = h;
            }
            clr = colors[Math.floor(Math.random()*5)];

            ctx.beginPath();
            ctx.arc(cntX, cntY, rad, 0, 2* Math.PI, false);
            ctx.fillStyle=clr;
            ctx.fill();
            ctx.lineWidth=5;
            ctx.strokeStyle=bgClr;
            ctx.stroke();
        }
    }
}