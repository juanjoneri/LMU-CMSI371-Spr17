/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */

canvases = [
    ["canvas1", new Polygon().myBox()],
    ["canvas2", new Polygon().myPyramid()],
    ["canvas3", new Polygon().mySphere()]
];

canvases.forEach ( function(cv) {
((canvas) => {
    // Grab the WebGL rendering context.
    let gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // draw the coordinate system from here..
    let objectsToDraw = [
        // Calibration: x, y, and z axis indicators.
        {
            color: { r: 0.5, g: 0, b: 0 },
            vertices: [
                1.0, 0.0, 0.0,
                0.9, 0.1, 0.0,
                1.0, 0.0, 0.0,
                0.9, -0.1, 0.0,

                1.0, 0.0, 0.0,
                0.9, 0.0, 0.1,
                1.0, 0.0, 0.0,
                0.9, 0.0, -0.1,

                1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0
            ],
            mode: gl.LINES
        },

        {
            color: { r: 0, g: 0.5, b: 0 },
            vertices: [
                0.0, 1.0, 0.0,
                -0.1, 0.9, 0.0,
                0.0, 1.0, 0.0,
                0.1, 0.9, 0.0,

                0.0, 1.0, 0.0,
                0.0, 0.9, -0.1,
                0.0, 1.0, 0.0,
                0.0, 0.9, 0.1,

                0.0, 1.0, 0.0,
                0.0, -1.0, 0.0
            ],
            mode: gl.LINES
        },

        {
            color: { r: 0, g: 0, b: 0.5 },
            vertices: [
                0.0, 0.0, 1.0,
                0.0, 0.1, 0.9,
                0.0, 0.0, 1.0,
                0.0, -0.1, 0.9,

                0.0, 0.0, 1.0,
                0.1, 0.0, 0.9,
                0.0, 0.0, 1.0,
                -0.1, 0.0, 0.9,

                0.0, 0.0, 1.0,
                0.0, 0.0, -1.0
            ],
            mode: gl.LINES
        },

        // Draw the current shape from the mash maker library
        {
            color: { r: 1, g: 0.5, b: 0 },
            vertices: cv[1],
            mode: gl.LINES
        }
    ];

    // Pass the vertices to WebGL.
    objectsToDraw.forEach((objectToDraw) => {
        objectToDraw.buffer = GLSLUtilities.initVertexBuffer(gl, objectToDraw.vertices);
    });

    // Initialize the shaders.
    let abort = false;
    let shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        (shader) => {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        (shaderProgram) => {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    let vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);

    /*
     * Displays an individual object.
     */
    let drawObject = (object) => {
        gl.uniform3f(gl.getUniformLocation(shaderProgram, "color"), object.color.r, object.color.g, object.color.b);
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);
    };

    /*
     * Displays the scene.
     */
    let drawScene = () => {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Display the objects.
        objectsToDraw.forEach(drawObject);

        // All done.
        gl.flush();
    };

    // ...and finally, do the initial display.
    drawScene();

})(document.getElementById(cv[0]));

});
