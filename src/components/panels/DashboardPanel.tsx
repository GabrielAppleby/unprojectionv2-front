import React, {ChangeEvent, ReactElement, ReactNode, useCallback, useState} from "react";
import {Dashboard, Dataset, Embedding, InterpolationDataset} from "../../constants";
import {useDatabaseJson} from "../utils/Conversion";
import {Coord, InstanceCoord} from "../utils/MiscInterfaces";
import {InterpolationPanel} from "./InterpolationPanel";
import {ClassifierPanel} from "./ClassifiersPanel";

export interface DashboardProps extends Coord {
    readonly embedding: Embedding;
    readonly selectedId: number;
    readonly handleEmbeddingChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) => void;
    readonly handleSelectedIdChange: (id: number) => void;
    readonly handleCoordChange: (coord: Coord) => void;
}

interface PropsWHAT {
    readonly dashboard: Dashboard;

}

export const DashboardPanel: React.FC<PropsWHAT> = ({dashboard}) => {
    const [embedding, setEmbedding] = useState(Embedding.tsne);
    const [selectedId, setSelectedId] = useState(1);
    const [selectedCoord, setSelectedCoord] = useState({x: 5, y: 5});

    const handleSelectedIdChange = useCallback((id) => setSelectedId(id), [])
    const handleCoordChange = useCallback((coord) => setSelectedCoord(coord), [])
    const handleEmbeddingChange = useCallback((props) => setEmbedding(Embedding[props.target.value as Embedding]), [])

    const props: DashboardProps = {
        embedding: embedding,
        handleCoordChange: handleCoordChange,
        handleEmbeddingChange: handleEmbeddingChange,
        handleSelectedIdChange: handleSelectedIdChange,
        selectedId: selectedId,
        x: selectedCoord.x,
        y: selectedCoord.y
    }
    let currentDashboard;
    switch (dashboard) {
        case Dashboard.Interpolation:
            currentDashboard = <InterpolationPanel {...props} />;
            break;
        case Dashboard.Classifiers:
            currentDashboard = <ClassifierPanel {...props} />;
            break;
        case Dashboard.Gradient:
            currentDashboard = <InterpolationPanel {...props} />;
            break;
        case Dashboard.Validation:
            currentDashboard = <InterpolationPanel {...props} />;
            break;
    }
    return (
        <>{currentDashboard}</>
    )
}