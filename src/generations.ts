import { Generation } from "./Generation";
import { Network } from "./Network";
import { Genome } from "./Genome";
import { IGenerationOutput } from "./IGenerationOutput";
import { ISaveOutput } from "./ISaveOutput";
import { Neuroevolution } from "./Neuroevolution";


/*GENERATIONS*****************************************************************/
export class Generations {
    generations: Generation[] = [];
	/**
	 * Generations class.
	 *
	 * Hold's previous Generations and current Generation.
	 *
	 * @constructor
	 */

    constructor() {
        this.generations = [];
        // var currentGeneration = new Generation(); // ?billy
    }

	/**
	 * Create the first generation.
	 *
	 * @param {input} Input layer.
	 * @param {input} Hidden layer(s).
	 * @param {output} Output layer.
	 * @return First Generation.
	 */
    firstGeneration(self: Neuroevolution): ISaveOutput[] { // (input, hiddens, output){
        // FIXME input, hiddens, output unused.

        const out = [];
        for (let i = 0; i < self.options.population; i++) {
            // Generate the Network and save it.
            const nn = new Network();
            nn.perceptronGeneration(self.options.network[0],
                self.options.network[1],
                self.options.network[2], self);
            out.push(nn.getSave());
        }

        this.generations.push(new Generation());
        return out;
    }

	/**
	 * Create the next Generation.
	 *
	 * @return Next Generation.
	 */
    nextGeneration(self: Neuroevolution): ISaveOutput[] {
        if (this.generations.length === 0) {
            // Need to create first generation.
            throw Error("generations.length === 0");
        }

        const gen = this.generations[this.generations.length - 1]
            .generateNextGeneration(self);
        this.generations.push(new Generation());
        return gen;
    }

	/**
	 * Add a genome to the Generations.
	 *
	 * @param {genome}
	 * @return False if no Generations to add to.
	 */
    addGenome(genome: Genome, self: Neuroevolution) {
        // Can't add to a Generation if there are no Generations.
        if (this.generations.length == 0) return false;

        // FIXME addGenome returns void.
        return this.generations[this.generations.length - 1].addGenome(genome, self);
    }
}