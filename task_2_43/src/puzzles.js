import {setImageUrl} from './common.js';
import {Puzzle} from './puzzle.js';
function Puzzles() {
    this.el = null;
    this.children = [];
    this.init();
}
Puzzles.prototype.init = () => {
    this.el = document.createElement('div');
};
//生成不同的puzzles
Puzzles.prototype.setImages = (images) => {
    let img = null,puzzles = [],i =-1;
    while(images.length){
        img = images.shift();
        if(img.puzzle == 1){
            i++;
            puzzles[i] = [];               
            puzzles[i].push(img);
        }else{
            puzzles[i].addImage(img);
        }
    }
    for(let j = 0;j<puzzles.length;j++){
        let puzzle = new Puzzle();
        puzzle.setImage(puzzles[j]);
    }
}

Puzzles.Puzzle = Puzzle;
export {
    Puzzles
};
