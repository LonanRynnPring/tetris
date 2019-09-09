let piece = 'I';





function createPiece(type) {
    if (type === 'T'){
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } 
    else if (type === 'O'){
        return [
            [2, 2],
            [2, 2]
        ];
    }
    else if (type === 'L'){
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    }
    else if (type === 'J'){
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    }
    else if (type === 'Z'){
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    }
    else if (type === 'S'){
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    }
    else if (type === 'I'){
        return [
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0]
        ];
    }
}





function updatePiece(piece) {
    if (piece == 'I'){
        document.getElementById('nextPiece').src = 'images/I.png'
    }
    else if (piece == 'J'){
        document.getElementById('nextPiece').src = 'images/J.png'
    }
    else if (piece == 'O'){
        document.getElementById('nextPiece').src = 'images/O.png'
    }
    else if (piece == 'L'){
        document.getElementById('nextPiece').src = 'images/L.png'
    }
    else if (piece == 'S'){
        document.getElementById('nextPiece').src = 'images/S.png'
    }
    else if (piece == 'Z'){
        document.getElementById('nextPiece').src = 'images/Z.png'
    }
    else if (piece == 'T'){
        document.getElementById('nextPiece').src = 'images/T.png'
    }
}

function updateBestScore() {
    document.getElementById('bestScore').innerText = `Best score: ${player.score}`;
}

function updatePrevScore() {
    document.getElementById('prevScore').innerText = `Prev score: ${player.score}`;
}

function updateScore() {
    document.getElementById('score').innerText = `Score: ${tetris.player.score}`;
}

// const playerElements = document.querySelectorAll('.player');
// console.log(playerElements);



const canvas = document.getElementById('tetris');

const tetris = new Tetris(canvas);

document.addEventListener('keydown', event => {
    const player = tetris.player;
    if (event.keyCode == 37){
        player.move(-1);
    }
    else if (event.keyCode == 38){
        player.rotate(1);
    }
    else if (event.keyCode == 39){
        player.move(1)
    }
    else if (event.keyCode == 40){
        player.drop();
    }
    // else if (event.keyCode == 81){
    //     playerRotate(-1);
    // }
    // else if (event.keyCode == 87){
    //     playerRotate(1);
    // }
    
})

updateScore();
update();