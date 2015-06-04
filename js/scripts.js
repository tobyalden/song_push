// JS

var symbols = {
  whitepawn: '\u2659',
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
      if(this.y == startRow && y === this.y + 2 * colorMod) {
        return true;
      } else if(y === this.y + 1 * colorMod) {
        return true;
      }
    } else {
      return false;
    }

  }

}

pieces = []

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

  pieces.push(new Piece(2, 6, "pawn", "white"));
  pieces.push(new Piece(2, 4, "pawn", "white"));
  pieces.push(new Piece(2, 1, "pawn", "black"));

  drawBoard();

  $("td").click(function(event) {
    var coords = (event.target.id).split("-");
    var x = parseInt(coords[0]);
    var y = parseInt(coords[1]);

    // debugger;

    if(selectedPiece === null) {
      selectedPiece = getPieceAt(x, y);
    } else if(selectedPiece.isLegalMove(x, y)) {
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
