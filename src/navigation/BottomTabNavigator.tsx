import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import ProfileScreen from '../screens/ProfileScreen';
import RepositoriesScreen from '../screens/RepositoriesScreen';
import FollowersScreen from '../screens/FollowersScreen';
import FollowingScreen from '../screens/FollowingScreen';
import { BottomTabParamList, FollowersParamList, FollowingParamList, ProfileParamList, RepositoriesParamList } from '../../types';


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }) {
  return <MaterialCommunityIcons size={24} style={{ marginBottom: -3 }} {...props} />;
}


//  * The Profile tab navigator

const ProfileStack = createStackNavigator<ProfileParamList>();
function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile' }}
        initialParams={{ login: 'aiscodes' }}
      />
    </ProfileStack.Navigator>
  );
}


//  * The Repositories tab navigator

const RepoStack = createStackNavigator<RepositoriesParamList>();
function RepositoriesNavigator() {
  return (
    <RepoStack.Navigator>
      <RepoStack.Screen
        name="RepositoriesScreen"
        component={RepositoriesScreen}
        options={{ headerTitle: 'Repositories' }}
        initialParams={{ login: 'aiscodes' }}
      />
    </RepoStack.Navigator>
  );
}


//  * The Followers tab navigator

const FollowersStack = createStackNavigator<FollowersParamList>();
function FollowersNavigator() {
  return (
    <FollowersStack.Navigator>
      <FollowersStack.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={{ headerTitle: 'Followers' }}
        initialParams={{ login: 'aiscodes' }}
      />
    </FollowersStack.Navigator>
  );
}


//  * The Following tab navigator
 
const FollowingStack = createStackNavigator<FollowingParamList>();
function FollowingNavigator() {
  return (
    <FollowingStack.Navigator>
      <FollowingStack.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{ headerTitle: 'Following' }}
        initialParams={{ login: 'aiscodes' }}
      />
    </FollowingStack.Navigator>
  );
}


//  * Putting all screens and tab navigator together

export default function BottomTabNavigator(): JSX.Element {
  
  return (
    <BottomTab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{ activeTintColor: '#00000' }}
    >
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="account" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Repositories"
        component={RepositoriesNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="source-repository" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Followers"
        component={FollowersNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="account-arrow-left" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Following"
        component={FollowingNavigator}
        options={{
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="account-arrow-right" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
