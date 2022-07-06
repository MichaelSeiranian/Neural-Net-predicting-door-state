function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
  // return sigmoid(x) * (1 - sigmoid(x));
  return y * (1 - y);
}

function getData(file, a, b) {
  var array1 = new Array(a).fill(0).map(() => new Array(b).fill(0));
  fetch(file)
  .then(response => response.text())
  .then(data => {
    var arr = data.split("\r\n");
    for (let i = 0; i < arr.length; i++) {
      var arr1 = arr[i].split(", ");
      for (let j = 0; j < arr1.length; j++) {
        array1[i][j] = Number(arr1[j]);
      }
    }
  });
  return array1;
}

let wandb = [getData('weights_ih.txt', 151, 75), getData('bias_h.txt', 151, 1), getData('weights_ho.txt', 2, 151), getData('bias_o.txt', 2, 1)];

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ih.push(wandb[0]);

    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_h.push(wandb[1]);

    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ho.push(wandb[2]);

    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_o.push(wandb[3]);

    this.learning_rate = 0.1;
  }

  feedforward(input_array) {

    // Generating the Hidden Outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    // activation function!
    hidden.map(sigmoid);

    // Generating the output's output!
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);

    // Sending back to the caller!
    return output.toArray();
  }

}