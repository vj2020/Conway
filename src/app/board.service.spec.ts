import { TestBed, async } from '@angular/core/testing';

import { BoardService } from './board.service';

describe('BoardService Test', () => {
  let service: BoardService;
  beforeEach(async(() => {

    service = new BoardService();
    service.initialize(8, 6);

    TestBed.configureTestingModule({
      providers: [
        BoardService
      ]
    });
  }));

  it('Should initilize with default value', async(() => {
    for (let r = 0; r < service.grid.length; r++) {
      for (let c = 0; c < service.grid[r].length; c++) {
        expect(service.getCellValue(r, c)).toBe(false);
      }
    }
  }));

  it('Should return current cell value', async(() => {

    service.grid[6][6] = true;

    expect(service.getCellValue(5, 6)).toBe(false);
    expect(service.getCellValue(6, 6)).toBe(true);
    expect(service.getCellValue(-1, -5)).toBe(false);
    expect(service.getCellValue(10, 20)).toBe(false);
  }));


  it('Check this cell will live or not', async(() => {

    service.grid[3][5] = true;
    service.grid[4][5] = true;
    service.grid[4][6] = true;
    service.grid[1][1] = true;
    expect(service.live(3, 5)).toBe(true);
    expect(service.live(4, 6)).toBe(true);
    expect(service.live(4, 5)).toBe(true);
    expect(service.live(1, 1)).toBe(false);
  }));

  it('Check this cell will die or not', async(() => {

    service.grid[3][5] = true;
    service.grid[4][5] = true;
    service.grid[4][6] = true;
    service.grid[1][1] = true;
    expect(service.die(3, 5)).toBe(false);
    expect(service.die(4, 6)).toBe(false);
    expect(service.die(4, 5)).toBe(false);
    expect(service.die(1, 1)).toBe(true);

  }));

  it('Check this cell will reborn or not', async(() => {

    service.grid[3][5] = true;
    service.grid[4][5] = true;
    service.grid[4][6] = true;
    service.grid[1][1] = true;
    expect(service.born(3, 6)).toBe(true);
    expect(service.born(1, 2)).toBe(false);
  }));

  it('Check how many live neighbours', async(() => {

    service.grid[3][5] = true;
    service.grid[4][5] = true;
    service.grid[4][6] = true;
    service.grid[1][1] = true;
    expect(service.getLiveNeighbours(3, 6)).toBe(3);
    expect(service.getLiveNeighbours(1, 2)).toBe(1);
    expect(service.getLiveNeighbours(1, 1)).toBe(0);
  }));

  it('Execute conway once and expect updated state', async(() => {

    service.grid[3][5] = true;
    service.grid[4][5] = true;
    service.grid[4][6] = true;
    service.grid[1][1] = true;

    const newBoard = service.grid;
    newBoard[3][6] = true;
    newBoard[1][1] = false;
    expect(service.runOnce()).toEqual(newBoard);
  }));

  it('Compare two current and updated state', async(() => {

    service.grid[3][5] = true;
    service.grid[4][5] = true;
    service.grid[4][6] = true;
    service.grid[1][1] = true;

    const updatedState = service.grid;
    updatedState[3][6] = true;
    updatedState[1][1] = false;
    expect(service.isStateMatch(updatedState, updatedState)).toBe(true);

    expect(service.isStateMatch(service.grid, updatedState)).toBe(true);

    const updatedState2 = service.grid;
    updatedState2[3][6] = false;
    updatedState2[4][6] = false;
    service.runOnce();
    expect(service.isStateMatch(service.grid, updatedState2)).toBe(false);

  }));



});