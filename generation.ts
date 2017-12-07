import { self } from "./self";
import { Genome } from "./genome";
import { SaveOutput } from "./saveOutput";

/*GENERATION******************************************************************/
export class Generation {
    genomes: Genome[] = [];
	/**
	 * Generation class.
	 *
	 * Composed of a set of Genomes.
	 *
	 * @constructor
	 */

	/**
	 * Add a genome to the generation.
	 *
	 * @param {genome} Genome to add.
	 * @return void.
	 */
    addGenome(genome: Genome) {
        // Locate position to insert Genome into.
        // The gnomes should remain sorted.
        let i;
        for (i = 0; i < this.genomes.length; i++) {
            // Sort in descending order.
            if (self.options.scoreSort < 0) {
                if (genome.score > this.genomes[i].score) {
                    break;
                }
                // Sort in ascending order.
            } else {
                if (genome.score < this.genomes[i].score) {
                    break;
                }
            }

        }

        // Insert genome into correct position.
        this.genomes.splice(i, 0, genome);
    }

	/**
	 * Breed to genomes to produce offspring(s).
	 *
	 * @param {g1} Genome 1.
	 * @param {g2} Genome 2.
	 * @param {nbChilds} Number of offspring (children).
	 */
    breed(g1: Genome, g2: Genome, nbChilds: number) {
        const datas = [];
        for (let nb = 0; nb < nbChilds; nb++) {
            // Deep clone of genome 1.
            const data = JSON.parse(JSON.stringify(g1));
            for (let i in g2.network.weights) {
                // Genetic crossover
                // 0.5 is the crossover factor.
                // FIXME Really should be a predefined constant.
                if (Math.random() <= 0.5) {
                    data.network.weights[i] = g2.network.weights[i];
                }
            }

            // Perform mutation on some weights.
            for (let i in data.network.weights) {
                if (Math.random() <= self.options.mutationRate) {
                    data.network.weights[i] += Math.random()
                        * self.options.mutationRange
                        * 2
                        - self.options.mutationRange;
                }
            }
            datas.push(data);
        }

        return datas;
    }

	/**
	 * Generate the next generation.
	 *
	 * @return Next generation data array.
	 */
    generateNextGeneration() {
        const nexts: SaveOutput[] = [];

        for (let i = 0; i < Math.round(self.options.elitism * self.options.population); i++) {
            if (nexts.length < self.options.population) {
                // Push a deep copy of ith Genome's Nethwork.
                nexts.push(JSON.parse(JSON.stringify(this.genomes[i].network)));
            }
        }

        for (let i = 0; i < Math.round(self.options.randomBehaviour * self.options.population); i++) {
            const n = JSON.parse(JSON.stringify(this.genomes[0].network));
            for (let k in n.weights) {
                n.weights[k] = self.options.randomClamped();
            }
            if (nexts.length < self.options.population) {
                nexts.push(n);
            }
        }

        let max = 0;
        while (true) {
            for (let i = 0; i < max; i++) {
                // Create the children and push them to the nexts array.
                const childs = this.breed(this.genomes[i], this.genomes[max],
                    (self.options.nbChild > 0 ? self.options.nbChild : 1));
                for (let c in childs) {
                    nexts.push(childs[c].network);
                    if (nexts.length >= self.options.population) {
                        // Return once number of children is equal to the
                        // population by generatino value.
                        return nexts;
                    }
                }
            }
            max++;
            if (max >= this.genomes.length - 1) {
                max = 0;
            }
        }
    }
}