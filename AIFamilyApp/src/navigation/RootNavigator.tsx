import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import ActivityDetailScreen from '../screens/ActivityDetailScreen';
import DialogueScenarioDetailScreen from '../screens/DialogueScenarioDetailScreen';
import SOSEmergencyScreen from '../screens/SOSEmergencyScreen';
import AIMentorScreen from '../screens/AIMentorScreen';
import ScenarioLibraryScreen from '../screens/ScenarioLibraryScreen';
import ScenarioDetailScreen from '../screens/ScenarioDetailScreen';
import ActionPlanScreen from '../screens/ActionPlanScreen';
import AICalendarScreen from '../screens/AICalendarScreen';
import FamilyContractScreen from '../screens/FamilyContractScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { user, loading } = useAuth();

  // Session yüklenirken loading göster
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00CED1" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          // ✅ Authenticated Stack
          <>
            <Stack.Screen
              name="MainTabs"
              component={BottomTabNavigator}
            />
        <Stack.Screen
          name="LessonDetail"
          component={LessonDetailScreen}
          options={{
            headerShown: true,
            headerTitle: 'Ders Detayı',
            headerStyle: {
              backgroundColor: '#6B5B95',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ActivityDetail"
          component={ActivityDetailScreen}
          options={{
            headerShown: true,
            headerTitle: 'Etkinlik Detayı',
            headerStyle: {
              backgroundColor: '#82BB5D',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="DialogueScenarioDetail"
          component={DialogueScenarioDetailScreen}
          options={{
            headerShown: true,
            headerTitle: 'Diyalog Senaryosu',
            headerStyle: {
              backgroundColor: '#88B0D3',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="SOSEmergency"
          component={SOSEmergencyScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AIMentor"
          component={AIMentorScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ScenarioLibrary"
          component={ScenarioLibraryScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ScenarioDetail"
          component={ScenarioDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ActionPlan"
          component={ActionPlanScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AICalendar"
          component={AICalendarScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FamilyContract"
          component={FamilyContractScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TermsOfService"
          component={TermsOfServiceScreen}
          options={{
            headerShown: false,
          }}
        />
          </>
        ) : (
          // ✅ Unauthenticated Stack
          <>
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
