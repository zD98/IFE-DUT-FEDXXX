function Puzzle(config) {
    this.el = null;
    this.width = config.width || 500;
    this.height = config.height || 300;
    this.children = null;
    this.special = [];
    this.NUM = 0;
    this.init();
}
Puzzle.prototype.init = function() {
    this.layout = 'PUZZLE';
    //如果传入了ele 就用传入的ele 当容器
    this.el = document.createElement('div');
    this.el.classList.add('puzzle');
    this.el.style.width = this.width + 'px';
    this.el.style.height = this.height + 'px'
    this.children = [];
};
//采取这样的方式  就是拼图这里有一个生成占位的function
//另一种是根据不同的配置生成一堆拼图
Puzzle.prototype.setImages = (images)=>{
    
}
Puzzle.prototype.generatePuzzle = (images)=>{
    let el = document.createElement('div');
    let num = this.NUM = images.length > 6 ? 6 : images.length;
    let frag = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
        addImage.call(this, frag, images[i], i);
    }
    this.specialize();
    el.appendChild(frag);
    el.classList.add('puzzleO' + num);
    return el;
}
Puzzle.prototype.setImage = function(images) {
    let num = this.NUM = images.length > 6 ? 6 : images.length;
    let frag = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
        addImage.call(this, frag, images[i], i);
    }
    this.specialize();
    this.el.appendChild(frag);
    this.el.classList.add('puzzleO' + num);
};
Puzzle.prototype.addImage = function(image, config) {
    let layout = this.layout;
    //只有puzzle
    if (this.NUM > 6) {
        throw 'the num > 6';
        return false;
    }
    this.el.classList.remove('puzzleO' + this.NUM);
    this.NUM++;
    this.el.classList.add('puzzleO' + this.NUM);
    this.unspecialize();
    addImage.call(this, this.el, image, this.NUM - 1);
    this.specialize();
    return true;
}
Puzzle.prototype.specialize = function() {
    let num = this.NUM;
    for (let i = 0; i < num; i++) {
        _specialize.call(this, this.children[i], num, i);
    }
};
Puzzle.prototype.unspecialize = function() {
    while (this.special.length != 0) {
        let s = this.special.pop();
        for (let i = 0, len = s.props.length; i < len; i++) {
            this.children[s.inx].style[s.props[i]] = '';
        }
    }
};
//add Image or modify the background
function addImage(frag, url, inx) {
    let container = document.createElement('div');
    setImageClass.call(container, inx);
    setImageUrl.call(container, url);
    this.children.push(container);
    frag.appendChild(container);
}

function setImageClass(i) {
    this.classList.add('img-container');
    this.classList.add('puzzle-' + (i + 1));
}

function setImageUrl(url) {
    this.style.backgroundImage = `url(${url})`;
}

function _specialize(el, container, inx) {
    if (container != 3 && container != 5) {
        return;
    }
    if (container == 3) {
        if (inx == 0) {
            el.style.width = (this.width - this.height / 2) + 'px';
            this.special.push({
                inx: inx,
                props: ['width']
            });
        } else {
            let x = (this.width - this.height / 2) + 'px';
            let y = inx == 1 ? 0 : '100%';
            el.style.width = this.height / 2 + 'px';
            el.style.transform = 'translate(' + x + ',' + y + ')';
            this.special.push({
                inx: inx,
                props: ['width', 'transform']
            });
        }
        return;
    }
    if (container == 5) {
        if (inx == 1) {
            el.style.height = this.width / 3 + 'px';
            this.special.push({
                inx: inx,
                props: ['height']
            });
        }
        if (inx == 4) {
            let y = this.width / 3 + 'px';
            el.style.height = (this.height - this.width / 3) + 'px';
            el.style.transform = 'translate(200%,' + y + ')';
            this.special.push({
                inx: inx,
                props: ['height', 'transform']
            });
        }
    }
}
