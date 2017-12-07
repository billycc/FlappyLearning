import { Layer } from "./Layer";
import { Neuron } from "./Neuron";
import { ISaveOutput } from "./ISaveOutput";
import { Neuroevolution } from "./Neuroevolution";

/*NEURAL NETWORK**************************************************************/
export class Network {
    layers: Layer[] = [];

    /**
     * Generate the Network layers.
     *
     * @param {input} Number of Neurons in Input layer.
     * @param {hidden} Number of Neurons per Hidden layer.
     * @param {output} Number of Neurons in Output layer.
     * @return void
     */
    perceptronGeneration(input: number, hiddens: number[], output: number, self: Neuroevolution): void {
        let index = 0;
        let previousNeurons = 0;
        let layer = new Layer(index);
        layer.populate(input, previousNeurons, self); // number of Inputs will be set to
        // 0 since it is an input layer.
        previousNeurons = input;  // number of input is size of previous layer.
        this.layers.push(layer);
        index++;
        for (let i in hiddens) {
            // Repeat same process as first layer for each hidden layer.
            let layer = new Layer(index);
            layer.populate(hiddens[i], previousNeurons, self);
            previousNeurons = hiddens[i];
            this.layers.push(layer);
            index++;
        }

        layer = new Layer(index);
        layer.populate(output, previousNeurons, self);  // Number of input is equal to
        // the size of the last hidden
        // layer.
        this.layers.push(layer);
    }

	/**
	 * Create a copy of the Network (neurons and weights).
	 *
	 * Returns number of neurons per layer and a flat array of all weights.
	 *
	 * @return Network data.
	 */
    getSave(): ISaveOutput {
        const datas = {
            neurons: [] as number[], // Number of Neurons per layer.
            weights: [] as number[]  // Weights of each Neuron's inputs.
        };

        for (let i = 0; i < this.layers.length; i++) {
            datas.neurons.push(this.layers[i].neurons.length);
            for (let j in this.layers[i].neurons) {
                for (let k in this.layers[i].neurons[j].weights) {
                    // push all input weights of each Neuron of each Layer into a flat
                    // array.
                    datas.weights.push(this.layers[i].neurons[j].weights[k]);
                }
            }
        }
        return datas;
    }

	/**
	 * Apply network data (neurons and weights).
	 *
	 * @param {save} Copy of network data (neurons and weights).
	 * @return void
	 */
    setSave(save: ISaveOutput, self: Neuroevolution) {
        let previousNeurons = 0,
            index = 0,
            indexWeights = 0;
        this.layers = [];
        for (let i in save.neurons) {
            // Create and populate layers.
            const layer = new Layer(index);
            layer.populate(save.neurons[i], previousNeurons, self);
            for (let j in layer.neurons) {
                for (let k in layer.neurons[j].weights) {
                    // Apply neurons weights to each Neuron.
                    layer.neurons[j].weights[k] = save.weights[indexWeights];

                    indexWeights++; // Increment index of flat array.
                }
            }
            previousNeurons = save.neurons[i];
            index++;
            this.layers.push(layer);
        }
    }

	/**
	 * Compute the output of an input.
	 *
	 * @param {inputs} Set of inputs.
	 * @return Network output.
	 */
    compute(inputs: number[], self: Neuroevolution) {
        // Set the value of each Neuron in the input layer.
        for (let i in inputs) {
            if (this.layers[0] && this.layers[0].neurons[i]) {
                this.layers[0].neurons[i].value = inputs[i];
            }
        }

        let prevLayer = this.layers[0]; // Previous layer is input layer.
        for (let i = 1; i < this.layers.length; i++) {
            for (let j in this.layers[i].neurons) {
                // For each Neuron in each layer.
                let sum = 0;
                for (let k in prevLayer.neurons) {
                    // Every Neuron in the previous layer is an input to each Neuron in
                    // the next layer.
                    sum += prevLayer.neurons[k].value
                        * this.layers[i].neurons[j].weights[k];
                }

                // Compute the activation of the Neuron.
                this.layers[i].neurons[j].value = self.activation(sum);
            }
            prevLayer = this.layers[i];
        }

        // All outputs of the Network.
        const out = [];
        const lastLayer = this.layers[this.layers.length - 1];
        for (let i in lastLayer.neurons) {
            out.push(lastLayer.neurons[i].value);
        }
        return out;
    }
}