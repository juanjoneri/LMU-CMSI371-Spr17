(() => {
    let canvas = $("#canvas")[0];
    let renderingContext = canvas.getContext("2d");

    // This is effectively a visual tester, so we just lay out our variables without much structure.
    let bb8x = 0;
    let bb8y = canvas.height / 2;
    let headTurn = 0;
    let bodyTurn = 0;
    let tardisX = canvas.width;
    let tardisY = 200;
    let tardisScale = 1.0;
    let decimalDoorOpen = 0.0;

    const FRAME_DURATION = 30; // In milliseconds.

    let lastTimestamp = 0;
    let drawFrame = (timestamp) => {
        lastTimestamp = lastTimestamp || timestamp;
        if (timestamp - lastTimestamp < FRAME_DURATION) {
            window.requestAnimationFrame(drawFrame);
            return;
        }

        lastTimestamp = timestamp;

        renderingContext.clearRect(0, 0, canvas.width, canvas.height);

        renderingContext.save();
        renderingContext.translate(tardisX, tardisY);
        renderingContext.scale(tardisScale, tardisScale);
        SampleSpriteLibrary.tardis({
            renderingContext,
            decimalDoorOpen
        });
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(bb8x, bb8y);
        SampleSpriteLibrary.bb8({
            renderingContext,
            headTurn,
            bodyTurn
        });
        renderingContext.restore();

        // Totally repetitive, arbitrary, magic-numbered, just-show-it-works variable update code.
        bb8x += 10;
        if (bb8x > canvas.width) {
            bb8x = 0;
        }
        bodyTurn += 100;
        headTurn -= 3;
        if (headTurn < -100) {
            headTurn = 30;
        }

        tardisX -= 0.5;
        tardisScale *= 1.001;
        decimalDoorOpen += 0.001;

        window.requestAnimationFrame(drawFrame);
    };

    window.requestAnimationFrame(drawFrame);
})();
