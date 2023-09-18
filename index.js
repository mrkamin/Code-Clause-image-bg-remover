let imageURL;

function upload() {
  const fileInput = document.getElementById('bg-img-remov-input');
  const image = fileInput.files[0];

  const orignalImage = document.getElementById('orignal-image');
  const orignalImageContainer = document.createElement('div');
  orignalImageContainer.classList = 'card';
  imageURL = URL.createObjectURL(image);
  const img = document.createElement('img');
  img.src = imageURL;
  img.alt = 'Original Image';
  img.classList = 'img-thumbnail';
  orignalImageContainer.appendChild(img);
  orignalImage.appendChild(orignalImageContainer);
}

upload();

function submithandler() {
  const fileInput = document.getElementById('bg-img-remov-input');

  const image = fileInput.files[0];

  const formData = new FormData();
  formData.append('image_file', image);
  formData.append('size', 'auto');

  const apiKey = 'VAVAabKLAWxxce63bW5NXyLd';

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
    .catch();
}
submithandler();

function downloadhandler() {
  const anchorElement = document.createElement('a');
  anchorElement.href = imageURL;
  anchorElement.download = 'mrkamin.png';
  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement);
}
downloadhandler();