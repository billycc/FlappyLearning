import { Neuron } from "./Neuron";
import { Neuroevolution } from "./Neuroevolution";

/*LAYER***********************************************************************/
export class Layer {
	neurons: Neuron[];
	/**
	 * Neural Network Layer class.
	 *
	 * @constructor
	 * @param {index} Index of this Layer in the Network.
	 */
	constructor(public id: number) {
		this.id = id || 0;
		this.neurons = [];
	}

	/**
	 * Populate the Layer with a set of randomly weighted Neurons.
	 *
	 * Each Neuron be initialied with nbInputs inputs with a random clamped
	 * value.
	 *
	 * @param {nbNeurons} Number of neurons.
	 * @param {nbInputs} Number of inputs.
	 * @return void
	 */
	populate(nbNeurons: number, nbInputs: number, self: Neuroevolution) {
		this.neurons = [];
		for (let i = 0; i < nbNeurons; i++) {
			const n = new Neuron();
			n.populate(nbInputs, self);
			this.neurons.push(n);
		}
	}
}