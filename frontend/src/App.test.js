function isAlive(alive, neighbours) {
  if (neighbours == 2) {
    return alive;
  }
  if (neighbours >= 4) {
    return false;
  }
  if (neighbours > 2) {
    return true;
  }
  return false;
}

function getNeighbours() {
  return [[0, 1], [1, 1]];
}

describe('Location of neighbours', () => {
  it('for "0, 0" contains "0, 1"', () => {
    expect(getNeighbours(0, 0)).toContainEqual([0, 1]);
  });
  it('for "0, 0" contains "1, 1"', () => {
    expect(getNeighbours(0, 0)).toContainEqual([1, 1]);
  });
  it('for "0, 0" contains "1, 0"', () => {
    expect(getNeighbours(0, 0)).toContainEqual([1, 0]);
  });
});

describe('1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.', () => {
  it('live with 0 neighbours should die', () => {
    expect(isAlive(true, 0)).toEqual(false);
  });
  it('live with 1 neighbours should die', () => {
    expect(isAlive(true, 1)).toEqual(false);
  });
});

describe('2. Any live cell with two or three live neighbours lives on to the next generation.', () => {
  it('live with 2 neighbours should not die', () => {
    expect(isAlive(true, 2)).toEqual(true);
  });
  it('live with 3 neighbours should not die', () => {
    expect(isAlive(true, 3)).toEqual(true);
  });
});

describe('3. Any live cell with more than three live neighbours dies, as if by overpopulation.', () => {
  it('live with 4 neighbours should die', () => {
    expect(isAlive(true, 4)).toEqual(false);
  });
  it('live with 6 neighbours should die', () => {
    expect(isAlive(true, 6)).toEqual(false);
  });
});

describe('4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', () => {
  it('dead with 3 neighbours should not die', () => {
    expect(isAlive(false, 3)).toEqual(true);
  });
  it('dead with 2 neighbours should die', () => {
    expect(isAlive(false, 2)).toEqual(false);
  });
});
