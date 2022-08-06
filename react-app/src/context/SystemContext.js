import { createContext, useState } from "react";

export const SystemContext = createContext();

function SystemProvider(props) {
    //NOTE: false = Imperial, true = Metric
    const [system, setSystem] = useState(false)

    return (
        <SystemContext.Provider value={{ system, setSystem }}>
            {props.children}
        </SystemContext.Provider>
    )
}

export default SystemProvider;
