import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Status} from "../utils/MiscInterfaces";

export interface CardProps {
    readonly title: string,
}

export const BaseCard: React.FC<CardProps> = ({title, children}) => {
    return (
        <div>
            <Typography variant="h5">
                {title}
            </Typography>
            {children}
        </div>
    );
}

interface StatusableCardProps extends Status, CardProps {
    readonly content: React.ReactNode
}

export const StatusableCard: React.FC<StatusableCardProps> = (
    {loading, error, title, content}) => {
    let cardContent: React.ReactNode = <p>Loading</p>
    if (!loading) {
        if (!error) {
            cardContent = content
        } else {
            cardContent = <p>An error occurred.</p>
        }
    }

    return (
        <BaseCard title={title}>
            {cardContent}
        </BaseCard>
    );
}

