import {Dataset, Embedding, InterpolationDataset, Raw} from "./constants";

interface RawUrlInfo {
    readonly dataset: Dataset
}

export interface UrlInfo extends RawUrlInfo {
    readonly embedding: Embedding | Raw
}

export interface InstanceUrlInfo extends UrlInfo {
    readonly id: number
}

export interface RawInstanceUrlInfo extends RawUrlInfo {
    readonly id: number
}

const baseUrl: string = 'https://vast-everglades-16944.herokuapp.com/';
const baseUrlGenerator = ({dataset, embedding}: UrlInfo): string => {
    return `${baseUrl}${dataset}/${embedding}`;
}

const rawUrlGenerator = (dataset: Dataset): string => {
    return baseUrlGenerator({dataset: dataset, embedding: Raw.raw})
}

export const imageUrlGenerator = ({dataset, id}: RawInstanceUrlInfo): string => {
    return rawUrlGenerator(dataset) + `/image/${id}`;
}
export const coord3DUrlGenerator = ({dataset, id}: RawInstanceUrlInfo): string => {
    return rawUrlGenerator(dataset) + `/coord/${id}`;
}
export const modelUrlGenerator = ({dataset, embedding}: UrlInfo): string => {
    return baseUrlGenerator({dataset, embedding}) + `/model`;
}
export const coordsUrlGenerator = (dataset: Dataset, embedding: Embedding): string => {
    return baseUrlGenerator({dataset, embedding}) + `/coords`;
}
