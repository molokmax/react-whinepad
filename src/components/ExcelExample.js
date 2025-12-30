import schema from "../config/schema";
import DataContext from "../contexts/DataContext";
import Excel from "./Excel3";
import { useState } from "react";

function ExcelExample() {
    
    const initialData = schema.name.samples.map((_, idx) => {
        const element = {};
        Object.keys(schema).forEach(key => element[key] = schema[key].samples[idx]);
        return element;
    });
    const [data, setData] = useState(initialData);
    function updateData(newData) {
        setData(newData);
    }

    return (
        <DataContext.Provider value={{data, updateData}}>
            <Excel></Excel>
        </DataContext.Provider>
    );
}

export default ExcelExample;
