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

        ctx.fillStyle = "rgba(250, 250, 250, 1.0)";
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

function switchSection(section) {
    if(section == 'projects') {
        $('#projects').fadeTo(100,0.9);
        $('#resume').fadeOut(100);
        $('#samples').fadeOut(100);

        $('#nav_projects').addClass("highlight");
        $('#nav_resume').removeClass('highlight');
        $('#nav_samples').removeClass('highlight');
    } else if(section == 'resume') {
        $('#projects').fadeOut(100);
        $('#resume').fadeTo(100,0.9);
        $('#samples').fadeOut(100);

        $('#nav_projects').removeClass('highlight');
        $('#nav_resume').addClass("highlight");
        $('#nav_samples').removeClass('highlight');
    } else if(section == 'samples') {
        $('#projects').fadeOut(100);
        $('#resume').fadeOut(100);
        $('#samples').fadeTo(100,0.9);

        $('#nav_projects').removeClass('highlight');
        $('#nav_resume').removeClass('highlight');
        $('#nav_samples').addClass("highlight");
    }
}