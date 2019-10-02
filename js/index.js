let net;

async function handleFiles(files) {
  console.log('Handling Files..');
  $('#btn-predict').hide();
  $('.loader').show();

  // Load the model
  console.log('Loading mobilenet..');
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');
  
  $('.loader').hide();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    if (!file.type.startsWith('image/')){ continue }
    
    const reader = new FileReader();
    reader.onload = function(e) {
      console.log("reader onload");
      var image = new Image();
      image.src = e.target.result;

      image.onload = function (imageEvent) {
        console.log("image onload");
        var c = document.getElementById("myCanvas");
        
        const width = window.screen.availWidth / 2;
        const scaleFactor = width / image.width;

        c.width = width
        c.height = this.height * scaleFactor;
        var ctx = c.getContext("2d");
        ctx.drawImage(image, 0, 0, width, this.height * scaleFactor);
        $('.img-preview').css("width", width);
        $('.img-preview').css("height", this.height * scaleFactor);
      }
    };
    reader.readAsDataURL(file);
  }

  $('.image-section').show();
  $('#btn-predict').show();
} 

async function predict() {
  // Make a prediction through the model on our image.
  const imgEl = document.getElementById('myCanvas');
  
  const result = await net.classify(imgEl);
  console.log(result);
  $('.loader').hide();
  $('#result').fadeIn(600);
  $('#result').text(result[0].className + ' with ' + (result[0].probability*100).toFixed(2) + '% probability.');
}

async function app() {
  // Init
  //$('.image-section').hide();
  //$('.loader').hide();
  //$('#result').hide();
  document.getElementById("btn-predict").onclick = predict;

  const fileSelect = document.getElementById("btn-fileSelect"),
  fileElem = document.getElementById("fileElem");

  fileSelect.addEventListener("click", function (e) {
    if (fileElem) {
      fileElem.click();
    }
  }, false);


}

app();
