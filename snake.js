

		var canvas 	= 	document.getElementById('canvas')
		var ctx 	= 	canvas.getContext('2d')
		var W 		= 	canvas.width
		var FPS 	= 	5
		var SIZE 	= 	20
		var lose 	= 	0
		var eat 	=	0
		var ls 		=	document.getElementById('lose')
		var eda 	=	document.getElementById('eat')
		var sound 	= 	new Audio('sounds/xryst.mp3')
		var gmv 	= 	new Audio('sounds/gameover.mp3')
		var freeze 	= 	false

		function getRandom(x, y) {
			return Math.floor(Math.random() * 17 + 1);
		}

		function Food() {
			// ЯБЛОКО
			this.x 		= 	getRandom(0, SIZE - 1)
			this.y 		= 	getRandom(0, SIZE - 1)
			// ПОМИДОР
			this.x2 	= 	getRandom(0, SIZE - 1)
			this.y2 	= 	getRandom(0, SIZE - 1)
			// ПИЦЦА
			this.x3 	= 	getRandom(0, SIZE - 1)
			this.y3		= 	getRandom(0, SIZE - 1)

			var s = W / SIZE;

			// ЯБЛОКО
			this.image = new Image(s, s)
			this.image.src = 'icons/appleTwo.png'

			// ПОМИДОР
			this.imageTwo = new Image(s, s)
			this.imageTwo.src = 'icons/tomato.png'

			// ПИЦЦА
			this.imageThree = new Image(s, s);
			this.imageThree.src = 'icons/pizza.png'


			this.draw = () => {
				// ЯБЛОКО
				ctx.drawImage(this.image, this.x * s, this.y * s, s, s)
				// ПОМИДОР
				ctx.drawImage(this.imageTwo, this.x2 * s, this.y2 * s, s, s)
				// ПИЦЦА
				ctx.drawImage(this.imageThree, this.x3 * s, this.y3 * s, s, s)
			}
		}

		function Cactus() {
			this.x 	= 	getRandom(0, SIZE - 1)
			this.y 	= 	getRandom(0, SIZE - 1)

			var s = W / SIZE;
			this.image = new Image(s, s)
			this.image.src = 'icons/cactus.png'

			this.draw = () => {
				ctx.drawImage(this.image, this.x * s, this.y * s, s, s)
			}
		}

		function Part(x, y) {
			this.x = x;
			this.y = y;
		}

		function Snake() {
			this.parts = [
				new Part(10, 10),
				new Part(10, 11),
				new Part(10, 12),
			];

			this.dir = 'up';

			this.update = () => {
				if (this.grow == false) {
					var tail = this.parts.pop();
				}
				else {
					this.grow = false
				}
				var head = this.parts[0];

				var new__head = new Part()

				if (this.dir == 'up') {
					new__head.x = head.x;
					new__head.y = head.y - 1;
				}
				else if (this.dir == 'down') {
					new__head.x = head.x;
					new__head.y = head.y + 1;
				}
				else if (this.dir == 'left') {
					new__head.x = head.x - 1;
					new__head.y = head.y;
				}
				else if (this.dir == 'right') {
					new__head.x = head.x + 1;
					new__head.y = head.y;
				}

				//  ГРАНИЦЫ
				if (new__head.x >= SIZE) {
					lose += 1;
					new__head.x = 0;
					ls.innerHTML = 'Вы зашли за границу ' + lose + ' раз';
				}
				else if (new__head.x <= -1) {
					lose += 1;
					new__head.x = 19;
					ls.innerHTML = 'Вы зашли за границу ' + lose + ' раз';
				}
				else if (new__head.y <= -1) {
					lose += 1;
					new__head.y = 19;
					ls.innerHTML = 'Вы зашли за границу ' + lose + ' раз';
				}
				else if (new__head.y >= SIZE) {
					lose += 1;
					new__head.y = 0;
					ls.innerHTML = 'Вы зашли за границу ' + lose + ' раз';
				}

				if (lose == 10) {
					alert('Вы проиграли, ваш счёт ' + eat)
					window.location.reload()
				}
				this.parts.unshift(new__head);
			}

			this.draw = () => {
				var s = W / SIZE;

				for (let prt of this.parts) {
					ctx.fillStyle = 'green';
					ctx.fillRect(s * prt.x, s * prt.y, s, s);
					ctx.strokeStyle = 'darkgreen';
					ctx.lineWidth = 2;
					ctx.strokeRect(s * prt.x, s * prt.y, s, s);
				}
			}
		}

		var snake = new Snake()
		var feed = []
		var walls = []

		for (let i = 0; i < 3; i++) {
			feed.push(new Food());
		}
		for (let i = 0; i < 10; i++) {
			walls.push(new Cactus());
		}

		function collisions() {
			let head = snake.parts[0];

			for (let i = 0; i < feed.length; i++) {
				let f = feed[i]
				
				if (f.x == head.x && f.y == head.y) {
					feed[i] = new Food();
					sound.play()
					eat += 1;
					eda.innerHTML = 'Ваш счёт ' + eat;
					snake.grow = true

					if (eat == 10) {
						eda.style.color = 'lightgreen'
					}
				}
			}
			for (let i = 0; i < feed.length; i++) {
				let f = feed[i]

				if (f.x2 == head.x && f.y2 == head.y) {
					feed[i] = new Food();
					sound.play()
					eat += 1;
					eda.innerHTML = 'Ваш счёт ' + eat;
					snake.grow = true


					if (eat == 10) {
						eda.style.color = 'lightgreen'
					}
				}
			}
			for (let i = 0; i < feed.length; i++) {
				let f = feed[i]

				if (f.x3 == head.x && f.y3 == head.y) {
					feed[i] = new Food();
					sound.play()
					eat += 1;
					eda.innerHTML = 'Ваш счёт ' + eat;
					snake.grow = true


					if (eat == 10) {
						eda.style.color = 'lightgreen'
					}
				}
			}
			for (let i = 0; i < walls.length; i++) {
				let w = walls[i];

				if (w.x == head.x && w.y == head.y) {
					walls[i] = new Cactus()
					freeze = true
				}
			}

			for (var i = 1; i < snake.parts.length; i++) {
				var part = snake.parts[i]
				if (head.x == part.x && head.y == part.y) {
					freeze = true
				}
			}
		}

		function draw() {
			ctx.clearRect(0, 0, W, W);

			snake.update();

			if (!freeze) {
				collisions();
				snake.draw();
			}

			for (let f of feed) {
				f.draw();
			}

			for (let w of walls) {
				w.draw();
			}

			FPS += 0.01

			setTimeout(draw, 1000 / FPS);
		}
				
		draw()


		document.addEventListener('keydown', event => {
			if (event.key == 'ArrowRight' && snake.dir != 'left') {
				snake.dir = 'right';
			}
			else if (event.key == 'ArrowLeft' && snake.dir != 'right') {
				snake.dir = 'left';
			}
			else if (event.key == 'ArrowUp' && snake.dir != 'down') {
				snake.dir = 'up';
			}
			else if (event.key == 'ArrowDown' && snake.dir != 'up') {
				snake.dir = 'down';
			}
		});




