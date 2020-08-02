const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

let piece = 'I';

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0 ; y--){
        for (let x = 0; x < arena[y].length; x++){
            if (arena[y][x] === 0) {
                continue outer;
            }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0 ; y < m.length ; y++){
        for (let x = 0; x < m[y].length; x++){
            if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--){
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

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

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.clientWidth, canvas.height);

    drawMatrix(arena, {x: 0, y: 0})
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0){
                context.fillStyle = colours[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        })
    })
}

function merge(arena, player){
    player.matrix.forEach((row, y)=>{
        row.forEach((value, x) => {
            if (value != 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        })
    })
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset()
        arenaSweep()
        updateScore()
    }
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function playerReset() {
    const pieces = 'ILJOTSZ'
    player.matrix = createPiece(piece);
    piece = pieces[pieces.length * Math.random() | 0];
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - 
                    (player.matrix[0].length / 2 | 0);
    updatePiece(piece);
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        updatePrevScore();
        if (player.score >= player.bestScore){
            updateBestScore();
            player.bestScore = player.score;
        }
        player.score = 0;
        updateScore()
    }
}

function playerRotate(dir){
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)){
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offeset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function rotate(matrix, dir){
    for (let y = 0; y < matrix.length; y++){
        for (let x = 0; x < y; x++){
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse())
    } else {
        matrix.reverse()
    }
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
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
    document.getElementById('score').innerText = `Score: ${player.score}`;
}


const colours = [
    null,
    'purple',
    'yellow',
    'orange',
    'purple',
    'red',
    'green',
    'cyan',
]

const arena = createMatrix(10, 20);

const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
    bestScore: 0,
}

document.addEventListener('keydown', event => {
    if (event.keyCode == 37){
        playerMove(-1);
    }
    else if (event.keyCode == 38){
        playerRotate(1);
    }
    else if (event.keyCode == 39){
        playerMove(1)
    }
    else if (event.keyCode == 40){
        playerDrop();
    }
    // else if (event.keyCode == 81){
    //     playerRotate(-1);
    // }
    // else if (event.keyCode == 87){
    //     playerRotate(1);
    // }
    
})

playerReset();
updateScore();
update();