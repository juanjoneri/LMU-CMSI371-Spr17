// Sprite contributed by Trixie Roque.
(() => {
    window.SampleSpriteLibrary = window.SampleSpriteLibrary || {};

    SampleSpriteLibrary.bb8 = (specs) => {
        const BODY_RADIUS = 100;
        const HEAD_OFFSET = 90;
        const HEAD_RADIUS = BODY_RADIUS / 1.5;

        let renderingContext = specs.renderingContext;
        let headTurn = specs.headTurn || 0;
        let bodyTurn = specs.bodyTurn || 0;
        let headTilt = specs.headTilt || 0;
        let color = specs.color || "rgb(255, 120, 0)";
        let xBody = 0;
        let yBody = 0;
        let bodyGradient = renderingContext.createRadialGradient(500, 250, 10, 250, 300, 800);
        let headGradient = renderingContext.createRadialGradient(400, 150, 10, 300, 100, 800);

        bodyGradient.addColorStop(0, "white");
        bodyGradient.addColorStop(1, "gray");

        headGradient.addColorStop(0, "white");
        headGradient.addColorStop(1, "gray");

        const OUTER_CIRCLE_CONSTANTS = {
            scale0: 0.8,
            scale1: 0.6,
            offset0: 10,
            offset1: 16
        };

        let render = () => {
            renderingContext.fillStyle = bodyGradient;
            renderingContext.beginPath();
            renderingContext.arc(xBody, yBody, BODY_RADIUS, 0, Math.PI * 2, true);
            renderingContext.fill();
            renderingContext.closePath();

            rotateBody(bodyTurn);
            rotateHead(headTilt);
        };

        let rotateHead = (tilt) => {
            const LEFTEST = -60;
            const RIGHTEST = -LEFTEST;
            renderingContext.save();
            renderingContext.translate(xBody, yBody);
            if (tilt < LEFTEST || tilt > RIGHTEST) {
                tilt = tilt < LEFTEST ? LEFTEST : RIGHTEST;
            }
            renderingContext.rotate(Math.PI / 180 * tilt);
            drawHead();
            renderingContext.restore();
        };

        let drawHead = () => {
            renderingContext.fillStyle = headGradient;
            renderingContext.beginPath();
            renderingContext.save();
            renderingContext.scale(OUTER_CIRCLE_CONSTANTS.scale0, 1);
            renderingContext.arc(0, -BODY_RADIUS + 10, HEAD_RADIUS, 0, Math.PI, true);
            renderingContext.closePath();
            renderingContext.fill();
            renderingContext.stroke();
            renderingContext.translate(0, -HEAD_OFFSET);
            drawEye(headTurn);
            renderingContext.restore();
        };

        let rotateBody = (turn) => {
            let convertRadianToDegrees = Math.PI / 180;
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.translate(xBody, yBody);
            renderingContext.rotate(convertRadianToDegrees * turn);
            drawBody();
            renderingContext.restore();
        };

        let drawEye = (turn) => {
            renderingContext.save();
            const RIGHTEST = 40;
            const LEFTEST = -40;
            const EYE_OFFSET = 45;
            const LOWER_DOT_OFFSET = 25;
            const SHINY_OFFSET = 5;
            if (turn < LEFTEST || turn > RIGHTEST) {
                turn = turn < LEFTEST ? LEFTEST : RIGHTEST;
            }
            drawInnerCircles(renderingContext, "black", 15, turn, -EYE_OFFSET);
            drawInnerCircles(renderingContext, "white", 5, turn - SHINY_OFFSET, -EYE_OFFSET - SHINY_OFFSET);
            if (turn < RIGHTEST - 10) {
                drawInnerCircles(renderingContext, "black", 5, LOWER_DOT_OFFSET + turn, -LOWER_DOT_OFFSET);
            }
            renderingContext.restore();
        };

        let drawInnerCircles = (renderingContext, fillStyle, radius, x, y) => {
            renderingContext.fillStyle = fillStyle;
            renderingContext.beginPath();
            renderingContext.arc(x, y, radius, 0, Math.PI * 2, true);
            renderingContext.fill();
            renderingContext.stroke();
        };

        let drawCenterLine = (renderingContext, x0, y0, x1, y1) => {
            renderingContext.beginPath();
            renderingContext.moveTo(x0, y0);
            renderingContext.lineTo(x1, y1);
            renderingContext.stroke();
        };

        let drawOuterCircles = (renderingContext, s0, s1, s2, s3, c0, c1, c2, c3) => {
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.moveTo((s0 * BODY_RADIUS * c0), (s2 * BODY_RADIUS * c1));
            renderingContext.lineTo((s1 * BODY_RADIUS * c0), (s3 * BODY_RADIUS * c1));
            renderingContext.lineTo((s1 * BODY_RADIUS * c0) + (s0 * c2), (s3 * BODY_RADIUS * c1) + (s2 * c3));
            renderingContext.lineTo((s0 * BODY_RADIUS * c0) + (s1 * c2), (s2 * BODY_RADIUS * c1) + (s3 * c3));
            renderingContext.closePath();
            renderingContext.fill();
            renderingContext.stroke();
            renderingContext.restore();
        };

        let drawBody = () => {
            drawCenterLine(renderingContext,
                -BODY_RADIUS * OUTER_CIRCLE_CONSTANTS.scale0, 0, BODY_RADIUS * OUTER_CIRCLE_CONSTANTS.scale0, 0);

            drawCenterLine(renderingContext,
                0, -BODY_RADIUS * OUTER_CIRCLE_CONSTANTS.scale0, 0, BODY_RADIUS * OUTER_CIRCLE_CONSTANTS.scale0);

            drawInnerCircles(renderingContext, color, HEAD_RADIUS * OUTER_CIRCLE_CONSTANTS.scale0, 0, 0);
            drawInnerCircles(renderingContext, "white", HEAD_RADIUS / 1.75, 0, 0);
            drawInnerCircles(renderingContext, "gray", HEAD_RADIUS / 2.25, 0, 0);

            renderingContext.fillStyle = color;

            drawOuterCircles(renderingContext, 1, 1, 1, -1,
                OUTER_CIRCLE_CONSTANTS.scale0,
                OUTER_CIRCLE_CONSTANTS.scale1,
                OUTER_CIRCLE_CONSTANTS.offset0,
                OUTER_CIRCLE_CONSTANTS.offset1
            );

            drawOuterCircles(renderingContext, -1, -1, -1, 1,
                OUTER_CIRCLE_CONSTANTS.scale0,
                OUTER_CIRCLE_CONSTANTS.scale1,
                OUTER_CIRCLE_CONSTANTS.offset0,
                OUTER_CIRCLE_CONSTANTS.offset1
            );

            drawOuterCircles(renderingContext, -1, 1, 1, 1,
                OUTER_CIRCLE_CONSTANTS.scale1,
                OUTER_CIRCLE_CONSTANTS.scale0,
                OUTER_CIRCLE_CONSTANTS.offset1,
                OUTER_CIRCLE_CONSTANTS.offset0
            );

            drawOuterCircles(renderingContext, -1, 1, -1, -1,
                OUTER_CIRCLE_CONSTANTS.scale1,
                OUTER_CIRCLE_CONSTANTS.scale0,
                OUTER_CIRCLE_CONSTANTS.offset1,
                OUTER_CIRCLE_CONSTANTS.offset0
            );
        };
        render();
    };
})();
