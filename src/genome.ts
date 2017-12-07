import { ISaveOutput } from "./ISaveOutput";

/*GENOME**********************************************************************/
/**
 * Genome class.
 *
 * Composed of a score and a Neural Network.
 *
 * @constructor
 *
 * @param {score}
 * @param {network}
 */
export class Genome {
	constructor(public score: number, public network: ISaveOutput) {
		this.score = score || 0;
		this.network = network || null;
	}
}