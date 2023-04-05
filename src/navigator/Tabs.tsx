import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { SearchScreen } from '../screens/SearchScreen';
import { Navigator } from './Navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { Tab2Screen } from './Tab2';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
        sceneContainerStyle={{
            backgroundColor: "white"
        }}
        tabBarOptions={{
            activeTintColor: "#5856D6",
            labelStyle: {
                marginBottom: (Platform.OS === "ios") ? 0 : 10
            },
            style:{
                // backgroundColor: "red",
                position: "absolute",
                backgroundColor: "rgba(255,255,255, 0.92)",
                borderWidth: 0,
                elevation: 0,
                height: (Platform.OS === "ios") ? 80 : 60
            }
        }}
    >
      <Tab.Screen
        name="Home"
        component={Navigator}
        options={{
            tabBarLabel: "Listado",
            tabBarIcon: ( {color} ) => (
                <Icon
                    size= {25}
                    color= {color}
                    name= "list-outline"
                />
            )
        }}
        />
      <Tab.Screen
        name="Tab2Screen"
        component={Tab2Screen}
        options={{
            tabBarLabel: "Búsqueda ",
            tabBarIcon: ( {color} ) => (
                <Icon
                    size= {25}
                    color= {color}
                    name= "search-outline"
                />
            )
        }}/>
    </Tab.Navigator>
  );
}