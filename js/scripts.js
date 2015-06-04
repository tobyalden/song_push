// JS

var symbols = {
  whiteking: '\u2654',
  whitequeen: '\u2655',
  whiterook: '\u2656',
  whitebishop: '\u2657',
  whiteknight: '\u2658',
  whitepawn: '\u2659',
  blackking: '\u265A',
  blackqueen: '\u265B',
  blackrook: '\u265C',
  blackbishop: '\u265D',
  blackknight: '\u265E',
  blackpawn: '\u265F'
}

function Piece(x, y, type, color) {
  this.x = x,
  this.y = y,
  this.type = type,
  this.color = color,
  this.symbol = symbols[color + type]
}

Piece.prototype.isLegalMove = function(x, y) {

  var pieceAt = getPieceAt(x, y);
  if(pieceAt != null && pieceAt.color === this.color) {
    return false;
  }

  if(this.type === "pawn") {

    if(this.color === "white") {
      var colorMod = -1;
      var startRow = 6;
    } else {
      var colorMod = 1;
      var startRow = 1;
    }

    if(x === this.x) {
      if(this.y == startRow && y === this.y + 2 * colorMod && getPieceAt(x, y) == null) {
        return true;
      } else if(y === this.y + 1 * colorMod && getPieceAt(x, y) == null) {
        return true;
      }
    } else if((x === this.x + 1 || x === this.x - 1) && y === this.y + 1 * colorMod && getPieceAt(x, y) != null) {
        return true;
    } else {
        return false;
    }

  } else if(this.type === "rook") {

    if(x === this.x || y === this.y) {
      return true;
    } else {
      return false;
    }

  }

}

pieces = []

function setUpBoard() {
  pieces.push(new Piece(0, 6, "pawn", "white"));
  pieces.push(new Piece(1, 6, "pawn", "white"));
  pieces.push(new Piece(2, 6, "pawn", "white"));
  pieces.push(new Piece(3, 6, "pawn", "white"));
  pieces.push(new Piece(4, 6, "pawn", "white"));
  pieces.push(new Piece(5, 6, "pawn", "white"));
  pieces.push(new Piece(6, 6, "pawn", "white"));
  pieces.push(new Piece(7, 6, "pawn", "white"));
  pieces.push(new Piece(7, 5, "rook", "white"));
  pieces.push(new Piece(0, 1, "pawn", "black"));
  pieces.push(new Piece(1, 1, "pawn", "black"));
  pieces.push(new Piece(2, 1, "pawn", "black"));
  pieces.push(new Piece(3, 1, "pawn", "black"));
  pieces.push(new Piece(4, 1, "pawn", "black"));
  pieces.push(new Piece(5, 1, "pawn", "black"));
  pieces.push(new Piece(6, 1, "pawn", "black"));
  pieces.push(new Piece(7, 1, "pawn", "black"));
}

function getPieceAt(x, y) {
  for(var i = 0; i < pieces.length; i++) {
    if(x === pieces[i].x && y === pieces[i].y) {
      return pieces[i];
    }
  }
  return null;
}

// jQuery

$(document).ready(function() {

  var selectedPiece = null;

  setUpBoard();
  drawBoard();

  $("td").click(function(event) {
    var coords = (event.target.id).split("-");
    var x = parseInt(coords[0]);
    var y = parseInt(coords[1]);

    if(selectedPiece === null) {
      selectedPiece = getPieceAt(x, y);
    } else if(selectedPiece.isLegalMove(x, y)) {
        if(getPieceAt(x, y) != null) {
          pieces.splice(pieces.indexOf(getPieceAt(x, y)), 1);
        }
        selectedPiece.x = x;
        selectedPiece.y = y;
        selectedPiece = null;
    } else if(x === selectedPiece.x && y === selectedPiece.y) {
        selectedPiece = null;
    } else {

    }

    drawBoard();
  });

  function drawBoard() {
    for(var x = 0; x < 8; x++) {
      for(var y = 0; y < 8; y++) {
        pieceAt = getPieceAt(x, y);
        if(pieceAt != null) {
          if(pieceAt === selectedPiece) {
            $("td#" + x + "-" + y).text(pieceAt.symbol);
            $("td#" + x + "-" + y).addClass("selected");
          } else {
            $("td#" + x + "-" + y).text(pieceAt.symbol);
            $("td#" + x + "-" + y).removeClass("selected");
          }
        } else {
          $("td#" + x + "-" + y).text("X");
          $("td#" + x + "-" + y).removeClass("selected");
        }
      }
    }

    if(selectedPiece != null) {
      $("#selected-piece").text(selectedPiece.symbol)
    } else {
      $("#selected-piece").text("Chess")
    }

  }

});
