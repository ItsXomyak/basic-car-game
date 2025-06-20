(function (){
    let isPause = false;
    let animationId = null

    const car = document.querySelector('.car');
    const trees = document.querySelectorAll('.tree');
    const speed = 3
    const tree1 = trees[0]

    animationId
    function startGame(){

    treesAnimation()

     animationId = requestAnimationFrame(startGame);
    }

    function treesAnimation() {
      const newCoord = getYCoord(tree1) + speed;
      tree1.style.transform = `translateY(${newCoord}px)`
    }

    function getYCoord(element) {
      const matrix = window.getComputedStyle(tree1).transform
			const array = matrix.split(',')
			let getYCoord = parseFloat(array[array.length - 1])
      return getYCoord
    }

    const gameButton = document.querySelector('.game-button');
    gameButton.addEventListener('click', () => {
      isPause = !isPause;
      if(isPause) {
        cancelAnimationFrame(animationId)
        gameButton.children[0].style.display = 'none';
        gameButton.children[1].style.display = 'initial';
      } else {
        gameButton.children[0].style.display = 'initial';
        gameButton.children[1].style.display = 'none';
      }
    })
})()