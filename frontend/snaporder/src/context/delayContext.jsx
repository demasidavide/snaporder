import { useContext, useState } from "react";
import { createContext } from "react";

const DelayContext = createContext();

export function DetailsProvider({ children }){
    const [detailsDelay, setDetailsDelay] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
return(
    <DelayContext.Provider
    value={{
        detailsDelay, 
        setDetailsDelay,
        selectedRows, 
        setSelectedRows
    }}
    >
        {children}
    </DelayContext.Provider>
)
}
export const useDetailsDelay = ()=> useContext(DelayContext);