import { createContext, useContext, useState } from "react";

const ColorContext = createContext<{ color: 'textPrimary'|'textSecondary', toggleColor: () => void }>(null);

export const ContextTest = ({ children }) => {
    
    const [ color, setColor ] = useState<'textPrimary'|'textSecondary'>('textPrimary');

    const toggleColor = () => setColor(state => state === 'textPrimary' ? 'textSecondary' : 'textPrimary');

    return (
        <ColorContext.Provider value={{ color, toggleColor }}>
            { children }
        </ColorContext.Provider>
    )
}

export const useColor = () => useContext(ColorContext);