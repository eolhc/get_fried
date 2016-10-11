//board variables
var $boardBtn = $('#createboard');
var $sizes = $('#sizes');
var $board = $('.board');

// create board
var boardSizes = ['3x3','5x5','9x9']

$.each(boardSizes,function(index,sizes) {
  $('#sizes').append($('<option>', {
    text: boardSizes[index],
  }));
});

// function to create board
var makeBoard = function() {
  var $chosenSize = $('#sizes option:selected');
  if ($chosenSize.val() === "3x3") {
    $col = 3;
    var a = 0;
    //create row with tag tr
    var $grid = $('<table>');
    $grid.addClass('grid');
    for (var j = 0; j < $col; j++) {
      var $row = $("<tr>");
      // var $row = $grid.append($('<tr>'));
      // the above would set row as a table
      // if you use append it'll return the variable on the left
        //creates cells for each row
        console.log('row created');
      for (var k = 0; k < $col; k++) {
        var $newcell = $('<td>').text(a++);
        var $cell = $row.append($newcell);
      }
      $grid.append($row);
    }
    console.log($grid);
    $grid.appendTo($board);
  }
}

//
//     console.log("got it!")
//     for (var i = 0; i < $col; i++) {
//       $('<span>').appendTo('#board');
//       for (var j = 0; j < $col; j++) {
//         row[j] = $('<span>');
//         console.log('filled each row')
//       }
//       grid[i] = row;
//     }
//     $('span').appendTo('#board');
//     console.table(grid)
//
//   }
//   else if ($('#sizes option[value="5x5"]')) {
//     $col = 5;
//   }
//   else if ($('#sizes option[value="9x9"]')) {
//     $col = 9;
//   }
// }

//event listener for button click
$boardBtn.on('click', makeBoard)
