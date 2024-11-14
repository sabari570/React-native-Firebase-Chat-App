import { auth, db } from "@/services/firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react";
import { handleAuthErrors } from "../constants/handleErrors";
import { CHAT_APP_CONSTANTS } from "../constants/constants";

interface AuthResponse {
    success: boolean;
    data?: any;
    msg?: any;
}

export const AuthContext = createContext<{
    user: any | null;
    isAuthenticated: boolean | undefined;
    login: (email: string, password: string) => Promise<AuthResponse>;
    register: (email: string, password: string, username: string, profileUrl: string) => Promise<AuthResponse>;
    logout: () => Promise<AuthResponse>;
}>({
    user: null,
    isAuthenticated: undefined,
    login: () => Promise.resolve({ success: false }),
    register: () => Promise.resolve({ success: false }),
    logout: () => Promise.resolve({ success: false }),
});


export function AuthContextProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

    useEffect(() => {

        // Whenever their is a user in firebase we get the user details from here
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
                localStorage.setItem("userId", user?.uid);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unSub;
    }, [onAuthStateChanged]);

    const updateUserData = async (userId: string) => {
        const docRef = doc(db, CHAT_APP_CONSTANTS.USERS_COLLLECTION, userId);
        const documentSnapshot = await getDoc(docRef);

        if (documentSnapshot.exists()) {
            let userData = documentSnapshot.data();
            setUser({
                ...user,
                username: userData.username,
                email: userData.email,
                profileUrl: userData.profileUrl,
                uid: userId,
            })
        }
    }

    const login = async (email: string, password: string): Promise<AuthResponse> => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, data: response }
        } catch (error: any) {
            console.log("Error while login: ", error);
            return { success: false, msg: handleAuthErrors(error.code) }
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            localStorage.setItem("userId", "");
            return { success: true }
        } catch (error: any) {
            console.log("Error while logout: ", error.code);
            return { success: false, msg: error.code }
        }
    }

    const register = async (email: string, password: string, username: string, profileUrl: string) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            // in setDoc we manually give the documentID
            // in addDoc the documentId is automatically generated
            await setDoc(doc(db, CHAT_APP_CONSTANTS.USERS_COLLLECTION, response?.user?.uid), {
                username, email, profileUrl, userId: response?.user?.uid
            });
            return { success: true, data: response?.user };
        } catch (error: any) {
            console.log("Error while register: ", error);
            return { success: false, msg: handleAuthErrors(error.code) }
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