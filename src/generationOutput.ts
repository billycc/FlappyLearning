import { Neuron } from "./neuron";

export interface GenerationOutput {
    neurons:  Neuron[], // Number of Neurons per layer.
    weights: number[]  // Weights of each Neuron's inputs.
}