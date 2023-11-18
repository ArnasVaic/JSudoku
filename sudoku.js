const equalsCheck = (a, b) =>
    a.length === b.length &&
    a.every((v, i) => v === b[i]);

class Sudoku {
    constructor(width, height, board_string) {
        this.width = width
        this.height = height
        this.initial = board_string
        this.setBoard(this.initial)
    }

    setBoard(str) {
        this.board = str.split('').map(c => {
            if (c === 'x')
                return null
            else
                return parseInt(c);
        })
    }

    reset() {
        this.setBoard(this.initial)
    }

    column_solved(index) {
        let column = []
        for(let i = 0; i < this.height; ++i) {
            column.push(this.board[index + i * this.width])
        }
        column.sort()
        return equalsCheck(column, [1,2,3,4,5,6,7,8,9])
    }

    row_solved(index) {
        let row = []
        for(let i = 0; i < this.width; ++i) {
            row.push(this.board[i + index * this.width])
        }
        row.sort()
        return equalsCheck(row, [1,2,3,4,5,6,7,8,9])
    }

    quadrant_solved(board, rowOffset, colOffset) {
        // Use a set to check for duplicates
        let seen = new Set();
      
        // Iterate over the 3x3 quadrant
        for (let i = rowOffset; i < rowOffset + 3; i++) {
          for (let j = colOffset; j < colOffset + 3; j++) {
            const cellValue = this.board[i * this.width + j];
      
            // Check for duplicates in the quadrant
            if (cellValue !== null && seen.has(cellValue)) {
              return false; // Duplicate found
            }
      
            seen.add(cellValue);
          }
        }
      
        return true; // Quadrant is valid
      }

    solved() {
        
        for(let i = 0; i < this.width; ++i)
        {
            if(!this.column_solved(i))
                return false

            console.log(`col: ${i} solved`)
        }

        for(let i = 0; i < this.height; ++i)
        {
            if(!this.row_solved(i))
                return false

            console.log(`row: ${i} solved`)
        }
        
        for (let rowOffset = 0; rowOffset < 9; rowOffset += 3) {
            for (let colOffset = 0; colOffset < 9; colOffset += 3) {
              if (!this.quadrant_solved(board, rowOffset, colOffset))
                return false
            }
        }

        return true
    }
}