function drawBG() {
    var bgCanvas = document.getElementById('bg');
    if(bgCanvas.getContext) {
        var ctx = bgCanvas.getContext('2d');

        w = window.innerWidth;
        h = window.innerHeight;

        ctx.canvas.width = w;
        ctx.canvas.height = h;

        ctx.fillStyle = "rgba(244, 244, 244, 1.0)";
        ctx.fillRect(0, 0, w, h);

        var gradTL = ctx.createRadialGradient(0,0,0, 0,0,h);
        gradTL.addColorStop(0, 'rgba(131, 148, 172, 0.75)');
        gradTL.addColorStop(1, 'rgba(244, 244, 244, 0)');
        ctx.fillStyle = gradTL;
        ctx.fillRect(0, 0, w, h);

        var gradBR = ctx.createRadialGradient(w,0,0, w,0,h);
        gradBR.addColorStop(0, 'rgba(131, 148, 172, 0.75)');
        gradBR.addColorStop(1, 'rgba(244, 244, 244, 0)');
        ctx.fillStyle = gradBR;
        ctx.fillRect(0, 0, w, h);
    }
}