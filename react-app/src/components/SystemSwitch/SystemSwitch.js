import { useState, useContext } from 'react';
// import { SystemContext } from '../../context/SystemContext'

function SystemSwitch() {
    const { system, setSystem } = useContext(SystemContext)
    // const [selectedSystem, setSelectedSystem] = useState(system)
    // console.log(system)

    return (
        <div>
            <label>Metric</label>
            <input
                type='checkbox'
                checked={system}
                onChange={() => !system ? setSystem(true) : setSystem(false)}
            />
        </div>
    )
}

export default SystemSwitch
