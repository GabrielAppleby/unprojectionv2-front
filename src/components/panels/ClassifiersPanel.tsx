import React, {useCallback, useState} from "react";
import {DashboardProps} from "./DashboardPanel";
import {Grid} from "@material-ui/core";
import {EmbeddingChartWithBackground} from "../charts/EmbeddingChart";
import {DatabaseImageCard, UnprojectionImageCard} from "../cards/ImageCards";
import {DatasetDropdown, EmbeddingDropdown} from "../controls/Dropdowns";
import {
    ClassifierDataset,
    ClassifierDatasets, Dataset,
    Embeddings,
} from "../../constants";
import {HoveredCoordCard, SelectedIDCard} from "../cards/TextCards";
import {useDatabaseJson} from "../utils/Conversion";
import {InstanceCoord} from "../utils/MiscInterfaces";

export const ClassifierPanel: React.FC<DashboardProps> = ({embedding, selectedId, x, y, handleEmbeddingChange, handleSelectedIdChange, handleCoordChange}) => {
    const [dataset, setDataset] = useState<ClassifierDataset>(ClassifierDataset.classifiers);
    // @ts-ignore
    const handleDatasetChange = useCallback((props) => setDataset(ClassifierDataset[props.target.value as typeof ClassifierDataset]), [])
    const {loading: coordsLoading, results: coordsResults, error: coordsError} = useDatabaseJson<InstanceCoord[]>(dataset, embedding);


    const imgPath = './background_imgs/' + dataset + '_' + embedding+ '_classifiers.png'

    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Grid container>
                    <Grid item xs={12}>
                        <EmbeddingChartWithBackground coords={coordsResults}
                                        handleSelectedIdChange={handleSelectedIdChange}
                                        handleCoordChange={handleCoordChange}
                                        imgPath={imgPath}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <DatabaseImageCard dataset={dataset} id={selectedId}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <UnprojectionImageCard dataset={dataset} embedding={embedding} x={x} y={y}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DatasetDropdown options={ClassifierDatasets} value={dataset}
                                         handleChange={handleDatasetChange}/>
                        <EmbeddingDropdown options={Embeddings} value={embedding}
                                           handleChange={handleEmbeddingChange}/>
                        <SelectedIDCard id={selectedId}/>
                        <HoveredCoordCard x={x} y={y}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}