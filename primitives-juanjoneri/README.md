**CMSI 371** Computer Graphics, Spring 2017

# Assignment 0313
Our last assignment before we plunge into the third dimension is focused on having you spend some time on the primitive side of graphics, in order to gain an appreciation for what it takes to implement these lower-level graphics operations.

## Background Reading
If you have the Angel textbook, you can get deeper treatment of recent material and some future course content with the following readings.
- _Colors, graphics primitives:_ Sections 2.5 (pages 62–68) and 8.8 to 8.10 (pages 416–424)
- _3D graphics overview and pipeline:_ Sections 1.1–1.10 (pages 1–36)

## Automated Feedback Setup
In order to connect your repository to our automated code review and feedback system, once you are up and running please send your repository’s URL to Ed Seim. You can either find him in person in the lab, tweet him at [https://twitter.com/SirSeim](https://twitter.com/SirSeim), or create a GitHub issue on your repository and mention him in it (`@SirSeim`). Once he has you hooked up, the system will provide feedback on code formatting and quality whenever you commit a new version to GitHub. _Points will be deducted if issues here linger in the final submission._

Again for this assignment, a unit test suite is not practical to do: the primitives demo and Nanoshop pages pretty much comprise a visual test suite. Thus, automated feedback only covers code presentation and formatting.

## Primitives
The _primitives_ sample code from the Bazaar repository has been copied into this one. To compensate for the relative difficulty level of the previous assignment, you are given a choice of one of the following options for this portion of the assignment, with additional points provided for higher difficulty levels. This isn’t guaranteed extra credit—it will only work out that way if you perform the requested task well. If you attempt a high-difficulty task but struggle mightily with it, you’ll still get scores below 100.

For these exercises, don’t worry about the usual primitive concern of minimizing operations and restricting calculations to just integers. Compute as needed, and with floating point arithmetic. Gradients were a relatively late-breaking entry to 2D graphics APIs for a reason!

Whatever your choice, make sure that the _primitives-demo.html_ page visually demonstrates the enhancement that you implemented.

### Dye Hard: Radial Gradient
_Implement a two-color radial gradient for rectangles:_ Modify the `fillRect` function in the `Primitives` object so that it interprets the first two colors (`c1` and `c2`), when present, as filling the given rectangle with a _radial gradient_ emanating from its center to the smaller of its two dimensions.

For example, the radial gradient a 100×40 rectangle will have a radius of 20 pixels; the radial gradient for a 30×98 rectangle will have a radius of 15 pixels.

Your new implementation may ignore the three- or four-color case: instead, just call the two-color case all the time, disregarding the extra color arguments.

_Hint:_ The overall structure of the fill does not have to change. It’s only the color calculation that needs modification.

### Dye Harder: Two-Color Polygon Fill (+10)
_Implement a linear two-color gradient for polygons:_ Modify the `fillPolygon` function in the `Primitives` object so that it accepts _two_ colors. The resulting polygon should be painted with a linear gradient from the first color at the polygon’s uppermost _y_-coordinate to the second color at the polygon’s bottom _y_-coordinate.

### Dye Hard with a Vengeance: Multicolor Polygon Fill (+25) 🎆 _Best Value!_ 🎇
_Implement a multipoint linear gradient for polygons:_ Modify the `fillPolygon` function in the `Primitives` object so that its third argument is expected to be an _array_ of colors, one color per vertex. The resulting polygon should be painted such that each vertex is painted with exactly the color that positionally corresponds to it in the given arrays, with every other pixel transitioning smoothly across these colors.

_Hint:_ The approach to this gradient is similar to the one for the original four-color rectangle gradient. Calculate vertical gradients based on the vertices’ _y_-coordinates, then as the algorithm scans across a row of pixels, perform a horizontal gradient from the color on the left side to the color on the right.

_Protip:_ Because there should be a one-to-one correspondence between the vertices and colors, you’ll want to enhance the `Edge` object so that it holds the vertices _and_ the corresponding colors of each edge in the polygon.

## Image Processing
The _nanoshop_ and _nanoshop-neighborhood_ sample code from the Bazaar repository have also been copied into this one.
Add two (2) single-pixel and two (2) neighborhood-pixel filters of your own design to the `Nanoshop` and `NanoshopNeighborhood` objects, respectively, for a total of four (4) new filters. Modify the accompanying demo pages to default to one of your filters.

Two optional ideas that might appeal to you (no extra credit, just personal satisfaction):
- Modify the existing scene to one that is made up of _your_ sprites (or both sets, even!)
- Provide a rudimentary user interface so that the user can choose the filter to apply without having to modify the JavaScript code

For your `NanoshopNeighborhood` additions, make sure that your filters _do_ use the neighborhood pixels when computing the filtered color. A “neighborhood” filter that bases its calculations solely on the central pixel will not get credit.

## Summary of Deliverables
- One (1) chosen primitive enhancement
- Two (2) single-pixel filters
- Two (2) neighborhood-pixel filters
- Corresponding modifications to the HTML pages that demonstrate these improvements
