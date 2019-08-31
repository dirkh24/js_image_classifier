let net;

function handleFiles(files) {
  console.log('Handling Files..');
  $('.image-section').show();
  $('#btn-predict').show();
  // Load the model
  
} 

async function predict() {
  // Make a prediction through the model on our image.
  const imgEl = document.getElementById('img');
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

  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');
}

app();
