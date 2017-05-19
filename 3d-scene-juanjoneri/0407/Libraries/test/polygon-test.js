describe("Polygon implementation", () => {
    let Polygon = window.Polygon;

    describe("creation", () => {
        it("should instantiate and access Polygon class properly", () => {
            let p = new Polygon();
            expect(p.vertices.length).toBe(0);
            expect(p.indices.length).toBe(0);
            expect(p.index).toBe(0);
        });
    });

    describe("shapes", () => {
        it("should return the rawTraingleArray for a myIcosahedron", () => {
            let p = new Polygon();
            let polygon = p.myIcosahedron();

            expect(p.vertices.length).toBe(12);
            expect(p.indices.length).toBe(20);
            expect(p.index).toBe(0);

            expect(polygon.length).toBe(360);
        });

        it("should return the rawTraingleArray for myBox", () => {
            let p = new Polygon();
            let polygon = p.myBox();

            expect(p.vertices.length).toBe(8);
            expect(p.indices.length).toBe(12);
            expect(p.index).toBe(0);

            expect(polygon.length).toBe(108);
        });

        it("should return the rawTraingleArray for a myPyramid", () => {
            let p = new Polygon();
            let polygon = p.myPyramid();

            expect(p.vertices.length).toBe(5);
            expect(p.indices.length).toBe(6);
            expect(p.index).toBe(0);

            expect(polygon.length).toBe(54);
        });

        it("should return the rawTraingleArray for a mySphere", () => {
            let p = new Polygon();
            let polygon = p.mySphere();

            expect(p.vertices.length).toBe(1272);
            expect(p.indices.length).toBe(1280);
            expect(p.index).toBe(1272);

            expect(polygon.length).toBe(11520);
        });
    });

    describe("toRawLineArray", () => {
        it("should return the rawTraingleArray for a myIcosahedron", () => {
            let p = new Polygon();
            p.myIcosahedron();
            let polygon = p.toRawLineArray();

            expect(p.vertices.length).toBe(12);
            expect(p.indices.length).toBe(20);
            expect(p.index).toBe(0);

            expect(polygon.length).toBe(360);
        });

        it("should return the rawTraingleArray for myBox", () => {
            let p = new Polygon();
            p.myBox();
            let polygon = p.toRawLineArray();

            expect(p.vertices.length).toBe(8);
            expect(p.indices.length).toBe(12);
            expect(p.index).toBe(0);

            expect(polygon.length).toBe(216);
        });

        it("should return the rawTraingleArray for a myPyramid", () => {
            let p = new Polygon();
            p.myPyramid();
            let polygon = p.toRawLineArray();

            expect(p.vertices.length).toBe(5);
            expect(p.indices.length).toBe(6);
            expect(p.index).toBe(0);

            expect(polygon.length).toBe(108);
        });

        it("should return the rawTraingleArray for a mySphere", () => {
            let p = new Polygon();
            p.mySphere();
            let polygon = p.toRawLineArray();

            expect(p.vertices.length).toBe(1272);
            expect(p.indices.length).toBe(1280);
            expect(p.index).toBe(1272);

            expect(polygon.length).toBe(23040);
        });
    });

});
