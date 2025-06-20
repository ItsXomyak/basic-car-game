(function (){
    let isPause = false;
    let animationId = null

    const car = document.querySelector('.car');
    const trees = document.querySelectorAll('.tree');
    const speed = 3
    

    const treesCoords = []

    for (let i = 0; i < trees.length; i++) {
      const tree = trees[i];
      const coordsTree = getCoords(tree);

      treesCoords.push(coordsTree);
    }

    console.log(treesCoords);

    // const coords = getCoords(tree1);

    animationId = requestAnimationFrame(startGame);
    function startGame(){

    treesAnimation()

     animationId = requestAnimationFrame(startGame);
    }
    
    function treesAnimation() {
      for (let i = 0; i < trees.length; i++) {
				const tree = trees[i]
        const coords = treesCoords[i];

        console.log(tree, coords);

        let newCoordY = coords.y + speed;

        if (newCoordY > window.innerHeight) {
          newCoordY = -tree.height
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
        gameButton.children[0].style.display = 'none';
        gameButton.children[1].style.display = 'initial';
      } else {
        animationId = requestAnimationFrame(startGame);
        gameButton.children[0].style.display = 'initial';
        gameButton.children[1].style.display = 'none';
      }
    })
})()