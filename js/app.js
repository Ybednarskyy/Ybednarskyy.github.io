$(function() {	
	var size = 4; // Board size ( 4 x 4 )
	var colors = ["#808080", "#ff0000", "#00ff00", "#ffff00", "#0000ff", "#ff00ff", "#00ffff", "#ffffff"];
	var closeCells; // Count cells with className = "close"
	
	$("#start").click(function() {
		var allCells = $("#content > div"); 
		if ( !allCells.length ) {
			for(var i=0; i<(size*size); i++) {
				var cell = $("<div>").attr({"id": i, "class": "close"});
				$("#content").append(cell);
			} // Create cell and fill game board
		} else {
			for(var i=0; i<allCells.length; i++) {
				if (allCells[i].className != "close") {
					allCells[i].className = "close";
					allCells[i].style.background = "";
				} // If game board is fiiled, then close all cells
			}
		}
		closeCells = size * size;
	});
		
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
	
	var CreateColorsArray = function(colors) {
		return Shuffle(colors.concat(colors));
	}; // Create shuffled colors array
	
	var usingColors = CreateColorsArray(colors);
	
	var move = -1;
	var firstClickId;
	var secondClickId;
	
	$("#content").click(function(event) {
		var currentCell = event.target;

			if (currentCell.className == "close") {
				if(move == -1) {
					firstClickId = currentCell.id;				
					currentCell.className = "open";
					currentCell.style.background = usingColors[currentCell.id];	
					move = currentCell;
				} else {
					secondClickId = currentCell.id;
					
					if(usingColors[firstClickId] == usingColors[secondClickId]) {			
						currentCell.className = "open";
						currentCell.style.background = usingColors[currentCell.id];	
						move = -1;
						closeCells -= 2;
						console.log(closeCells);
							if (closeCells == 0) {
								alert("Excellent !!!");
							}
					} else {
						move.className = "close";
						move.style.background = "";
						move = -1;
					}
				}
			}
			
	});	
});

