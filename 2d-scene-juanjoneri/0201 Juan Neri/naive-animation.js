(() => {
    let canvas = $("#canvas")[0];
    let ctx = canvas.getContext("2d");

    // Parameters for drawing eva!
    let evaX = 800;
    let evaY = 420;
    let evaHeight = 200;
    let evaFaceA = -10;
    let evaRAA = 240;
    let evaLAA = 0;
    let evaBodyA = 0;

    // Parameters for clock
    let clockColor = '#03A9F4';
    let clockX = 150;
    let clockY = 150;
    let clockR = 100;
    let clockHr = 12;
    let clockMin = 30;
    let clockSec = 45;

    // Parameters for walle
    let walleX = 300;
    let walleY = 500;
    let walleHeight = 200;
    let walleREA = 0;
    let walleLEA = 0;
    let walleRHA = 0;
    let walleLHA = 0;

    let r = 0; g = 0; b = 0;

    const FRAME_DURATION = 30; // In milliseconds.
    const ANIMATE = true;

    let lastTimestamp = 0;
    let drawFrame = (timestamp) => {
        lastTimestamp = lastTimestamp || timestamp;
        if (timestamp - lastTimestamp < FRAME_DURATION) {
            window.requestAnimationFrame(drawFrame);
            return;
        }

        lastTimestamp = timestamp;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw eva with new characteristics
        SampleSpriteLibrary.clock({ctx, clockColor, clockX, clockY, clockR, clockHr, clockMin, clockSec});
        SampleSpriteLibrary.eva({ctx, evaX, evaY, evaHeight, evaFaceA, evaBodyA, evaRAA, evaLAA});
        SampleSpriteLibrary.walle({ctx, walleX, walleY, walleHeight, walleREA, walleLEA, walleRHA, walleLHA});

        // EVA

        evaBodyA ++;
        if (evaBodyA > 20) evaBodyA = -20;

        evaFaceA ++;
        if (evaFaceA > 20) evaFaceA = -20;

        evaRAA ++;
        if (evaRAA > 180) evaRAA = 0;
        evaLAA --;
        if (evaLAA < 0) evaLAA = 180;

        //WALLE
        walleREA += 0.005;
        if (walleREA > Math.PI/6) walleREA = -Math.PI/6;
        walleLEA += 0.005;
        if (walleLEA > Math.PI/6) walleLEA = -Math.PI/6;

        walleRHA +=.5;
        if (walleRHA > 30) walleRHA = -20;

        walleLHA -=.5;
        if (walleLHA < -20) walleLHA = 30;

        // CLOCK
        var now = new Date();
        clockSec = now.getSeconds();
        clockMin = now.getMinutes();
        clockHr  = now.getHours();

        r += 1;
        g += 5;
        b += 10;

        clockColor = 'rgb('+ r%255 + ','+ g%255 + ','+ b%255 + ')';


        if (ANIMATE) window.requestAnimationFrame(drawFrame);
    };

    window.requestAnimationFrame(drawFrame);
})();
