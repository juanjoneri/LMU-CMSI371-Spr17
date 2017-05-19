// Sprite contributed by Ed Seim.
(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    const BOX_HEIGHT = 175;
    const BOX_WIDTH = 100;
    const BOX_TRIANGLE_HEIGHT = 12;
    const LIGHT_HEIGHT = 14;
    const LIGHT_WIDTH = 9;
    const LIGHT_BORDER = 2;
    const BOX_BORDER = 10;

    let drawTriangleTop = (renderingContext) => {
        renderingContext.save();
        let topWidth = LIGHT_WIDTH + (LIGHT_BORDER * 2);
        let startTopLeft = (BOX_WIDTH / 2) - (topWidth / 2);

        renderingContext.fillStyle = '#003563';
        renderingContext.beginPath();
        renderingContext.moveTo(0, 0);
        renderingContext.lineTo(startTopLeft, -BOX_TRIANGLE_HEIGHT);
        renderingContext.lineTo(startTopLeft + topWidth, -BOX_TRIANGLE_HEIGHT);
        renderingContext.lineTo(BOX_WIDTH, 0);
        renderingContext.closePath();
        renderingContext.fill();

        renderingContext.restore();
    };

    let drawDoor = (renderingContext, isLeft, decimalOpen) => {
        renderingContext.save();
        let doorHeight = BOX_HEIGHT - (BOX_BORDER * 2);
        let innerDoorHeightDelta = decimalOpen * 5;
        let doorWidth = (1 - decimalOpen) * ((isLeft ?
            (BOX_WIDTH - (BOX_BORDER * 2)) :
            -(BOX_WIDTH - (BOX_BORDER * 2))) / 2);

        renderingContext.fillStyle = '#002F58';
        renderingContext.beginPath();
        renderingContext.moveTo(0, 0);
        renderingContext.lineTo(doorWidth, innerDoorHeightDelta);
        renderingContext.lineTo(doorWidth, doorHeight - (innerDoorHeightDelta * 2));
        renderingContext.lineTo(0, doorHeight);
        renderingContext.closePath();
        renderingContext.fill();

        renderingContext.restore();
    };

    let drawRect = (renderingContext, tx, ty, color, width, height) => {
        renderingContext.save();
        renderingContext.translate(tx, ty);
        renderingContext.fillStyle = color;
        renderingContext.fillRect(0, 0, width, height);
        renderingContext.restore();
    };

    let drawLight = (renderingContext) => {
        renderingContext.save();

        // Yellow
        drawRect(renderingContext,
            -LIGHT_WIDTH / 2,
            -LIGHT_HEIGHT,
            '#FFFF7F',
            LIGHT_WIDTH,
            LIGHT_HEIGHT
        );

        // Left Bar
        drawRect(renderingContext,
            (-LIGHT_WIDTH / 2) - LIGHT_BORDER,
            (-LIGHT_HEIGHT) - LIGHT_BORDER,
            '#595959',
            LIGHT_BORDER,
            LIGHT_HEIGHT + LIGHT_BORDER
        );

        // Right Bar
        drawRect(renderingContext,
            LIGHT_WIDTH / 2,
            (-LIGHT_HEIGHT) - LIGHT_BORDER,
            '#595959',
            LIGHT_BORDER,
            LIGHT_HEIGHT + LIGHT_BORDER
        );

        // Top Bar
        drawRect(renderingContext,
            (-LIGHT_WIDTH / 2) - LIGHT_BORDER,
            (-LIGHT_HEIGHT) - LIGHT_BORDER,
            '#595959',
            LIGHT_WIDTH + (LIGHT_BORDER * 2),
            LIGHT_BORDER
        );

        // Middle Top-Down Bar
        drawRect(renderingContext,
            -LIGHT_BORDER / 2,
            (-LIGHT_HEIGHT) - LIGHT_BORDER,
            '#595959',
            LIGHT_BORDER,
            LIGHT_HEIGHT + LIGHT_BORDER
        );

        // Middle Left-Right Bar
        drawRect(renderingContext,
            (-LIGHT_WIDTH / 2) - LIGHT_BORDER,
            (-LIGHT_HEIGHT / 2) - (LIGHT_BORDER / 2),
            '#595959',
            LIGHT_WIDTH + (LIGHT_BORDER * 2),
            LIGHT_BORDER
        );

        renderingContext.restore();
    };

    SampleSpriteLibrary.tardis = (tardisSpecification) => {
        let renderingContext = tardisSpecification.renderingContext;
        let decimalDoorOpen = tardisSpecification.decimalDoorOpen || 0.0;

        renderingContext.save();
        renderingContext.translate(-BOX_WIDTH / 2, LIGHT_HEIGHT + BOX_TRIANGLE_HEIGHT);
        renderingContext.fillStyle = '#003B6F';
        renderingContext.fillRect(0, 0, BOX_WIDTH, BOX_HEIGHT);
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(-BOX_WIDTH / 2, LIGHT_HEIGHT + BOX_TRIANGLE_HEIGHT);
        renderingContext.translate(BOX_BORDER, BOX_BORDER);
        renderingContext.fillStyle = '#00172C';
        renderingContext.fillRect(0, 0, BOX_WIDTH - (BOX_BORDER * 2), BOX_HEIGHT - (BOX_BORDER * 2));
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(-BOX_WIDTH / 2, LIGHT_HEIGHT + BOX_TRIANGLE_HEIGHT);
        renderingContext.translate(BOX_BORDER, BOX_BORDER);
        drawDoor(renderingContext, true, decimalDoorOpen);
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(BOX_WIDTH / 2, LIGHT_HEIGHT + BOX_TRIANGLE_HEIGHT);
        renderingContext.translate(-BOX_BORDER, BOX_BORDER);
        drawDoor(renderingContext, false, decimalDoorOpen);
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(-BOX_WIDTH / 2, LIGHT_HEIGHT + BOX_TRIANGLE_HEIGHT);
        drawTriangleTop(renderingContext);
        renderingContext.restore();

        renderingContext.save();
        renderingContext.translate(0, LIGHT_HEIGHT);
        drawLight(renderingContext);
        renderingContext.restore();
    };
})();
