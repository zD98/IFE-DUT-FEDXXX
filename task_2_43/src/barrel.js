function Barrel(config) {
    config = config || {};
    this.el = null;
    this.width = config.width || 500;
    this.children = [];
    this.num = 0;
    this.init();
}
Barrel.prototype.init = function() {
    this.LAYOUT = 'BARREL';
    //如果传入了ele 就用传入的ele 当容器

    this.children = [];
    //init other set
    this.margin = 0;
    this.left = 10;
    this.top = 10;
    this.targetRowHeight = 300;
    this.targetRowHeightTolerance = 0.25;
    //init container
    if (true) {}
    this.el = document.createElement('div');
    this.el.classList.add('barrel');
    this.el.style.width = this.width + 'px';

};
Barrel.prototype.setImages = function(images) {
    let top = this.top;
    //this dont add all images , by group add th images
    //通过setTimeout 执行
    setTimeout(function(){
        
    },0);
    while (images.length) {
        let result = this._generateRow(images);
        let imgs = images.splice(0, result.rowNum);
        top += (this.top + this.setRowImages(imgs, result.rh, top));
    }
};
Barrel.prototype.addImage = function(image, rowHeight, left, top) {
    //image.radio rowHeight
    let w = rowHeight * image.ratio,
        h = rowHeight;
    let el = document.createElement('div');
    el.classList.add('barrel-item');
    el.style.width = w + 'px';
    el.style.height = h + 'px';
    el.style.left = left + 'px';
    el.style.top = top + 'px';
    let img = document.createElement('div');
    img.classList.add('img-container');
    img.style.backgroundImage = `url(${image.url})`;
    el.appendChild(img);
    this.el.appendChild(el);
    return w;
};

Barrel.prototype.setRowImages = function(images, rh, top) {
    let left = this.left;
    images.forEach(function(img) {
        left += (this.left + this.addImage(img, rh, left, top));
    }.bind(this))
    return rh;
}

Barrel.prototype._generateRow = function (imgs) {
    let rw = 0,
        w = this.width - 2 * this.left;
    let rh = this.targetRowHeight;
    let minh = rh * (1 - this.targetRowHeightTolerance);
    let maxh = rh * (1 + this.targetRowHeightTolerance);
    let rowNum = -1;
    for (let i = 0; i < imgs.length; i++) {
        let nw = rw + imgs[i].ratio;
        let nh = w / nw;
        if (nh < minh) {
            rowNum = i;
            break;
        }
        rw = nw;
        rh = nh;
        w -= this.left;
    }
    if (rowNum == -1) {
        rowNum = imgs.length;
        rh = this.targetRowHeight;
    }
    return {
        rh,
        rowNum
    };
}
export {
    Barrel
};
