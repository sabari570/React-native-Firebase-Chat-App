import { auth, db } from "@/services/firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
    user: any | null;
    isAuthenticated: boolean | undefined;
    login: (email: string, password: string) => void;
    register: (email: string, password: string, username: string, profileUrl: string) => void;
    logout: () => void;
}>({
    user: null,
    isAuthenticated: undefined,
    login: () => null,
    register: () => null,
    logout: () => null,
});


export function AuthContextProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

    useEffect(() => {

        // Whenever their is a user in firebase we get the user details from here
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });

        return unSub;
    }, [onAuthStateChanged]);

    const login = async (email: string, password: string) => {
        try {

        } catch (error) {
            console.log("Error while login: ", error)
        }
    }

    const logout = async () => {
        try {

        } catch (error) {
            console.log("Error while logout: ", error)
        }
    }

    const register = async (email: string, password: string, username: string, profileUrl: string) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User after registering: ", response?.user);

            // in setDoc we manually give the documentID
            // in addDoc the documentId is automatically generated
            await setDoc(doc(db, 'users', response?.user?.uid), {
                username, profileUrl, userId: response?.user?.uid
            });
            return { success: true, data: response?.user };
        } catch (error) {
            console.log("Error while register: ", error);
            return { success: false, msg: error }
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error("useAuth must be wrapped inside AuthContextProvider");
    }

    return value;
}