import { Slot, Stack, useRouter, useSegments } from "expo-router";
import "../global.css";
import { View } from "react-native";
import { AuthContextProvider, useAuth } from "@/context/authContext";
import { useEffect } from "react";
import Toast from "react-native-toast-message";


/** 
 * Folder structure:
 * app
 *  _layout.tsx
 *  index.tsx
 *  signIn.tsx
 *  signUp.tsx
 *  (app) -> protected routes, files written under this are protected
 *    _layout.tsx
 *    home.tsx
 * 
*/


const MainLayout = () => {
  const { isAuthenticated } = useAuth();

  // This hook will return us an array of all the segments in current route
  /** 
  app/
  home/
    index.tsx
  profile/
    [userId].tsx

    And you navigate to /profile/123, the useSegments hook will return an array like:
    ['profile', '123']
   * 
  */
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated or not
    if (typeof isAuthenticated === 'undefined') return;

    // if inApp is true it means we are inside the protected route i.e inside (app)
    const inApp = segments[0] === '(app)';

    // if the user isAuthenticated and not insideApp(inApp) then redirect the user to homepage
    if (isAuthenticated && !inApp) {
      // redirect to home page
      router.replace('/home');
    } else if (!isAuthenticated) {
      // redirect to signin page
      router.replace('/signIn');
    }
  }, [isAuthenticated])

  return <Slot />
}


export default function RootLayout() {
  return (
    <AuthContextProvider>
      {/* Since we need to access the useAuth hook inside the provider */}
      <MainLayout />
      <Toast />
    </AuthContextProvider>
  );
}
