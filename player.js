class Player
{
    constructor(tetris)
    {
        this.tetris = tetris;
        this.arena = tetris.arena;

        this.dropCounter = 0;
        this.dropInterval = 500;
    

        this.pos = {x: 0, y: 0};
        this.matrix = null;
        this.score = 0;
        this.bestScore = 0;
        this.reset();
    }

    drop() 
    {
        this.pos.y++;
        if (this.arena.collide(this)) {
            this.pos.y--;
            this.arena.merge(this);
            this.reset()
            this.arena.sweep()
            updateScore()
        }
        this.dropCounter = 0;
    }

    move(dir) 
    {
        this.pos.x += dir;
        if (this.arena.collide(this)) {
            this.pos.x -= dir;
        }
    }

    reset() {
        const pieces = 'ILJOTSZ'
        this.matrix = createPiece(piece);
        piece = pieces[pieces.length * Math.random() | 0];
        this.pos.y = 0;
        this.pos.x = (this.arena.matrix[0].length / 2 | 0) - 
                        (this.matrix[0].length / 2 | 0);
        updatePiece(piece);
        if (this.arena.collide(this)) {
            this.arena.clear()
            updatePrevScore();
            if (this.score >= this.bestScore){
                updateBestScore();
                this.bestScore = this.score;
            }
            this.score = 0;
            updateScore()
        }
    }

    rotate(dir)
    {
        const pos = this.pos.x;
        let offset = 1;
        this._rotateMatrix(this.matrix, dir);
        while (this.arena.collide(this)){
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.matrix[0].length) {
                rotate(this.matrix, -dir);
                this.pos.x = pos;
                return;
            }
        }
    }


    _rotateMatrix(matrix, dir){
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

    update(deltaTime)
    {

        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.drop();
        }
    }
}

// Lots of text be ididi fnro ghuiew cpoks sjnfo