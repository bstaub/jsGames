document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const doodler = document.createElement('div')
  let doodlerLeftSpace = 50


  function createDoodle() {
    grid.appendChild(doodler)
    doodler.classList.add('doodler')
    doodler.style.left = doodlerLeftSpace + 'px'

  }

  createDoodle()

})