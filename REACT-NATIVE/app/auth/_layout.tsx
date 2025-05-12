import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, headerBackTitle: 'Back' }}>
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Create Account',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}