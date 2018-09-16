module.exports = function solveSudoku(matrix) {

  let empty_array = [];

  for (let i = 0; i < matrix.length; i++){
    for (let j = 0; j < matrix[i].length; j++){
      if(matrix[i][j] == 0){
        empty_array.push([i,j]);
      }
    }
  }

  function solve(sudoku, emptyArray) {
    let row;
    let col;
    let value = 0;
    let found = false;
    for (let i = 0; i < emptyArray.length; i) {
      found = false;
      row = emptyArray[i][0];
      col = emptyArray[i][1];
      value = sudoku[row][col] + 1;

      while(!found && value <= 9) {
        if(checkValue(sudoku, col, row, value)) {
          found = true;
          sudoku[row][col] = value;
          i++;
        } else {
          value++;
        }
      }

      if(!found) {
        sudoku[row][col] = 0;
        i--;
      }
    }
  }

  function checkValue(sudoku, col, row, value) {
    if(checkRow(sudoku, row, value) && checkCol(sudoku, col, value) && checkSegment(sudoku, col, row, value)) {
      return true;
    } else {
      return false;
    }
  };

  function checkRow(sudoku, row, value) {     
    for (let i = 0; i < sudoku[row].length; i++) {        
      if(sudoku[row][i] === value) {
        return false;
      }
    }     
    return true;
  };

  function checkCol(sudoku, col, value) {
    for (let i = 0; i < sudoku.length; i++) {
      if(sudoku[i][col] === value) {
        return false;
      }
    }      
    return true;
  };

  function checkSegment(sudoku, col, row, value) {
    let colStart = 3 * Math.trunc(col/3);
    let rowStart = 3 * Math.trunc(row/3);
  
    for (let i = rowStart; i < rowStart + 3; i++) {
      for (let j = colStart; j < colStart + 3; j++) {
        if(sudoku[i][j] === value) {        
          return false;
        }
      }
    }
    return true;
  };

  solve(matrix, empty_array);

return matrix;

}
