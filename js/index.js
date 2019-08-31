let net;

function handleFiles(files) {
  console.log('Handling Files..');

  // Load the image an show an preview
  const preview = document.getElementById('imagePreview');

  if($('#img-source').length > 0){
    console.log('Element exists!');
    child = document.getElementById('img-source');
    preview.removeChild(child);
  } else{
    console.log('Element does not exist!');
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    if (!file.type.startsWith('image/')){ continue }
    
    const img = document.createElement("img");
    img.classList.add("obj");
    img.id = "img-source";
    img.file = file;
    preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
    
    const reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }

  $('.image-section').show();
  $('#btn-predict').show();
} 

async function predict() {
  // Make a prediction through the model on our image.
  //const imgEl = document.getElementById('img');
  const imgEl = document.getElementById('img-source');
  
  const result = await net.classify(imgEl);
  console.log(result);
  $('.loader').hide();
  $('#result').fadeIn(600);
  $('#result').text(result[0].className + ' with ' + (result[0].probability*100).toFixed(2) + '% probability.');
}

async function app() {
  //document.getElementById("btn-fileSelect").onclick = handleFiles;
  document.getElementById("btn-predict").onclick = predict;

  const fileSelect = document.getElementById("btn-fileSelect"),
  fileElem = document.getElementById("fileElem");

  fileSelect.addEventListener("click", function (e) {
    if (fileElem) {
      fileElem.click();
    }
  }, false);

  // Load the model
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');
}

app();
