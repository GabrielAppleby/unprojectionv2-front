export interface Status {
    readonly loading: boolean;
    readonly error: string;
}

export interface Coord {
    readonly x: number;
    readonly y: number;
}

export interface InstanceCoord extends Coord {
    readonly id: number;
    readonly label: number;
}

export interface InstanceCoords {
    coords: InstanceCoord[] | undefined;
}