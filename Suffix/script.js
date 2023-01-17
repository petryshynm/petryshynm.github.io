const getS = selector => document.querySelector(selector)
let cross = getS('img[alt="cross"]')
let burger = getS('img[alt="burger"]')
let nav = getS('nav')

burger.addEventListener('click', () => {
    cross.style.display = 'block'
    nav.style.display = 'block'
    burger.style.display = 'none'
})

cross.addEventListener('click', () => {
    burger.style.display = 'block'
    cross.style.display = 'none'
    nav.style.display = 'none'
    
})