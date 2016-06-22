
# affine

  Vectors and points for 2d graphics or geometry.
  All methods return new objects, so originals are never mutated.

## Example

```js
import {V2, P2} from 'affine';
const v = V2(5, 5);
const p = P2(10, 10);
p.offset(v);
```

## API

##### V2(x, y)

  Initialize a new `Vector` with x / y.

##### V2#equals(v:V2)

  Check if this vector is equal to `v`.

##### V2#plus(v:V2)

  Add `v` to this vector.

##### V2#minus(v:V2)

  Subtract `v` from this vector.

##### V2#times(s:Number)

  Scale this vector by `s`.

##### V2#dot(v:V2)

  Return the dot product of this vector and `v`.

##### V2#magnitude()

  Return the magnitude of this vector.

##### V2#normalize()

  Return a vector with the same direction as this one, and unit length.
  Returns the zero vector if this vector is zero as well.

##### V2#rotate(s:Number)

  Rotate this vector by `s` radians.

---

##### P2(x, y)

  Initialize a new `Position` with x / y.

##### P2#equals(p:P2)

  Check if this position is equal to `p`.

##### P2#offset(v:V2)

  Displace this position by the vector `v`.

##### P2#getOffset(p:P2)

  Return the displacement vector between this position and `p`.

##### P2#distance(p:P2)

  Return the distance between this position and `p`.

## License

  MIT
