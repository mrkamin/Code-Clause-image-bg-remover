import { Upload, Submit, Download } from './modules/variables.js';

let imageURL;
let submitCount = 0; // Initialize a submit count variable
const apiKeys = [
  'YVi8LToiXwGNUrsLW1yZ5BVU',
  'VAVAabKLAWxxce63bW5NXyLd',
  'hMLL33KwE1xrDrHDx8k4hD4a',
  '53TQDkpSYnuQMR7Y6PXR5Bhv',
];

Upload.addEventListener('click', () => {
  const fileInput = document.getElementById('bg-img-remov-input');
  const image = fileInput.files[0];

  const orignalImage = document.getElementById('original-image');
  const orignalImageContainer = document.createElement('div');
  orignalImageContainer.classList = 'card';
  imageURL = URL.createObjectURL(image);
  const img = document.createElement('img');
  img.src = imageURL;
  img.alt = 'Original Image';
  img.classList = 'img-thumbnail';
  orignalImageContainer.appendChild(img);
  orignalImage.appendChild(orignalImageContainer);
});

Submit.addEventListener('click', () => {
  const fileInput = document.getElementById('bg-img-remov-input');

  const image = fileInput.files[0];

  const formData = new FormData();
  formData.append('image_file', image);
  formData.append('size', 'auto');

  const apiKey = apiKeys[submitCount % apiKeys.length];
  submitCount++; // Increment the submit count

  fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': apiKey,
    },
    body: formData,
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      imageURL = url;
      const img = document.createElement('img');
      img.classList = 'img-thumbnail';
      img.src = url;
      const imageWithoutBg = document.getElementById('image-withou-bg');
      imageWithoutBg.appendChild(img);
    })
    .catch((error) => {
      console.error(error); // Handle errors properly
    });
});

function clearData() {
  // Clear the original image container
  const originalImage = document.getElementById('original-image');
  originalImage.innerHTML = '';
  const editedImage = document.querySelector('.image-withou-bg');
  editedImage.innerHTML = '';
}

Download.addEventListener('click', () => {
  if (imageURL) {
    const anchorElement = document.createElement('a');
    anchorElement.href = imageURL;
    anchorElement.download = 'mrkamin.png';
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);

    // Clear the data from the DOM
    clearData();
  }
});
