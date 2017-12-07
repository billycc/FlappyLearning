import { merge } from "lodash";
import { Network } from "./Network";
import { Genome } from "./Genome";
import { Generations } from "./Generations";
import { ISaveOutput } from "./ISaveOutput";
import { IOptions } from "./IOptions";

// Declaration of module parameters (options) and default values

export class Neuroevolution {
    static readonly defaultOptions: IOptions = {
        // various factors and parameters (along with default values).
        network: [1, [1], 1],    // Perceptron network structure (1 hidden layer).
        population: 50,          // Population by generation.
        elitism: 0.2,            // Best networks kepts unchanged for the next generation (rate).
        randomBehaviour: 0.2,    // New random networks for the next generation (rate).
        mutationRate: 0.1,       // Mutation rate on the weights of synapses.
        mutationRange: 0.5,      // Interval of the mutation changes on the
        // synapse weight.
        historic: 0,             // Latest generations saved.
        lowHistoric: false,      // Only save score (not the network).
        scoreSort: -1,           // Sort order (-1 = desc, 1 = asc).
        nbChild: 1               // Number of children by breeding.

    };

    constructor(public options: IOptions) {
        this.options = merge({}, Neuroevolution.defaultOptions, options);
    }

    /**
     * Override default options.
     *
     * @param {options} An object of Neuroevolution options.
     * @return void
     */
    set(options: IOptions) {
        this.options = merge({}, this.options, options)
    }

    /**
    * Logistic activation function.
    *
    * @param {a} Input value.
    * @return Logistic function output.
    */
    activation(a: number) {
        const ap = (-a) / 1;
        return (1 / (1 + Math.exp(ap)))
    }

    /**
     * Returns a random value between -1 and 1.
     *
     * @return Random value.
     */
    randomClamped() {
        return Math.random() * 2 - 1;
    }


    /*SELF************************************************************************/
    generations = new Generations();

    /**
     * Reset and create a new Generations object.
     *
     * @return void.
     */
    restart() {
        this.generations = new Generations();
    }

    /**
     * Create the next generation.
     *
     * @return Neural Network array for next Generation.
     */
    nextGeneration() {
        let networks: ISaveOutput[];

        if (this.generations.generations.length === 0) {
            // if no Generations, create first.
            networks = this.generations.firstGeneration(this);
        } else {
            // Otherwise, create next one.
            networks = this.generations.nextGeneration(this);
        }

        // create Networks from the current Generation.
        const nns: Network[] = [];
        networks.forEach(net => {
            const nn = new Network();
            nn.setSave(net, this);
            nns.push(nn);
        });

        if (this.options.lowHistoric) {
            // remove old Networks.
            if (this.generations.generations.length >= 2) {
                const genomes =
                    this.generations
                        .generations[this.generations.generations.length - 2]
                        .genomes;
                for (let i in genomes) {
                    delete genomes[i].network;
                }
            }
        }

        if (this.options.historic !== -1) {
            // remove older generations.
            if (this.generations.generations.length > this.options.historic + 1) {
                this.generations.generations.splice(0,
                    this.generations.generations.length - (this.options.historic + 1));
            }
        }

        return nns;
    }

    /**
     * Adds a new Genome with specified Neural Network and score.
     *
     * @param {network} Neural Network.
     * @param {score} Score value.
     * @return void.
     */
    networkScore(network: Network, score: number): void {
        const gn = new Genome(score, network.getSave());
        this.generations.addGenome(gn, this);
    }
}