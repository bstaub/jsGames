document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const doodler = document.createElement('div')
  const button = document.querySelector('.button')
  let doodlerLeftSpace = 50
  let startPoint = 150
  let doodlerBottomSpace = startPoint
  let isGameOver = false
  let platformCount = 5
  let platforms = []
  let upTimerId
  let downTimerId
  let isJumping = true
  let isGoingLeft = false
  let isGoingRight = false
  let leftTimerId
  let rightTimerId
  let score = 0
  

  function createDoodle() {
    grid.appendChild(doodler)
    doodler.classList.add("doodler")
    //set the doodle on first plattform start
    doodlerLeftSpace = platforms[0].left + 12.5 //zentriere doodler (85-60)/2
    doodlerBottomSpace = platforms[0].bottom
    //set the doodle on first plattform end
    doodler.style.left = doodlerLeftSpace + "px"
    doodler.style.bottom = doodlerBottomSpace + "px"
  }

  class Platform {
    constructor(newPlatBottom) {
      this.bottom = newPlatBottom
      this.left = Math.random() * 315  //random between 400 - 85 = 315
      this.visual = document.createElement('div')


      const visual = this.visual  //need variable that we can use this.visual!
      visual.classList.add('platform')
      visual.style.left = this.left + 'px'
      visual.style.bottom = this.bottom + 'px'
      grid.appendChild(visual)
    }
  }

  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      let platformGap = 600 / platformCount
      let newPlatBottom = 100 + i * platformGap
      console.log(newPlatBottom)
      let newPlatfom = new Platform(newPlatBottom)
      platforms.push(newPlatfom)
      console.log(platforms)
    }
  }

  function movePlatforms() {
    if (doodlerBottomSpace > 200) {  //doodle must be over 200 for moving down, know it is 150
      platforms.forEach(platform => {
        platform.bottom -= 4
        let visual = platform.visual
        visual.style.bottom = platform.bottom + 'px'

        //prevent going platform below
        if(platform.bottom < 10) {
          let firstPlatform = platforms[0].visual
          firstPlatform.remove('platform')
          platforms.shift()
          console.log(platforms)
          score++
          //add new platform at top (600)
          let newPlatform = new Platform(600)
          platforms.push(newPlatform)
        }
      })
    }
  }

  function jump() {
    clearInterval(downTimerId)  //each time we jump we clear first the downTimerId
    isJumping = true
    upTimerId = setInterval(function() {
      doodlerBottomSpace += 7
      doodler.style.bottom = doodlerBottomSpace + 'px'
      if (doodlerBottomSpace > startPoint + 200) {
        fall()
      }
    },20)
  }

  function fall() {
    clearInterval(upTimerId)
    isJumping = false
    downTimerId = setInterval(function() {
      doodlerBottomSpace -= 5
      doodler.style.bottom = doodlerBottomSpace + 'px'
      if (doodlerBottomSpace <= 0) {
        gameOver()
      }
      platforms.forEach(flatform => {
        if ( //collision check
          doodlerBottomSpace >= flatform.bottom &&
          doodlerBottomSpace <= flatform.bottom + 15 &&
          doodlerLeftSpace + 60 >= flatform.left &&
          doodlerLeftSpace <= flatform.left + 85 &&
          !isJumping
        ) {
          console.log("landed");
          startPoint = doodlerBottomSpace
          jump();
        }
      })

    },20)
  }

  function gameOver() {
    console.log('game over')
    isGameOver = true
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild)
    }
    grid.innerHTML = score
    clearInterval(upTimerId)
    clearInterval(downTimerId)
    clearInterval(rightTimerId)
    clearInterval(leftTimerId)
  }

  function control(e) {
    //console.log(e)
    if (e.key === "ArrowLeft") {
      moveLeft()
    } else if (e.key === "ArrowRight") {
      moveRight()
    } else if (e.key === "ArrowUp") {
      moveStraight()
    }
  }

  function moveLeft() {
    if (isGoingRight) {
      clearInterval(rightTimerId)
      isGoingRight = false
    }
    isGoingLeft = true
    leftTimerId = setInterval(function () {
      if (doodlerLeftSpace >= 0) {
        doodlerLeftSpace -= 5
        doodler.style.left = doodlerLeftSpace + "px"
      } else moveRight()

    }, 30);
  }

  function moveRight() {
    if (isGoingLeft) {
      clearInterval(leftTimerId)
      isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(function () {
      if (doodlerLeftSpace <= 340) {
        //400-60
        doodlerLeftSpace += 5
        doodler.style.left = doodlerLeftSpace + "px"
      } else moveLeft()
    }, 30);
  }

  function moveStraight() {
    isGoingLeft = false
    isGoingRight = false
    clearInterval(rightTimerId)
    clearInterval(leftTimerId)
  }


  function start() {
    if (!isGameOver) {
      createPlatforms() //first create platform then doodler
      createDoodle()
      //movePlatforms()  //single move 4px down
      setInterval(movePlatforms, 30)
      jump()
      document.addEventListener('keyup',control)
    }
  }

  // TODO: attach button to start the game
  start();
  button.addEventListener('click', function() {
      location.reload();
  })
  

})