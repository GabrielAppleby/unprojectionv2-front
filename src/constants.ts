export type Dataset = InterpolationDataset | ClassifierDataset;

export enum InterpolationDataset {
    mnist = "mnist",
    fashion = "fashion"
}

export enum ClassifierDataset {
    classifiers = "classifiers",
    binaryfashion = "binaryfashion"
}

export enum Raw {
    raw = "raw"
}

export const InterpolationDatasets = [InterpolationDataset.mnist, InterpolationDataset.fashion]
export const ClassifierDatasets = [ClassifierDataset.classifiers, ClassifierDataset.binaryfashion]

export enum Embedding {
    tsne = "tsne",
    pca = "pca",
    mds = "mds",
    lle = "lle",
    umap = "umap"
}

export enum Dashboard {
    Interpolation = "Interpolation",
    Classifiers = "Classifiers",
    Validation = "Validation",
    Gradient = "Gradient"
}

export const Dashboards = [Dashboard.Interpolation, Dashboard.Classifiers, Dashboard.Validation, Dashboard.Gradient]

export const Embeddings = [Embedding.tsne, Embedding.pca, Embedding.mds, Embedding.lle, Embedding.umap]