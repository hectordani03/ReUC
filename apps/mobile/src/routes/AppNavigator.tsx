// apps/mobile/src/routes/AppNavigator.tsx

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import PlainLayout from '../layouts/PlainLayout'
import AuthLayout from '../layouts/AuthLayout'

import LandingPage from '../features/landing/pages/LandingPage'
import LoginPage from '../features/auth/pages/LoginPageNative'
import RegisterPage from '../features/auth/pages/RegisterPageNative'

const Stack = createNativeStackNavigator()

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{ headerShown: false }}
    >
      {/* Landing page */}
      <Stack.Screen name="Landing">
        {() => (
          <PlainLayout>
            <LandingPage />
          </PlainLayout>
        )}
      </Stack.Screen>

      {/* Login y Register con AuthLayout */}
      <Stack.Screen name="Login">
        {() => (
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        )}
      </Stack.Screen>

      <Stack.Screen name="Register">
        {() => (
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
)

export default AppNavigator
