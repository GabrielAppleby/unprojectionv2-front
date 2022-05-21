import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import TabPanel from "./components/panels/TabPanel";
import {DashboardPanel} from "./components/panels/DashboardPanel";
import {ClassifierDataset, Dashboard, Dashboards, Dataset, InterpolationDataset} from "./constants";

function App() {
    const [value, setValue] = React.useState(Dashboard.Interpolation);

    const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: Dashboard) => {
        setValue(newValue);
    }, []);



    return (
        <div className="App">
            <TabPanel options={Dashboards} value={value} handleChange={handleChange}/>
            <DashboardPanel dashboard={value}/>
        </div>
    );
}

export default App;
