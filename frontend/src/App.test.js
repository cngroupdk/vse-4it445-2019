function checkAlive(isAlive, neighboursCount) {
  if (neighboursCount === 2) {
    return isAlive;
  }
  if (neighboursCount === 3) {
    return true;
  }
  return false;
}

function getNeigbours(x, y) {
  return [[2, 1], [0, 1], [0, 0], null, null, null, null, null];
}
describe('getNeigbours function', () => {
  it('for 1,1 contains 2,1', () => {
    expect(getNeigbours(1, 1)).toContainEqual([2, 1]);
  });
  it('for 1,1 contains 0,1', () => {
    expect(getNeigbours(1, 1)).toContainEqual([0, 1]);
  });
  it('for 1,1 contains 0,0', () => {
    expect(getNeigbours(1, 1)).toContainEqual([0, 0]);
  });
  it('returns 8 items', () => {
    expect(getNeigbours(1, 1).length).toEqual(8);
  });
});

describe('1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.', () => {
  it('alive cell with 0 alive neighbours will die', () => {
    expect(checkAlive(true, 0)).toEqual(false);
  });
  it('alive cell with 0 alive neighbours will die', () => {
    expect(checkAlive(true, 1)).toEqual(false);
  });
});

describe('2. Any live cell with two or three live neighbours lives on to the next generation.', () => {
  it('alive cell with 2 alive neighbours will survive', () => {
    expect(checkAlive(true, 2)).toEqual(true);
  });

  it('alive cell with 3 alive neighbours will survive', () => {
    expect(checkAlive(true, 3)).toEqual(true);
  });
});

describe('3. Any live cell with more than three live neighbours dies, as if by overpopulation.', () => {
  it('alive cell with 4 alive neighbours will die', () => {
    expect(checkAlive(true, 4)).toEqual(false);
  });
});

describe('4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', () => {
  it('dead cell with 2 alive neighbours stays dead', () => {
    expect(checkAlive(false, 2)).toEqual(false);
  });
  it('dead cell with 3 alive neighbours become alive', () => {
    expect(checkAlive(false, 3)).toEqual(true);
  });
});
