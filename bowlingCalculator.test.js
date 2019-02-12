var calculate = require('./index');

describe('Test suite 1', () => {
  it('6 frames', () => {
    var actual = calculate([
      [1,0], 
      [2,0], 
      [4,5], 
      [9,1], 
      [10,0], 
      [3,4]
    ])
    var result = [1, 3, 12, 32, 49, 56];
    expect(actual).toEqual(result);
  })

  it('Zeroes', () => {
    var actual = calculate([
      [0,0],
      [0,0], 
      [0,0], 
      [0,0], 
      [0,0], 
      [0,0], 
      [0,0], 
      [0,0], 
      [0,0], 
      [0,0]
    ]);
    var result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    expect(actual).toEqual(result);
  })

  it('Strikes', () => {
    var actual = calculate([
      [ 10, 0 ],
      [ 10, 0 ],
      [ 10, 0 ],
      [ 10, 0 ],
      [ 10, 0 ],
      [ 10, 0 ],
      [ 10, 0 ],
      [ 10, 0 ],
      [ 10, 0 ],
      [ 10, 0 ],
      [ 10, 10 ] ]
    );
    var result = [ 30, 60, 90, 120, 150, 180, 210, 240, 270, 300 ]
    expect(actual).toEqual(result);
  })

  it('Strikes, spares and zeroes', () => {
    var actual = calculate([
      [ 10, 0 ],
      [ 5, 5 ],
      [ 1, 1 ],
      [ 5, 5 ],
      [ 10, 0 ],
      [ 1, 1 ],
      [ 5, 5 ],
      [ 10, 0 ],
      [ 0, 0 ],
      [ 5, 0 ]
    ]);
    var result = [ 20, 31, 33, 53, 65, 67, 87, 97, 97, 102 ]
    expect(actual).toEqual(result);
  })

  it('Spares', () => {
    var actual = calculate([
      [ 5, 5 ],
      [ 5, 5 ],
      [ 5, 5 ],
      [ 5, 5 ],
      [ 5, 5 ],
      [ 5, 5 ],
      [ 5, 5 ],
      [ 5, 5 ],
      [ 5, 5 ],
      [ 5, 5 ],
      [ 5, 5 ] ]
    );
    var result = [ 15, 30, 45, 60, 75, 90, 105, 120, 135, 150 ]
    expect(actual).toEqual(result);
  })
})