let net;

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');

  // Make a prediction through the model on our image.
  const imgEl = document.getElementById('img');
  const result = await net.classify(imgEl);
  console.log(result);
  $('.loader').hide();
  $('#result').fadeIn(600);
  $('#result').text(result[0].className + ' with ' + (result[0].probability*100).toFixed(2) + '% probability.');
}

app();