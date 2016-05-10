const setImageUrl = (url)=>{
    this.style.backgroundImage = `url($(url))`;
}
const generateImgContainer = (img) =>{
    let img = document.createElement('div');
    img.classList.add('img-container');
    img.style.backgroundImage = `url(${image.url})`;
    return img;
 }
export {
    setImageUrl,
    generateImgContainer
};
