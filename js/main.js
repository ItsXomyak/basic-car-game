(function (){
    let isPause = false;
    let animationId = null

    const car = document.querySelector('.car');
    const trees = document.querySelectorAll('.tree');
    const speed = 10

    const carWidth = car.clientWidth
    const carHeight = car.clientHeight
    const road = document.querySelector('.road');
    const roadWidth = road.clientWidth
    const roadHeight = road.clientHeight
    
    const carCoords = getCoords(car);
    const carMoveInfo = {
      top: null,
      bottom: null,
      left: null,
      right: null
    }

    const treesCoords = []

    for (let i = 0; i < trees.length; i++) {
      const tree = trees[i];
      const coordsTree = getCoords(tree);

      treesCoords.push(coordsTree);
    }

    document.addEventListener('keydown', (event) => {
      if (isPause) {
        return
      }

      const code = event.code;
      
      if (code === 'ArrowUp' && carMoveInfo.top === null) {
        carMoveInfo.top = requestAnimationFrame(carMoveToTop);
      } else if (code === 'ArrowDown' && carMoveInfo.bottom === null) {
        carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom)
      } else if (code === 'ArrowLeft' && carMoveInfo.left === null) {
        carMoveInfo.left = requestAnimationFrame(carMoveToLeft)
      } else if (code === 'ArrowRight' && carMoveInfo.right === null) {
        carMoveInfo.right = requestAnimationFrame(carMoveToRight)
      }
    })

    document.addEventListener('keyup', (event) => {
      const code = event.code;
      if (code === 'ArrowUp') {
        cancelAnimationFrame(carMoveInfo.top)
        carMoveInfo.top = null
      } else if (code === 'ArrowDown') {
        cancelAnimationFrame(carMoveInfo.bottom)
        carMoveInfo.bottom = null
      } else if (code === 'ArrowLeft') {
        cancelAnimationFrame(carMoveInfo.left)
        carMoveInfo.left = null
      } else if (code === 'ArrowRight') {
        cancelAnimationFrame(carMoveInfo.right)
        carMoveInfo.right = null
      }
    })

    function carMoveToTop() {
      const newY = carCoords.y - speed;
      if (newY < 0 ) {
        return
      }
      carCoords.y = newY;
      carMove(carCoords.x, newY);
      carMoveInfo.top = requestAnimationFrame(carMoveToTop);
    }

    function carMoveToBottom() {
      const newY = carCoords.y + speed
      if (newY > roadHeight - carHeight) {
        return
      }
			carCoords.y = newY
			carMove(carCoords.x, newY)
      carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
    }

    function carMoveToLeft() {
      const newX = carCoords.x - speed
      if (newX < -roadWidth / 2.5) {
        return
      }
			carCoords.x = newX
			carMove(newX, carCoords.y)
      carMoveInfo.left = requestAnimationFrame(carMoveToLeft);
    }

    function carMoveToRight() {
      const newX = carCoords.x + speed
      if (newX > roadWidth / 2.5) {
        return
      }
			carCoords.x = newX
			carMove(newX, carCoords.y)
      carMoveInfo.right = requestAnimationFrame(carMoveToRight);
    }

    function carMove(x, y) {
      car.style.transform = `translate(${x}px, ${y}px)`;
    }

    document.addEventListener('keyup', (event) => {console.log("keyup: ", event );})

    animationId = requestAnimationFrame(startGame);
    function startGame(){

    treesAnimation()

     animationId = requestAnimationFrame(startGame);
    }
    
    function treesAnimation() {
      for (let i = 0; i < trees.length; i++) {
				const tree = trees[i]
        const coords = treesCoords[i];

        let newCoordY = coords.y + speed;

        if (newCoordY > window.innerHeight) {
          newCoordY = -370
        }

        treesCoords[i].y = newCoordY

        tree.style.transform = `translate(${coords.x}px, ${newCoordY}px)`
			}

      
    }

    function getCoords(element) {
      const matrix = window.getComputedStyle(element).transform
			const array = matrix.split(',')
      let getXCoord = parseFloat(array[array.length - 2])
			let getYCoord = parseFloat(array[array.length - 1])
      return { x: getXCoord, y: getYCoord };
    }

    const gameButton = document.querySelector('.game-button');
    gameButton.addEventListener('click', () => {
      isPause = !isPause;
      if(isPause) {
        cancelAnimationFrame(animationId)
        cancelAnimationFrame(carMoveInfo.top)
        cancelAnimationFrame(carMoveInfo.bottom)
        cancelAnimationFrame(carMoveInfo.left)
        cancelAnimationFrame(carMoveInfo.right)
        gameButton.children[0].style.display = 'none';
        gameButton.children[1].style.display = 'initial';
      } else {
        animationId = requestAnimationFrame(startGame);
        gameButton.children[0].style.display = 'initial';
        gameButton.children[1].style.display = 'none';
      }
    })
})()