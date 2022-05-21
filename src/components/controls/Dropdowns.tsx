import React, {ChangeEvent, ReactNode} from "react";
import {FormControl} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Dataset, Embedding} from "../../constants";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface BaseDropdownProps {
    title: string;
    options: string[];
    value: string;
    handleChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) => void;
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

const BaseDropdown: React.FC<BaseDropdownProps> = ({title, options, value, handleChange}) => {
    const classes = useStyles();
    // TODO Type the Change event

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>{title}</InputLabel>
            <Select value={value} onChange={handleChange}>
                {options.map((value, index) => {
                    return <MenuItem key={value} value={value}>{value}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
}

interface DatasetDropdownProps {
    options: Dataset[];
    value: Dataset;
    handleChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) => void;
}

export const DatasetDropdown = (
    props: React.PropsWithChildren<DatasetDropdownProps>
) => {
    const str_options: string[] = props.options.map(x => x.toString())
    return <BaseDropdown title={"Database"} options={str_options} value={props.value}
                         handleChange={props.handleChange}/>
}

interface EmbeddingDropdownProps {
    options: Embedding[];
    value: Embedding;
    handleChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) => void;
}

export const EmbeddingDropdown = (
    props: React.PropsWithChildren<EmbeddingDropdownProps>
) => {
    const str_options: string[] = props.options.map(x => x.toString())
    return <BaseDropdown title={"Embedding"} options={str_options} value={props.value}
                         handleChange={props.handleChange}/>
}
