describe("Matrix implementation", () => {
    let Matrix = window.Matrix;

    describe("creation and data access", () => {
        it("should instantiate and access Matrices properly", () => {
            let m = new Matrix([1, 2], [3, 4], [5, 6]);

            expect(m.dimensions[0]).toBe(3);
            expect(m.dimensions[1]).toBe(2);
            expect(m.elements[1][0]).toBe(3);
            expect(m.elements[2][1]).toBe(6);
        });

        it("should instantiate and access square matrices properly", () => {
            let m = new Matrix([1, 2, 3], [4, 5, 6], [7, 8, 9]);

            expect(m.dimensions[0]).toBe(3);
            expect(m.dimensions[1]).toBe(3);
            expect(m.elements[0][2]).toBe(3);
        });

        it("should instantiate and access a default matrix as the 3D identity matrix", () => {
            let m = new Matrix();

            expect(m.dimensions[0]).toBe(4);
            expect(m.dimensions[1]).toBe(4);

            expect(m.elements[0][0]).toBe(1);
            expect(m.elements[0][1]).toBe(0);
            expect(m.elements[0][2]).toBe(0);
            expect(m.elements[0][3]).toBe(0);


            expect(m.elements[1][0]).toBe(0);
            expect(m.elements[1][1]).toBe(1);
            expect(m.elements[1][2]).toBe(0);
            expect(m.elements[1][3]).toBe(0);

            expect(m.elements[2][0]).toBe(0);
            expect(m.elements[2][1]).toBe(0);
            expect(m.elements[2][2]).toBe(1);
            expect(m.elements[2][3]).toBe(0);

            expect(m.elements[3][0]).toBe(0);
            expect(m.elements[3][1]).toBe(0);
            expect(m.elements[3][2]).toBe(0);
            expect(m.elements[3][3]).toBe(1);
        });
    });

    describe("addition", () => {
        it("should perform addition correctly", () => {
            let m1 = new Matrix([2, 1], [1, 2]);
            let m2 = new Matrix([1, 2], [2, 1]);
            let mresult = m1.add(m2);

            expect(mresult.dimensions[0]).toBe(2);
            expect(mresult.elements[0][0]).toBe(3);
            expect(mresult.elements[1][0]).toBe(3);
        });

        it("should perform subtraction correctly", () => {
            let m1 = new Matrix([2, 1], [1, 2]);
            let m2 = new Matrix([1, 2], [2, 1]);
            let mresult = m1.subtract(m2);

            expect(mresult.dimensions[0]).toBe(2);
            expect(mresult.elements[0][0]).toBe(1);
            expect(mresult.elements[1][0]).toBe(-1);
        });

        it("should throw an exception when adding different sizes", () => {
            let m1 = new Matrix([5, 8, 10, 2], [5, 8, 10, 2]);
            let m2 = new Matrix([1, 2, 2], [1, 2, 2], [1, 2, 2], [1, 2, 2]);

            // We can actually check for a *specific* exception, but
            // we won't go that far for now.
            expect(() => m1.add(m2)).toThrow();
        });
    });

    describe("shape", () => {
        it("should correctly return a row of the matrix", () => {
            let m = new Matrix([2, 1, 3], [1, 2, 7], [5, 6, 3], [0, 8, 1]);

            expect(m.row(0)[0]).toBe(2);
            expect(m.row(1)[1]).toBe(2);
            expect(m.row(2)[2]).toBe(3);
        });

        it("should correctly return a column of the matrix", () => {
            let m = new Matrix([2, 1, 3], [1, 2, 7], [5, 6, 3], [0, 8, 1]);

            expect(m.col(0)[0]).toBe(2);
            expect(m.col(1)[3]).toBe(8);
            expect(m.col(2)[2]).toBe(3);
        });

        it("should corretly dot a column and a row", () => {
            let m1 = new Matrix([2, 1], [-1, 2]);
            let mresult = m1.dot(m1.row(0), m1.col(0));

            expect(mresult).toBe(3);
        });
    });

    describe("product", () => {
        it("should not perfor matrix multiplication if the matrices are not commutable", () => {
            let m1 = new Matrix([2, 1, 3], [1, 2, 5], [1, 2, 3]);
            let m2 = new Matrix([1], [3]);

            expect(() => m1.multiply(m2)).toThrow();
            expect(() => m2.multiply(m1)).toThrow();
        });

        it("should perform matrix multiplication", () => {
            let m1 = new Matrix([1, 2, 3], [4, 5, 6], [7, 8, 9]);
            let m2 = new Matrix([1, 2, 3], [4, 5, 6], [7, 8, 9]);
            let mresult = m1.multiply(m2);

            expect(mresult.dimensions[0]).toBe(3);
            expect(mresult.dimensions[1]).toBe(3);
            expect(mresult.elements[0][0]).toBe(30);
            expect(mresult.elements[2][1]).toBe(126);
        });

        it("should perform scalar multiplication correctly", () => {
            let m1 = new Matrix([2, 1], [-1, 2]);
            let mresult = m1.scalar(2);

            expect(mresult.dimensions[0]).toBe(2);
            expect(mresult.elements[0][0]).toBe(4);
            expect(mresult.elements[1][0]).toBe(-2);
        });

        it("should perform identity multiplication correctly", () => {
            let m1 = new Matrix([2, 2, 1, 0], [-1, -90, 2, 12]);
            let i = new Matrix();
            let mresult = m1.multiply(i);

            expect(mresult.dimensions[0]).toBe(2);
            expect(mresult.dimensions[1]).toBe(4);
            expect(mresult.elements[1][1]).toBe(-90);
        });
    });

    describe("rotation", () => {
        it("should perform rotations correctly", () => {
            let m = new Matrix([1], [0], [0], [1]);
            let mresult = m.rotate(0, 0, Math.PI / 2);

            expect(mresult.dimensions[0]).toBe(4);
            expect(mresult.elements[0][0] < 0.1).toBeTruthy();
            expect(mresult.elements[1][0] < 1.1).toBeTruthy();
            expect(mresult.elements[2][0] < 0.1).toBeTruthy();
            expect(mresult.elements[3][0]).toBe(1);
        });
    });

    describe("scaling", () => {
        it("should perform scaling correctly", () => {
            let m = new Matrix([11], [0], [-1], [1]);
            let mresult = m.scale(0, -10, Math.PI / 2);

            expect(mresult.dimensions[0]).toBe(4);
            expect(mresult.elements[0][0]).toBe(0);
            expect(mresult.elements[1][0]).toBe(0);
            expect(mresult.elements[2][0]).toBe(-Math.PI / 2);
            expect(mresult.elements[3][0]).toBe(1);
        });
    });

    describe("translating", () => {
        it("should perform translation correctly", () => {
            let m = new Matrix([11], [0], [-1], [1]);
            let mresult = m.translate(0, -10, Math.PI / 2);

            expect(mresult.dimensions[0]).toBe(4);
            expect(mresult.elements[0][0]).toBe(11);
            expect(mresult.elements[1][0]).toBe(-10);
            expect(mresult.elements[2][0]).toBe(-1 + Math.PI / 2);
            expect(mresult.elements[3][0]).toBe(1);
        });
    });

    describe("projecting", () => {
        it("should project into x plane correctly", () => {
            let m = new Matrix([11], [Math.PI], [-1], [1]);
            let mresult = m.project("x");

            expect(mresult.dimensions[0]).toBe(4);
            expect(mresult.elements[0][0]).toBe(0);
            expect(mresult.elements[1][0]).toBe(Math.PI);
            expect(mresult.elements[2][0]).toBe(-1);
            expect(mresult.elements[3][0]).toBe(1);
        });

        it("should project into y plane correctly", () => {
            let m = new Matrix([11], [Math.PI], [-1], [1]);
            let mresult = m.project("y");

            expect(mresult.dimensions[0]).toBe(4);
            expect(mresult.elements[0][0]).toBe(11);
            expect(mresult.elements[1][0]).toBe(0);
            expect(mresult.elements[2][0]).toBe(-1);
            expect(mresult.elements[3][0]).toBe(1);
        });

        it("should project into z plane correctly", () => {
            let m = new Matrix([11], [Math.PI], [-1], [1]);
            let mresult = m.project("z");

            expect(mresult.dimensions[0]).toBe(4);
            expect(mresult.elements[0][0]).toBe(11);
            expect(mresult.elements[1][0]).toBe(Math.PI);
            expect(mresult.elements[2][0]).toBe(0);
            expect(mresult.elements[3][0]).toBe(1);
        });
    });

    describe("frustum", () => {
        it("should perform Orthogonal Projection correctly", () => {
            let m = new Matrix([0.5], [0.5], [0.5], [1]);
            let frustum = m.scale(1, -1, -1, 1, -1, 1);

            expect(frustum.dimensions[0]).toBe(4);
            expect(frustum.dimensions[1]).toBe(1);

            expect(frustum.elements[0][0]).toBe(0.5);
            expect(frustum.elements[1][0]).toBe(-0.5);
            expect(frustum.elements[2][0]).toBe(-0.5);
            expect(frustum.elements[3][0]).toBe(1);
        });
    });


});
