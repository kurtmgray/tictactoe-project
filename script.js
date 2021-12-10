const playerFactory = (name, xo) => {
    return {name, xo}
}

const boardObject = (() => {
    let board = []
    const startButton = document.querySelector('.start')
    const squareButtons = document.querySelectorAll('.square')
    const resetButton = document.querySelector('.reset')
    const newPlayersButton = document.querySelector('.restart')
    
    startButton.addEventListener('click', () => {
        game.addPlayer()
        game.reset()
        
    })

    squareButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            btn.innerText = game.currentPlayer.xo
            board[index] = game.currentPlayer.xo  
            btn.style.pointerEvents = 'none'
            game.declareWinner = false
            game.winCheck()
            game.declareTie()
            game.switchPlayers()
            game.turnDisplay()
        })
    })

    resetButton.addEventListener('click', () => {
        board = []
        game.reset()
    })

    newPlayersButton.addEventListener('click', () => {
        board = []
        game.restart()
    })
    
    return {
        get board(){return board},
        squareButtons,
    }  
})()

const game = (() => {
    let playerOne = {}
    let playerTwo = {}
    let currentPlayer
    let declareWinner
    let movesLeft = 9
    const turnDiv = document.querySelector('.turn')
    const formWrapper = document.querySelector('.form-wrapper')

    function addPlayer() {
        playerOne = playerFactory(form.playerOne.value, 'X')
        playerTwo = playerFactory(form.playerTwo.value, 'O')
        currentPlayer = playerOne
        formWrapper.style.display = 'none'
        return {currentPlayer}
    }

    function switchPlayers() {
        if(currentPlayer === playerOne){
            currentPlayer = playerTwo
        } else if(currentPlayer === playerTwo){
            currentPlayer = playerOne
        }
    }

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    function winCheck() {
        winPatterns.forEach((pattern, index) => {
            if(boardObject.board[pattern[0]] === this.currentPlayer.xo && boardObject.board[pattern[1]] === this.currentPlayer.xo && boardObject.board[pattern[2]] === this.currentPlayer.xo){
                this.declareWinner = true
                turnDiv.innerText = `Congratulations ${game.currentPlayer.name}, you win!`
            } else {return}
        })
        movesLeft--
    }

    function declareTie() {
        if(movesLeft === 0 && declareWinner === false){
            game.turnDiv.innerText = 'Tie game!'
        }
    }

    function turnDisplay() {
        if(game.declareWinner === false){
            turnDiv.innerText = `${game.currentPlayer.name}, it's your turn!`
        }
    }

    function reset() {
        console.log(boardObject.board)
        boardObject.squareButtons.forEach(btn => {
            btn.innerText = ''
            btn.style.pointerEvents = ''    
        })
        declareWinner = false
        movesLeft = 9
        game.turnDiv.innerText = `${game.currentPlayer.name}, it's your turn!`    
    }

    function restart() {
        form.reset()
        formWrapper.style.display = ''
    }

    return {
        addPlayer,
        get currentPlayer(){return currentPlayer},
        turnDiv,
        declareWinner,
        switchPlayers,
        winCheck,
        declareTie,
        turnDisplay,
        reset,
        restart,
    }
})()









