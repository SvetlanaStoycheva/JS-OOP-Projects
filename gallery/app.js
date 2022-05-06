//Project that displays two sections with photos: nature and city. On image click we will open the correspondent gallery with prev/next buttons. The clicked image will be main image in the gallery (displayed big).
//In this file the project is done with constructor function.

//constructor function that creates the blueprint for image section. We will have two instances: nature and city.
function Gallery(element) {
  //create an instance variable list, that is not array like but array
  this.list = [...element.querySelectorAll('.img')];

  //select the modal elements from the document
  this.modal = getElement('.modal');
  this.modalImg = getElement('.main-img');
  this.imageName = getElement('.image-name');
  this.modalImages = getElement('.modal-images');
  this.closeBtn = getElement('.close-btn');
  this.nextBtn = getElement('.next-btn');
  this.prevBtn = getElement('.prev-btn');

  //bind functions
  this.container = element;
  // this.openModal = this.openModal.bind(this); //we bind openModal to this (to the Gallery)
  // this.container.addEventListener('click', this.openModal); //without the upper line, here this.openModal is pointing to this.container => to clicked section, nature or city

  this.container.addEventListener(
    'click',
    function (e) {
      if (e.target.classList.contains('img')) {
        this.openModal(e.target, this.list);
      }
    }.bind(this)
  );
  //
  this.closeModal = this.closeModal.bind(this);
  this.prevImage = this.prevImage.bind(this);
  this.nextImage = this.nextImage.bind(this);
  this.setModalImgAsMain = this.setModalImgAsMain.bind(this);
}

Gallery.prototype.openModal = function (clickedImage, list) {
  this.setMainImage(clickedImage);
  this.modalImages.innerHTML = list
    .map((image) => {
      return `
    <img
        src='${image.src}'
        title='${image.title}'
        data-id='${image.dataset.id}'
        class='${
          clickedImage.dataset.id === image.dataset.id
            ? 'modal-img selected'
            : 'modal-img'
        }   '     
        alt="city photo"
      />
    `;
    })
    .join('');
  this.modal.classList.add('open');
  this.closeBtn.addEventListener('click', this.closeModal);
  this.prevBtn.addEventListener('click', this.prevImage);
  this.nextBtn.addEventListener('click', this.nextImage);
  this.modalImages.addEventListener('click', this.setModalImgAsMain);
};

Gallery.prototype.setMainImage = function (clickedImage) {
  this.modalImg.src = clickedImage.src;
  this.imageName.textContent = clickedImage.title;
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');

  this.closeBtn.removeEventListener('click', this.closeModal);
  this.prevBtn.removeEventListener('click', this.prevImage);
  this.nextBtn.removeEventListener('click', this.nextImage);
  this.modalImages.removeEventListener('click', this.setModalImgAsMain);
};

Gallery.prototype.nextImage = function () {
  const selected = this.modalImages.querySelector('.selected');
  const next =
    selected.nextElementSibling || this.modalImages.firstElementChild;
  selected.classList.remove('selected');
  next.classList.add('selected');
  this.setMainImage(next);
};
Gallery.prototype.prevImage = function () {
  const selected = this.modalImages.querySelector('.selected');
  const prev =
    selected.previousElementSibling || this.modalImages.lastElementChild;
  selected.classList.remove('selected');
  prev.classList.add('selected');
  this.setMainImage(prev);
};

Gallery.prototype.setModalImgAsMain = function (e) {
  if (e.target.classList.contains('modal-img')) {
    const selected = this.modalImages.querySelector('.selected');
    selected.classList.remove('selected');
    e.target.classList.add('selected');
    this.setMainImage(e.target);
  }
};

//
const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));

//helper function to select elements
function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

//add slideshow functionality to the gallery
// Gallery.prototype.slideShow = function () {
//   setInterval(() => {
//     this.nextImage();
//   }, 3000);
// };

//nature.slideShow();
