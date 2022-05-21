import React from "react";
import {BaseCard} from "./BaseCards";

interface SelectedIDCardProps {
    readonly id: number
}

export const SelectedIDCard: React.FC<SelectedIDCardProps> = ({id}) => {
    return (
        <BaseCard title={"Selected ID:"}>
            {id}
        </BaseCard>
    );
}

interface HoverCoordCardProps {
    readonly x: number;
    readonly y: number;
}

export const HoveredCoordCard: React.FC<HoverCoordCardProps> = ({x, y}) => {
    const displayX = x.toPrecision(4);
    const displayY = y.toPrecision(4);

    return (
        <BaseCard title={"Hovered Coords:"}>
            x: {displayX}, y: {displayY}
        </BaseCard>
    );
}