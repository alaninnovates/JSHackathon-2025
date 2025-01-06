const sketchProc = (processingInstance) => {
	with (processingInstance) {
		var windowWidth = 300,
			windowHeight = 300;
		size(windowWidth, windowHeight);
		frameRate(5);
		// program code starts here
		// don't touch anything above this line

		// (x,y) of the snake's head position
		var snakePosition = [100, 50];
		// each part of the snake's body
		var snakeBody = [
			[100, 50],
			[90, 50],
			[80, 50],
			[70, 50],
		];

		// the (x,y) position of a fruit, randomly placed
		var fruitPosition = [
			Math.floor((Math.random() * windowWidth) / 10) * 10,
			Math.floor((Math.random() * windowHeight) / 10) * 10,
		];

		// which direction is the snake heading?
		var direction = 'right';

		var score = 0;

		var gameOver = function () {
			fill(255);
			textSize(20);
			text('Game Over', windowWidth / 2 - 50, windowHeight / 2);
			text(
				'Score: ' + score,
				windowWidth / 2 - 50,
				windowHeight / 2 + 30,
			);
			noLoop();
		};

		var draw = function () {
			//drawing everything
			background(71, 71, 71);
			fill(71, 71, 71);
			rect(0, 0, windowWidth, windowHeight);

			if (direction === 'right') {
				snakePosition[0] += 10;
			} else if (direction === 'left') {
				snakePosition[0] -= 10;
			} else if (direction === 'up') {
				snakePosition[1] -= 10;
			} else if (direction === 'down') {
				snakePosition[1] += 10;
			}

			// THIS IS WRONG: snakeBody.unshift(snakePosition);
			snakeBody.unshift([snakePosition[0], snakePosition[1]]);

			if (
				snakePosition[0] === fruitPosition[0] &&
				snakePosition[1] === fruitPosition[1]
			) {
				score += 10;
				fruitPosition = [
					Math.floor((Math.random() * windowWidth) / 10) * 10,
					Math.floor((Math.random() * windowHeight) / 10) * 10,
				];
			} else {
				snakeBody.pop();
			}

			fill(255);
			for (var i = 0; i < snakeBody.length; i++) {
				rect(snakeBody[i][0], snakeBody[i][1], 10, 10);
			}
			fill(255, 0, 0);
			rect(fruitPosition[0], fruitPosition[1], 10, 10);

			if (
				snakePosition[0] > windowWidth ||
				snakePosition[0] < 0 ||
				snakePosition[1] > windowHeight ||
				snakePosition[1] < 0
			) {
				gameOver();
			}
			for (var i = 1; i < snakeBody.length; i++) {
				if (
					snakePosition[0] === snakeBody[i][0] &&
					snakePosition[1] === snakeBody[i][1]
				) {
					gameOver();
				}
			}

			fill(255);
			textSize(20);
			text('Score: ' + score, 10, 30);
		};

		keyPressed = function () {
			var change_to = direction;
			if (keyCode === LEFT) {
				changeTo = 'left';
			} else if (keyCode === RIGHT) {
				changeTo = 'right';
			} else if (keyCode === UP) {
				changeTo = 'up';
			} else if (keyCode === DOWN) {
				changeTo = 'down';
			}
			if (changeTo === 'up' && direction !== 'down') {
				direction = 'up';
			} else if (changeTo === 'down' && direction !== 'up') {
				direction = 'down';
			} else if (changeTo === 'left' && direction !== 'right') {
				direction = 'left';
			} else if (changeTo === 'right' && direction !== 'left') {
				direction = 'right';
			}
		};

		// code ends here
		// don't touch anything below this line
	}
};

const canvas = document.getElementById('myCanvas');
new Processing(canvas, sketchProc);
