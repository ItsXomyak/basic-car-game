(function (){
    let isPause = false;
    let animationId = null

    const car = document.querySelector('.car');
    const trees = document.querySelectorAll('.tree');
    const speed = 3
    const tree1 = trees[0]
    const coordsTree1 = getCoords(tree1);

    const coords = getCoords(tree1);

    animationId = requestAnimationFrame(startGame);
    function startGame(){

    treesAnimation()

     animationId = requestAnimationFrame(startGame);
    }
    
    function treesAnimation() {
      const newCoordY = coordsTree1.y + speed;
      coordsTree1.y = newCoordY;
      tree1.style.transform = `translate(${coordsTree1.x}px, ${coordsTree1.y}px)`;
    }

    function getCoords(element) {
      const matrix = window.getComputedStyle(tree1).transform
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