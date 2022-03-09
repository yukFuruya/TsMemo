import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBew5xlRvvVcaceN1eRt2zxbzJVkU_RomI",
  authDomain: "my-first-tsmemo-native.firebaseapp.com",
  projectId: "my-first-tsmemo-native",
  storageBucket: "my-first-tsmemo-native.appspot.com",
  messagingSenderId: "329406136992",
  appId: "1:329406136992:web:479e85eefd2d2387c43fc5",
  measurementId: "G-LPWPD3VH43",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
