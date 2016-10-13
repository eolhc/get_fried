var board = ['x','o','x','o','x','o','x','x','x']

$('.board').on('click',function() {

//update move
board[2] = 'd';
//redraw

$('.board').empty();

for (var x = 0; x < board.length; x++ ){
  $('.board').append($('<div>').attr('data-index',x).text(board[x]))
  }
})

for (var x = 0; x < board.length; x++ ){
  $('.board').append($('<div>').attr('data-index',x).text(board[x]))
