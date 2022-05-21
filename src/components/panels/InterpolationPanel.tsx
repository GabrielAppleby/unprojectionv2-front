import React, {ChangeEvent, ReactNode, useCallback, useState} from "react";
import {Grid} from "@material-ui/core";
import {EmbeddingChart} from "../charts/EmbeddingChart";
import {Dataset, Embeddings, InterpolationDataset, InterpolationDatasets} from "../../constants";
import {DatabaseImageCard, UnprojectionImageCard} from "../cards/ImageCards";
import {DatasetDropdown, EmbeddingDropdown} from "../controls/Dropdowns";
import {HoveredCoordCard, SelectedIDCard} from "../cards/TextCards";
import {DashboardProps} from "./DashboardPanel";
import {useDatabaseJson} from "../utils/Conversion";
import {InstanceCoord} from "../utils/MiscInterfaces";

export const InterpolationPanel: React.FC<DashboardProps> = ({embedding, selectedId, x, y, handleEmbeddingChange, handleSelectedIdChange, handleCoordChange}) => {
    const [dataset, setDataset] = useState<InterpolationDataset>(InterpolationDataset.mnist);
    const handleDatasetChange = useCallback((props) => setDataset(InterpolationDataset[props.target.value as InterpolationDataset]), [])
    const {loading: coordsLoading, results: coordsResults, error: coordsError} = useDatabaseJson<InstanceCoord[]>(dataset, embedding);


    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Grid container>
                    <Grid item xs={12}>
                        <EmbeddingChart coords={coordsResults}
                                        handleSelectedIdChange={handleSelectedIdChange}
                                        handleCoordChange={handleCoordChange}/>
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
                        <DatasetDropdown options={InterpolationDatasets} value={dataset}
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