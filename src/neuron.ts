import { self } from "./self";
/*NEURON**********************************************************************/
export class Neuron {
	value: number;
	weights: number[];
	/**
	 * Artificial Neuron class
	 *
	 * @constructor
	 */
	constructor(value?: number, weights?: number[]) {
		this.value = value || 0;
		this.weights = weights || [];
	}

	/**
	 * Initialize number of neuron weights to random clamped values.
	 *
	 * @param {nb} Number of neuron weights (number of inputs).
	 * @return void
	 */
	populate(nb: number) {
		this.weights = [];
		for (let i = 0; i < nb; i++) {
			this.weights.push(self.options.randomClamped());
		}
	}
}