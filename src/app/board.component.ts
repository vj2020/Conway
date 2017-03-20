import { Component } from '@angular/core';

import { BoardService } from './board.service';

/*
 * This Component maintain the conway board game with start and stop functionality. 
 */
@Component({
  selector: 'conway-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BoardService]
})
export class BoardComponent {
  intervalId = null;
  message;
  errorMessage;
  errClass;
  gameStarted = false;
  constructor(private boardService: BoardService) {
    this.boardService.initialize(6, 8);
  };

  toggleFlag(row, cell) {
    this.boardService.grid[row][cell] = !this.boardService.grid[row][cell];
  };

  cellClass(row, cell) {
    if (this.boardService.die(row, cell)) {
      return "die";
    }
    if (this.boardService.born(row, cell)) {
      return "reborn";
    }
    return "";
  };

  startGame() {
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.intervalId = setInterval(() => {
        const previousGrid = this.boardService.grid;
        const currentGrid = this.boardService.runOnce();
        if (this.boardService.isStateMatch(previousGrid, currentGrid)) {
          this.message = "Still lifes. Game Stopped";
          clearInterval(this.intervalId);
          this.gameStarted = false;
        }
      }, 1000);
    }
  };

  getCurrentGrid() {
    return this.boardService.grid;
  };

  stopGame() {
    clearInterval(this.intervalId);
    this.gameStarted = false;
  };

  updateGrid(rows, cols) {
    this.errClass = "";
    this.errorMessage = ""
    if (rows > 0 && rows <= 100 && cols > 0 && cols <= 100) {
      this.boardService.initialize(rows, cols);
    } else {
      this.errClass = "err";
      this.errorMessage = "Please enter value between 1 to 100."
    }
  }

}
