import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {AppBar} from "@material-ui/core";
import React from "react";
import {Dashboard} from "../../constants";

interface TabPanelProps {
    readonly options: Dashboard[]
    readonly value: string;
    readonly handleChange: any;
}


const TabPanel: React.FC<TabPanelProps> = ({options, value, handleChange}) => {
    return (
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} centered>
                {options.map((value) => {
                    return <Tab key={value} value={value} label={value}/>
                })}
            </Tabs>
        </AppBar>
    )
}

export default TabPanel;