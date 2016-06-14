var startButton = document.getElementById("start");
startButton.disabled = false;
var BOARD_WIDTH = 400;
var n;
var colorArray = ["purple", "yellow", "red", "blue", "green", "brown", "black", "orange", "pink", "white"]; // Create array of colors
var usedColors = [];
var boardSize = document.getElementById("boardSize");
var level = document.getElementsByName("level");
var move = -1; // used to compare the color of selected cells
var hiddenCount; // count of hidden cells
var nextLevel = 0;
var content = document.getElementById("content");

var startHandler = function() {
	
	n = +boardSize.options[boardSize.selectedIndex].value + nextLevel;
		if(!content.children) {
			CreateTilesBoard(n);
			move = -1;
		} else {
			while(content.firstChild) {
				content.removeChild(content.firstChild);
			}
			CreateTilesBoard(n);
			move = -1;
		}
		
		var colors;
			if(n == 2) {
				colors = 2;
			} else {
				var levelValue = checkedLevelValue(level);
			
					if(levelValue == "junior") {
						colors = 2; // for Junior level count of colors are 2;
					} else if(levelValue == "middle") {
						colors = ColorCount(colorArray.length, n) / 2; // for Middle count of colors are (max count for our board) / 2;
					} else {
						colors = ColorCount(colorArray.length, n); // for Senior count of colors are max for our board
					}
			}
	usedColors = CreateUsedColorArray(n, colors); // Create colors array for our board. Cell color = array[cell.id];
	hiddenCount = n*n;
	
	startButton.disabled = true;
}

function CreateUsedColorArray(n, countOfColors) {
	var cuttedArray = colorArray;
	cuttedArray.length = countOfColors;
	usedColors.length = 0;
	var arr = [];
	var repeat = n*n/countOfColors;
	for(var i=0; i<repeat; i++) {
		arr = arr.concat(cuttedArray);
	}
	return Shuffle(arr);
}

var Shuffle = function(a) {
  for (var i = a.length; --i > 0;) {
    // Получение случайного числа между первым и текущим индексом.
    var r = Math.floor(Math.random() * (i + 1));
    // Перестановка случайно выбранного элемента с текущим.
    var d = a[r];
    a[r] = a[i];
    a[i] = d;
  }
  return a;
}

function CreateTilesBoard(n) {
			for(var i=0; i<n*n; i++) {
			var firstCell = document.createElement("div");
			firstCell.setAttribute("class", "hidden");
			var size = Math.round(BOARD_WIDTH / n - 5);
			firstCell.style.setProperty("width", size+"px");
			firstCell.style.setProperty("height", size+"px");
			
			content.appendChild(firstCell);
			content.children.item(i).setAttribute("id", i);
			content.children.item(i).onclick = clickHandler;
		}	
}

startButton.onclick = startHandler;

// Define count of colors for our board
function ColorCount(length, boardSize) {
	var isRepeat = true;
	var i = 0;
	while (isRepeat) {
		if(boardSize*boardSize % (length-i) ==0 && (length-i) % 2 == 0) {
			return length-i;
			isRepeat = false;
		}
		i++;
	}
}

var clickHandler = function() {
	if(this.className == "hidden") {
		this.className = this.className.replace("hidden", "active"); // replace cell style
		var size = Math.round(BOARD_WIDTH / n - 5);
		this.style.setProperty("width", size+"px");
		this.style.setProperty("height", size+"px");
		
		this.style.background = usedColors[this.id]; // replace cell color (from array)
	
			if(move == -1) {
				move = usedColors[this.id];
			} else if (move != usedColors[this.id]) {
				for(var i=0; i<content.children.length; i++) {
					if(content.children.item(i).className == "hidden") {
						content.children.item(i).className = content.children.item(i).className.replace("hidden", "active");
						var size = Math.round(BOARD_WIDTH / n - 5);
						content.children.item(i).style.setProperty("width", size+"px");
						content.children.item(i).style.setProperty("height", size+"px");
			
						content.children.item(i).style.background = usedColors[content.children.item(i).id];
					}
				}
				alert("Game over");
				startButton.disabled = false;
				if(nextLevel > 0) {
					nextLevel -= 2;
					console.log(nextLevel);
				}
			} else {
				move = -1;
				hiddenCount -= 2;
				if(hiddenCount == 0) {
					alert("Very good !!!");
					nextLevel += 2;
					startHandler();
					console.log(nextLevel);
				}
			}
	}
}

function checkedLevelValue (level) {
	for(var i=0; i<level.length; i++) {
		if(level[i].checked) {
			return level[i].value;
		}
	}
}
