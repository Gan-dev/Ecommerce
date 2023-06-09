import { createContext, useEffect, useState } from "react";

const DateContext = createContext()

function DateProvider(props) {
    const [date, setDate] = useState(new Date())

    useEffect(() => {

        setTimeout(() => {
            setDate(new Date())
        }, 1000)

    }, [date])

    return (
        <DateContext.Provider value={{ date, setDate }}>
            {props.children}
        </DateContext.Provider>
    )
}
export { DateContext, DateProvider }