# Summary of visit to Pixar exhibition at California Science Center
## 04/8/17 at 10:45

The exhibition that drew my attention the most was the one about smoothing and rendering. In the context of the movie *"up"*, an educational video explained how simple "low poly" geometry can be turn into a very smooth vertex rich body that can take as long as 20 hours to render, but generates very smooth and detailed results.

The example that was used for the explanation was a rectangle that had to be turned into an oval, while maintaining the capabilities of being able to manipulate the original vertices of the rectangle as "anchor points" and keeping the smoothing effects.

The technique consists of taking each pair of points in the shape and finding it's middle point. The point is then added to the mesh and everything is shifted so that the other two vertices move halfway and the corners get smoothed out. This can also be done in 3 dimensional shapes like cubes and pyramids.

A similar technique was applied in our assignment 0407a for which we had to build the mesh for a sphere. When implemented as an icosphere, the algorithm performs a series of steps in which it adds vertices to the geometry, generating similar results to what Pixar does before rendering as explained above.

Another thing that is interesting about pixar's technique is that the smoothing computation does not necessarily have to be done until the end. This means that animators can work with geometry that is very simple and thus very fast to update and manipulate without the need of keeping track of too many points.

The reason I particularly enjoyed that specific video was the level of technicality. Because I was literally just done working on a similar problem myself, it was interesting to see that such problems also appear in real word applications like a Disney movie. Also, because I had coded it myself, I really got to appreciate the details of the explanation.
