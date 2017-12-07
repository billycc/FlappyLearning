import { self } from "./self";
import { Generation } from "./generation";
import { Network } from "./network";
import { Genome } from "./genome";
import { GenerationOutput } from "./generationOutput";
import { SaveOutput } from "./saveOutput";


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
    firstGeneration(): SaveOutput[] { // (input, hiddens, output){
        // FIXME input, hiddens, output unused.

        const out = [];
        for (let  i = 0; i < self.options.population; i++) {
            // Generate the Network and save it.
            const  nn = new Network();
            nn.perceptronGeneration(self.options.network[0],
                self.options.network[1],
                self.options.network[2]);
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
    nextGeneration(): SaveOutput[] {
        if (this.generations.length === 0) {
            // Need to create first generation.
            throw Error("generations.length === 0");
        }

        const gen = this.generations[this.generations.length - 1]
            .generateNextGeneration();
        this.generations.push(new Generation());
        return gen;
    }

	/**
	 * Add a genome to the Generations.
	 *
	 * @param {genome}
	 * @return False if no Generations to add to.
	 */
    addGenome(genome: Genome) {
        // Can't add to a Generation if there are no Generations.
        if (this.generations.length == 0) return false;

        // FIXME addGenome returns void.
        return this.generations[this.generations.length - 1].addGenome(genome);
    }
}