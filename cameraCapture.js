class CameraCapture {
  constructor(videoId, canvasId, photoId, takeButtonId, retakeButtonId, uploadButtonId, buttonContainerClass, photoDataId) {
    this.video = document.getElementById(videoId);
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.takeButton = document.getElementById(takeButtonId);
    this.retakeButton = document.getElementById(retakeButtonId);
    this.uploadButton = document.getElementById(uploadButtonId);
    this.buttonContainer = document.querySelector(buttonContainerClass);
    this.photo = document.getElementById(photoId);
    this.photoData = document.getElementById(photoDataId);
    this.capturedImage = '';

    this.initialize();
  }

  initialize() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        this.video.srcObject = stream;
        this.video.play();
      })
      .catch(err => {
        console.error("Error accessing camera: ", err);
      });

    this.takeButton.addEventListener('click', () => this.capturePhoto());
    this.retakeButton.addEventListener('click', () => this.retakePhoto());
    this.uploadButton.addEventListener('click', () => this.uploadImage());
  }

  capturePhoto() {
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;

    this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    this.capturedImage = this.canvas.toDataURL('image/png');
    this.photo.src = this.capturedImage;
    this.photo.style.display = 'block';
    this.video.style.display = 'none';
    this.takeButton.style.display = 'none';
    this.buttonContainer.style.display = 'flex';
    this.photoData.value = this.capturedImage;
  }

  retakePhoto() {
    this.video.style.display = 'block';
    this.photo.style.display = 'none';
    this.buttonContainer.style.display = 'none';
    this.takeButton.style.display = 'block';
  }

  uploadImage() {
    const inputField = document.querySelector('.acf-field.acf-field-image.acf-field-659cc8a60e0ed .acf-input input');
    if (inputField) {
      inputField.value = this.capturedImage;
    }
  }
}

export default CameraCapture;
