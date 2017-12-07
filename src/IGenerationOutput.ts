import { Neuron } from "./Neuron";

export interface IGenerationOutput {
    neurons: Neuron[]; // number of Neurons per layer.
    weights: number[];  // weights of each Neuron's inputs.
}