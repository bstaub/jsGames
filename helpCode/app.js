document.addEventListener('DOMContentLoaded', () => {
    const eyes = document.querySelectorAll('.eye')
    const mask = document.querySelector('.mask')
    const torso = document.querySelector('.torso')
    const robot = document.querySelector('.robot')
    // FIXME: the position should be diffrent
    let positionX = 0
    let positionY = 0

    function changeEyes() {
      eyes.forEach(eye => eye.classList.toggle('blue-eye'))
    }

    function moveRobot() {
      positionX += 50
      robot.style.left = positionX + 'px';
    }

    function control(e) {
      console.log(e)
      if (e.key === "ArrowLeft") {
        moveLeft();
      } else if (e.key === "ArrowRight") {
        moveRight();
      } else if (e.key === "ArrowUp") {
        moveUp();
      } else if (e.key === "ArrowDown") {
        moveDown();
      }
    }

    function moveLeft() {
      positionX -= 7;
      robot.style.left = positionX + 'px'
    }
    function moveRight() {
      positionX += 7
      robot.style.left = positionX + 'px'
    }
    function moveUp() {
      positionY -= 7;
      robot.style.top = positionY + "px";
    }
    function moveDown() {
      positionY += 7;
      robot.style.top = positionY + "px";
    }

    function start() {
      mask.addEventListener("click", changeEyes);
      torso.addEventListener("click", moveRobot);
      document.addEventListener("keyup", control);
    }
    start()
})