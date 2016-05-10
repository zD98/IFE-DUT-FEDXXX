function ZdAlbum(config) {
    this.el = null;
    this.columns = [];
    this.images = [];
    this.init();
}
ZdAlbum.prototype.init = function() {
    if (this.el == null) {
        this.el = document.createElement('div');
        this.el.classList.add('container');
    }
    document.body.appendChild(this.el);
    this._generateColumn()
};
ZdAlbum.prototype._generateColumn = function() {
    let width = parseFloat(window.getComputedStyle(this.el).width);
    this.num = Math.floor(width / 220);
    let frag = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
        let column = document.createElement('div');
        column.classList.add('column');
        this.columns.push({
            el: column,
            curHeight: 0
        });
        frag.appendChild(column);

        this.detect = document.createElement('div');
        this.detect.classList.add('detect');
        frag.appendChild(this.detect);
        this.el.appendChild(frag);
    }
};
ZdAlbum.prototype.setImages = function(images, options) {
    this.images = images;
    let frags = [];
    let columns = this.columns;
    let num = this.columns.length;
    for (let i = 0; i < num; i++) {
        frags.push([]);

        for (let i = 0; i < images.length; i++) {
            let tag = minHeight();
            frags[tag].push(images[i]);
            columns[tag].curHeight += images[i].height;

            for (let i = 0; i < num; i++) {
                this._addImages(this.columns[i], frags[i])
            }
        }
    }
}
ZdAlbum.prototype.addImage = function(image, config) {
    let tag = this.minHeight();
    let item = generateImg(image);
    this.columns[tag].appendChild(item);
};
ZdAlbum.prototype._addImages = function(column, imgs) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < imgs.length; i++) {
        fragment.appendChild(generateImg(imgs[i]));
    }
    column.el.appendChild(fragment);
};
ZdAlbum.prototype.clearImages = function() {
    while (this.el.hasChildNodes()) //当div下还存在子节点时 循环继续
    {
        this.el.removeChild(this.el.firstChild);
    }
};
ZdAlbum.prototype.refresh = function() {
    //this.setImages(this.images);
};
ZdAlbum.prototype.resize = function() {
    this.detectLeft = 0;
    window.onresize = function() {
        let left = this.detect.offsetLeft;
        if (Math.abs(this.detectLeft - left) > 50) {
            console.log('resize');
            this.clearImages();
            this._generateColumn();
            this.setImages(this.images);
        }
    }.bind(this)
    return this;
};
ZdAlbum.prototype.minHeight = function() {
    let min = Number.MAX_VALUE;
    let tag = 0;
    for (let i = 0; i < this.num; i++) {
        if (this.columns[i].curHeight < min) {
            min = this.columns[i].curHeight;
            tag = i;
        }
    }
    return tag;
}

function generateImg(img) {
    let item = document.createElement('div');
    item.classList.add('column-item');
    let container = document.createElement('div');
    container.classList.add('img-container');
    let image = new Image();
    image.src = img.url;
    item.appendChild(container);
    container.appendChild(image);
    return item;
}
