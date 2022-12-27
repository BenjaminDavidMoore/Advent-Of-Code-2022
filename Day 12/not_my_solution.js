/**
 * @typedef Cell
 * @property {number} e
 * @property {number} steps
 * @property {boolean?} start
 * @property {boolean?} end
 */

/**
 *
 * @param {Buffer} input
 */
  function parseInput(input) {
    return input
      .toString('utf-8')
      .split(/\n/)
      .map((r) =>
        r.split('').map((e) => {
          if (e === 'E') {
            return { e: 'z'.charCodeAt(0) + 1, steps: 0, end: true };
          } else if (e === 'S') {
            return {
              e: 'a'.charCodeAt(0) - 1,
              steps: Number.MAX_SAFE_INTEGER,
              start: true,
            };
          }
  
          return { e: e.charCodeAt(0), steps: Number.MAX_SAFE_INTEGER };
        })
      );
  }
  
  /**
   *
   * @param {Cell[][]} input
   */
  function findPos(input) {
    let startPos = null;
    let endPos = null;
  
    for (let y = 0, cnt = input.length; y < cnt; y++) {
      const row = input[y];
  
      if (startPos == null) {
        const x = row.findIndex((c) => c.start);
        if (x >= 0) {
          startPos = [x, y];
        }
      }
  
      if (endPos == null) {
        const x = row.findIndex((c) => c.end);
        if (x >= 0) {
          endPos = [x, y];
        }
      }
  
      if (startPos != null && endPos != null) {
        break;
      }
    }
  
    return { startPos, endPos };
  }
  
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} steps
   * @param {Cell[][]} grid
   */
  function navigate(x, y, steps, grid) {
    const row = grid[y];
    const cell = row[x];
    cell.steps = steps;
  
    if (x + 1 < grid[y].length) {
      let right = grid[y][x + 1];
      if (cell.e - right.e <= 1) {
        // elevation says I can go right
        if (right.steps > steps + 1) {
          navigate(x + 1, y, steps + 1, grid);
        }
      }
    }
  
    if (y + 1 < grid.length) {
      let bottom = grid[y + 1][x];
      if (cell.e - bottom.e <= 1) {
        // elevation says I can go down
        if (bottom.steps > steps + 1) {
          navigate(x, y + 1, steps + 1, grid);
        }
      }
    }
  
    if (x > 0) {
      let left = grid[y][x - 1];
      if (cell.e - left.e <= 1) {
        // elevation says I can go left
        if (left.steps > steps + 1) {
          navigate(x - 1, y, steps + 1, grid);
        }
      }
    }
  
    if (y > 0) {
      let top = grid[y - 1][x];
      if (cell.e - top.e <= 1) {
        // elevation says I can go up
        if (top.steps > steps + 1) {
          navigate(x, y - 1, steps + 1, grid);
        }
      }
    }
  }
  
  /**
   *
   * @param {Cell[][]} input
   */
   function countSortestPath(input) {
    const { startPos, endPos } = findPos(input);
    navigate(endPos[0], endPos[1], 0, input);
  
    const startCell = input[startPos[1]][startPos[0]];
  
    return startCell.steps;
  }
  
  /**
   *
   * @param {Cell[][]} input
   */
   function countSortestPathFromA(input) {
    const { endPos } = findPos(input);
    navigate(endPos[0], endPos[1], 0, input);
  
    return Math.min(
      ...input
        .flatMap((x) => x)
        .filter((c) => c.e === 'a'.charCodeAt(0))
        .map((c) => c.steps)
    );
  }



let fs = require('node:fs/promises');

(async function () {
  const input = await fs.readFile('./input.txt');

  console.log(countSortestPath(parseInput(input)));
  console.log(countSortestPathFromA(parseInput(input)));
})().catch((error) => {
  console.error(error);
});