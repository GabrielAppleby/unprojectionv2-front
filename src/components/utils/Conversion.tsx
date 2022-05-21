import {useCallback, useEffect, useState} from "react";
import {useDataFetching} from "./Fetching";
import {coordsUrlGenerator, imageUrlGenerator} from "../../api";
import {Dataset, Embedding, InterpolationDataset} from "../../constants";


function useConversion<T>(url: string, func: (response: Response | undefined) => Promise<T | undefined>) {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<undefined | T>(undefined);
    const [error, setError] = useState("");
    const {loading: rawLoading, results: rawResults, error: rawError} = useDataFetching(url);


    useEffect(() => {
        async function convertData() {
            try {
                if (!rawLoading) {
                    if (rawError) {
                        setError(rawError);
                    } else if (rawResults) {
                        const results = await func(rawResults)
                        if (results) {
                            setResults(results);
                        } else {
                            setError("An error occurred converting raw db response.");
                        }
                    }
                    setLoading(false);
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }

        convertData();

    }, [rawLoading, rawResults, rawError, func]);

    return {
        error,
        loading,
        results
    };
}

export function useDatabaseImage(dataset: Dataset, id: number) {
    const imageUrl = imageUrlGenerator({dataset, id});
    const cImageConversion = useCallback(async (response) => {
        if (response) {
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        }
        return undefined
    }, [])

    return useConversion<string>(imageUrl, cImageConversion);
}

export function useDatabaseJson<T>(dataset: Dataset, embedding: Embedding) {
    const coordsUrl = coordsUrlGenerator(dataset, embedding);
    const cJsonConversion = useCallback(async (response) => {
        if (response) {
            return await response.json();
        }
        return undefined
    }, [])

    return useConversion<T>(coordsUrl, cJsonConversion);
}
