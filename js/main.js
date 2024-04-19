'use strict'

const TIME = 20000
const PASSING_PERCENTAGE = 80

const tabloArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const maxResult = tabloArray.length

const btnStart = document.getElementById('btn-start')
const progressBar = document.getElementById('progressBar').querySelector('.progress-bar')
const overlay = document.querySelector('.overlay')
const buttonsWrap = document.querySelector('.buttons-wrap')
const tabloWrapper = document.querySelector('.tablo-wrapper')
const resultEl = document.querySelector('.result')
const restartBtn = document.querySelector('.close-btn')
const timer = document.querySelector('.timer')
const currentNumber = document.querySelector('.current-number')

let idInterval

let counter = 0
let result = 0

const mixArray = () => {
    let currentIndex = tabloArray.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [tabloArray[currentIndex], tabloArray[randomIndex]] = [
            tabloArray[randomIndex], tabloArray[currentIndex]];
    }
}

const renderTablo = () => {
    tabloWrapper.textContent = ''
    buttonsWrap.classList.add('buttons-wrap--active')

    mixArray()

    tabloArray.forEach((item, index) => {
        const btnBr = `
            <div></div>
        `
        const btnEl = `
        <button
            class="btn btn--size btn-light border border-secondary mb-2"
        >
            ${item}
        </button>
        `

        if ((index + 1) % 3 === 1) {
            tabloWrapper.insertAdjacentHTML('beforeend', btnBr)
        }

        tabloWrapper.insertAdjacentHTML('beforeend', btnEl)
    })
    
}

const renderResult = () => {
    tabloWrapper.classList.remove('buttons-wrap--active')
    buttonsWrap.classList.remove('buttons-wrap--active')
    resultEl.classList.add('result--active')

    const resultText = resultEl.querySelector('.result__text')

    if (Math.floor(maxResult * PASSING_PERCENTAGE / 100) < result) {
        resultText.textContent = 'Вам можно за руль'
    } else {
        resultText.textContent = 'Вам не желательно за руль'
    }
}

const clickHandler = (evt) => {
    const target = evt.target
    
    if (target.closest('.btn')) {
        const value = +target.textContent.trim()
        if (value === counter + 1) {
            result++
        }
        counter++
        renderCurrentNumber()
        renderTablo()

        if (counter >= tabloArray.length) {
            clearInterval(idInterval)
            renderResult()
            progressBar.style.width = '100%'
            progressBar.classList.remove('bg-success')
            progressBar.classList.remove('bg-warning')
            progressBar.classList.remove('bg-danger')
            progressBar.classList.add('bg-success')
            timer.textContent = TIME / 1000
            currentNumber.textContent = counter + 1
        }
    }
}

const renderTimer = (time) => {
    progressBar.style.width = ((time * 100) / TIME ) + '%'
    timer.textContent = time / 1000
    progressBar.classList.remove('bg-success')
    progressBar.classList.remove('bg-warning')
    progressBar.classList.remove('bg-danger')

    if ((time * 100) / TIME > 60) {
        progressBar.classList.add('bg-success')
    } else if ((time * 100) / TIME > 30) {
        progressBar.classList.add('bg-warning')
    } else {
        progressBar.classList.add('bg-danger')
    }
}

const renderCurrentNumber = () => {
    currentNumber.textContent = counter + 1
}

const startTimer = () => {
    let time = TIME

    idInterval = setInterval(() => {
        if ( time > 0) {
            time -= 1000
            renderTimer(time)
        } else {
            clearInterval(idInterval)
            renderResult()
            progressBar.style.width = '100%'
            timer.textContent = TIME / 1000
            currentNumber.textContent = counter + 1
            progressBar.classList.add('bg-success')
            progressBar.classList.remove('bg-warning')
            progressBar.classList.remove('bg-danger')
        }
    }, 1000)
}

const start = () => {
    currentNumber.textContent = counter + 1
    renderTablo()
    startTimer()
}

const restart = () => {
    overlay.classList.remove('overlay--active')
    buttonsWrap.classList.remove('buttons-wrap--active')
    resultEl.classList.remove('result--active')

    counter = 0
    result = 0
    currentNumber.textContent = counter + 1
}

btnStart.addEventListener('click', (evt) => {
    evt.preventDefault()
    document.body.style.overflow = 'hidden'
    overlay.classList.add('overlay--active')
    buttonsWrap.classList.add('buttons-wrap--active')
    start()
})

tabloWrapper.addEventListener('click', (evt) => {
    evt.preventDefault()
    clickHandler(evt)
})

restartBtn.addEventListener('click', () => {
    restart()
})