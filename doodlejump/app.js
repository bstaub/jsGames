document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const doodler = document.createElement('div')
  let doodlerLeftSpace = 50
  let doodlerBottomSpace = 150
  let isGameOver = false
  let platformCount = 5
  let platforms = []
  let upTimerId
  let downTimerId
  

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
      })
    }
  }

  function createDoodle() {
    grid.appendChild(doodler);
    doodler.classList.add("doodler");
    //set the doodle on first plattform start
    doodlerLeftSpace = platforms[0].left + 12.5; //zentriere doodler (85-60)/2
    doodlerBottomSpace = platforms[0].bottom;
    //set the doodle on first plattform end
    doodler.style.left = doodlerLeftSpace + "px";
    doodler.style.bottom = doodlerBottomSpace + "px";
  }

  function jump() {
    clearInterval(downTimerId)  //each time we jump we clear first the downTimerId
    upTimerId = setInterval(function() {
      doodlerBottomSpace += 7
      doodler.style.bottom = doodlerBottomSpace + 'px'
      if (doodlerBottomSpace > 350) {
        fall()
      }
    },30)
  }

  function fall() {
    clearInterval(upTimerId)
    downTimerId = setInterval(function() {
      doodlerBottomSpace -= 5
      doodler.style.bottom = doodlerBottomSpace + 'px'
      if (doodlerBottomSpace <= 0) {
        gameOver()
      }
    },30)
  }
  
  function start() {
    if (!isGameOver) {
      createPlatforms()  //first create platform then doodler
      createDoodle()
      //movePlatforms()  //single move 4px down
      setInterval(movePlatforms, 30)
      jump()
    }
  }

  function gameOver() {
    console.log('game over')
    isGameOver = true
    clearInterval(upTimerId)
    clearInterval(downTimerId)
  }

  // TODO: attach button to start the game
  start()

})