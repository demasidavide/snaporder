import { useContext, useState } from "react";
import { createContext, useActionData } from "react-router";

const DelayContext = createContext();

export function DetailsProvider({ children }){
    const [detailDelay, setDetailsDelay] = useState([]);
return(
    <DelayContext.provider
    value={{
        detailDelay, 
        setDetailsDelay
    }}
    >
        {children}
    </DelayContext.provider>
)
}
export const useDetailsDelay = ()=> useContext(DelayContext);