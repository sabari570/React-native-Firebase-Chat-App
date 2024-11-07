export const handleAuthErrors = (error: string) => {
    switch (error) {
        case "auth/invalid-email": return "Email provided is invalid";
        case "auth/weak-password": return "Password should be at least 6 characters";
        case "auth/email-already-in-use": return "Email already registered";
        case "auth/invalid-credential": return "Invalid credentials";
        default: return "Unknown error occured"
    }
}