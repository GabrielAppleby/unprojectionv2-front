import React from 'react';
import {StatusableCard} from "./BaseCards";
import {useDatabaseImage} from "../utils/Conversion";
import {RawInstanceUrlInfo, UrlInfo} from "../../api";
import {useUnprojectionImage} from "../utils/Unprojection";
import {Coord} from "../utils/MiscInterfaces";


export const DatabaseImageCard: React.FC<RawInstanceUrlInfo> = ({dataset, id}) => {
    const {loading, results, error} = useDatabaseImage(dataset, id);

    const content = <img src={results} height="56" width="56" alt={"Original"}/>

    return (
        <StatusableCard title={"Original"} loading={loading} error={error} content={content}/>
    );
}

interface UnprojectionImageCardProps extends UrlInfo, Coord {
}

export const UnprojectionImageCard: React.FC<UnprojectionImageCardProps> = (
    {dataset, embedding, x, y}) => {
    const {loading, results, error} = useUnprojectionImage(x, y, dataset, embedding);
    const content = <img src={results} height="56" width="56" alt={"Decoded"}/>

    return (
        <StatusableCard title={"Decoded"} loading={loading} error={error} content={content}/>
    );
}