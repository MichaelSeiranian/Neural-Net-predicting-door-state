function getData(file) {
  var array1 = [];
  fetch(file)
  .then(response => response.text())
  .then(data => {
    var arr = data.split(",");
    for (var i = 0; i < arr.length; i++) {
    array1[i]=Number(arr[i]);
    }
  });
  return array1;
}

let nn;

let test_data = [getData('closed test.txt'), getData('closed test 2.txt'), getData('door move test 2.txt'), getData('door move test 3.txt'), getData('door move test 4.txt')];

function setup() {
  let nn = new NeuralNetwork(75, 151, 2);
  
  console.log(nn.feedforward(test_data[0]));
  console.log(nn.feedforward(test_data[1]));
  console.log(nn.feedforward(test_data[2]));
  console.log(nn.feedforward(test_data[3]));
  console.log(nn.feedforward(test_data[4]));

}