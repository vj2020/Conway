import { Injectable } from '@angular/core';

/*
 * This maintain the current Board Service. 
 */
@Injectable()
export class BoardService {

  grid = [];

  /*
   *This method initialize the grid in the board 
   */
  initialize(rows, cols): void {
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push(false);
      }
      this.grid.push(row);
    }
  }
  
  /*
   * This method returns cell will live or not
   */
  live(row, cell): boolean {
    return this.getCellValue(row, cell)
      && this.getLiveNeighbours(row, cell) >= 2
      && this.getLiveNeighbours(row, cell) <= 3;
  };
  
  /*
   * This method returns cell will die or not
   */
  die(row, cell): boolean {
    return this.getCellValue(row, cell)
      && (this.getLiveNeighbours(row, cell) < 2
        || this.getLiveNeighbours(row, cell) > 3);
  };
  
  /*
   * This method returns cell will reborn or not
   */
  born(row, cell): boolean {
    return !this.getCellValue(row, cell)
      && this.getLiveNeighbours(row, cell) === 3;
  };

  /*
   * This method returns how many live neighbours near by
   */
  getLiveNeighbours(row, cell): number {
    let liveNeigbhour = 0;
    liveNeigbhour += this.getCellValue(row - 1, cell - 1) ? 1 : 0;
    liveNeigbhour += this.getCellValue(row - 1, cell + 0) ? 1 : 0;
    liveNeigbhour += this.getCellValue(row - 1, cell + 1) ? 1 : 0;
    liveNeigbhour += this.getCellValue(row + 0, cell - 1) ? 1 : 0;
    liveNeigbhour += this.getCellValue(row + 0, cell + 1) ? 1 : 0;
    liveNeigbhour += this.getCellValue(row + 1, cell - 1) ? 1 : 0;
    liveNeigbhour += this.getCellValue(row + 1, cell + 0) ? 1 : 0;
    liveNeigbhour += this.getCellValue(row + 1, cell + 1) ? 1 : 0;
    return liveNeigbhour;
  };

  /*
   * This method returns current cell value
   */
  getCellValue(row, cell): boolean {
    return (row >= 0 && row < this.grid.length &&
      cell >= 0 && cell < this.grid[row].length &&
      this.grid[row][cell]);
  };

  /*
   * This method runs the conway game once and update the state
   */
  runOnce(): any {
    const updatedState = [];
    for (let row = 0; row < this.grid.length; row++) {
      const newRow = [];
      for (let col = 0; col < this.grid[row].length; col++) {
        newRow.push(this.live(row, col) || this.born(row, col));
      }
      updatedState.push(newRow);
    }
    this.grid = updatedState;
    return updatedState;
  };
  
  /*
   * This method compares 2 states are equal or not
   */
  isStateMatch(previousState, currentState): boolean {
    for (let row = 0; row < currentState.length; row++) {
      const newRow = [];
      for (let col = 0; col < currentState[row].length; col++) {
        if (previousState[row][col] !== currentState[row][col]) {
          return false;
        }
      }
    }
    return true;
  };
}
