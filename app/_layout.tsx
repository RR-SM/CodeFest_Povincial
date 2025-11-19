import { Stack } from "expo-router";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import './globals.css';

export default function RootLayout() {
  return (
    <UserProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            />
          </Stack>
        </ThemeProvider>
      </LanguageProvider>
    </UserProvider>
  );
}
