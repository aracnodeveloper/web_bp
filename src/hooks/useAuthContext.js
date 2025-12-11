import {createContext, useContext} from "react";
import {AuthContextType} from "../interfaces/Auth";

export const AuthContext = createContext(undefined);

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within the AuthContext');
    }
    return context;
}