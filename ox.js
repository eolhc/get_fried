//board variables
var $boardBtn = $('#createboard');
var $sizes = $('#sizes');
var $boardArea = [];
var $width = 0;
//$player turn
var $player = 0;
// create board
var boardSizes = ["3 x 3","5 x 5","9 x 9"]
var $text = '';

//SCORE RECORD
var $p1Score = 0;
var $p2Score = 0;

//RECORD USER NAME
var $p1Name = '';
var $p2Name = '';

var logUser1 = function() {
  $p1Name = $($('input')[0]).val();
  $('.p1name').html($p1Name + "\'s Score:&nbsp;");
  $p1Score = 0;
  $p2Score = 0;
  $('.p1score').html($p1Score);
}
var logUser2 = function() {
  $p2Name = $($('input')[1]).val();
  $('.p2name').html($p2Name + "\'s Score:&nbsp;");
  $p1Score = 0;
  $p2Score = 0;
  $('.p2score').html($p2Score);
}

//CREATE OPTIONS FOR BOARD SIZE
$.each(boardSizes,function(index,sizes) {
  $('#sizes').append($('<option>', {
    text: boardSizes[index],
  }));
});

// CREATE BOARD
var makeBoard = function() {
  clearBoard();
  var $chosenSize = $('#sizes option:selected');
  //SET GRID SIZE FOR BOARD
  if ($chosenSize.val() === "3 x 3") {
    $width = 3;
  } else if ($chosenSize.val() === "5 x 5") {
    $width = 5;
  } else if ($chosenSize.val() === "9 x 9") {
    $width = 9;
  }
  //CREATE $boardArea BASED ON THE CHOSEN GRID SIZE
  for (var i = 0; i < $width; i++) {
    var $row = [];
    for (var j = 0; j < $width; j++) {
      $row.push($text);
      }
    $boardArea.push($row);
    }
  console.log($boardArea)
  printBoard();
}

//PRINT CELLS FOR CHOSEN GRID SIZE
var printBoard = function() {
  for (var i = 0; i < $boardArea.length; i++) {
    var $newRow = $('<tr>');
    for (var j = 0; j < $boardArea[i].length; j++) {
      var $newCell = $('<td>'+$boardArea[i][j]+'</td>');
      $newCell.addClass('fry');
      $newCell.appendTo($newRow);
    }
    $newRow.appendTo($('table'));
  }
  addIndexes();
  $('td').on('click',playerGrunt);
}

//UPDATE $CELLS TO HAVE DATA INDEXES
//add indexes to each newly created td
var addIndexes = function() {
  for (var i = 0; i < $width**2; i++) {
        $($('td')[i]).attr('data-index',i);
  }
};

//ADD SOUNDS
var playerGrunt = function(event) {
  if ($player === 0) {
    $('.kanye-grunt').get(0).play();
  } else if ($player === 1) {
    $('.drake-grunt').get(0).play();
  }
  letsPlay(event);
}

//CREATE USERPLAY
var letsPlay = function(event) {
  var $liveCell = $(event.target);
  var $currentIndex = $liveCell.data('index');
//convert 1D to 2D indexes
  var $currentRow = (Math.floor($currentIndex / $width));
  var $currentColumn = ($currentIndex % $width);
//change $boardArea element by accessing the correct 2D index
  if ($liveCell.hasClass('p2') || $liveCell.hasClass('p1')) {
      alert('Other player has already eaten this fry!')
  } else if ($player === 0){
    $liveCell.addClass('p1');
    $boardArea[$currentRow][$currentColumn] = 'p1';
    calculateWin();
    $player += 1;
  } else if ($player === 1) {
    $liveCell.addClass('p2');
    $boardArea[$currentRow][$currentColumn] = 'p2';
    calculateWin();
    $player -= 1;
  }
}


//DETERMINE WIN
//if class is all the same, check whether win
//calculateWin should check whether the neighboring cells  = win
var calculateWin = function() {
//expected text of player
  if ($player === 0) {
    $text = 'p1';
  } else if ($player === 1) {
    $text = 'p2';
  }
  // row increment
  var $numRow = 0;
  // column increment
  var $numCol = 0;
  // diagonal increment
  var $diagLeft = 0;
  var $diagRight = 0;

  //CALCULATE HORIZONTAL AND VERTICAL WINS AND DIAGONAL LEFT WINS
  for (var i = 0; i < $width; i++) {
    for (var j = 0; j < $width; j++) {
      if ($boardArea[i][j] === $text && i === j) {
        $diagLeft += 1;
      }
      if ($boardArea[i][j] === $text) {
        $numRow += 1;
      }
      if ($boardArea[j][i] === $text) {
        $numCol += 1;
      }
      if ($numRow === $width || $numCol === $width || $diagLeft === $width) {
        console.log($boardArea);
        congratulate();
        sing();
        updateScore();
        clearBoard();
      }
    }
    // console.log($text + "diag left is " + $diagLeft);
    // console.log($text + "numrow is " + $numRow);
    // console.log($text + "numcol is " + $numCol);
    $numRow = 0;
    $numCol = 0;
  }

  //CALCULATE DIAGONAL RIGHT WINS

  //if  going ij and ij = text or
  for (var i = 0; i < $width; i++) {
    for (var j = ($width-1); j >= 0; j--) {
      if ($boardArea[i][j] === $text && (i+j) === ($width-1)) {
        $diagRight +=1;
      }
      if ($diagRight === $width) {
        congratulate();
        sing();
        updateScore();
        clearBoard();
      }
    }
    console.log($text + "diagright is " + $diagRight);
  }
}

var clearBoard = function() {
  $text = '';
  $boardArea = [];
  $width = 0;
  $('table').empty();
  if ($player === 0) {
    $('.p1winner').fadeOut(3000);
    } else if ($player === 1) {
    $('.p2winner').fadeOut(3000);
  }
}

var congratulate = function() {
  if ($player === 0) {
    $('.p1winner').fadeIn(3000);
    } else if ($player === 1) {
    $('.p2winner').fadeIn(3000);
  }
}

var sing = function() {
  if ($player === 0) {
    $('.audio1').get(0).play();
  } else if ($player === 1) {
    $('.audio2').get(0).play();
  }
}

//TRACK SCORE

var updateScore = function() {
  if ($player === 0) {
    $p1Score +=1;
    $('.p1score').html($p1Score);
  } else if ($player === 1) {
    $p2Score +=1;
    $('.p2score').html($p2Score);
  }
}

//MAKE BOARD
$boardBtn.on('click', makeBoard);
$('.log-p1').on('click', logUser1);
$('.log-p2').on('click', logUser2);
