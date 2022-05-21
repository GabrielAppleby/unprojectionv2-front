import {useEffect, useState} from "react";
import {useModelFetching} from "./Fetching";
import {modelUrlGenerator} from "../../api";
import * as tf from "@tensorflow/tfjs";
import {Dataset, Embedding, InterpolationDataset, Raw} from "../../constants";


export function useUnprojection(x: number, y: number, dataset: Dataset, embedding: Embedding | Raw) {
    const modelUrl = modelUrlGenerator({dataset, embedding});
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<tf.Tensor<tf.Rank.R2> | undefined>(undefined);
    const [error, setError] = useState("");

    const {loading: modelLoading, results: modelResults, error: modelError} = useModelFetching(modelUrl);

    useEffect(() => {
        try {
            if (!modelLoading) {
                if (modelError) {
                    setError(modelError);
                } else if (modelResults) {
                    const nonsense = () => {
                        return tf.tidy(() => {
                            const inpt = tf.tensor([[x, y]]);
                            return modelResults.predict(inpt);
                        });
                    };
                    const unprojectedData = nonsense();
                    // Danger will
                    setResults(unprojectedData as tf.Tensor<tf.Rank.R2>);
                }
            }
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);

    }, [modelLoading, modelResults, modelError, x, y]);

    return {
        error,
        loading,
        results
    };
}


export function useUnprojectionImage(x: number, y: number, dataset: Dataset, embedding: Embedding | Raw) {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<undefined | string>(undefined);
    const [error, setError] = useState("");
    const {loading: rawLoading, results: rawResults, error: rawError} = useUnprojection(x, y, dataset, embedding);

    useEffect(() => {
        try {
            if (!rawLoading) {
                if (rawError) {
                    setError(rawError);
                } else if (rawResults) {
                    const nonsense = () => {
                        return tf.tidy(() => {
                            const res = rawResults.mul(255).cast('int32');
                            // More danger
                            return res.reshape([28, 28]) as tf.Tensor2D;
                        });
                    };
                    const reshaped = nonsense();
                    const canvas = document.createElement('canvas');
                    tf.browser.toPixels(reshaped, canvas).then(() => {
                        tf.dispose([reshaped]);
                        setResults(canvas.toDataURL());
                    });
                }
            }
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);


    }, [rawError, rawLoading, rawResults]);

    return {
        error,
        loading,
        results
    };
}