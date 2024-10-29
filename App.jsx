import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Redux1 from './redux/Redux1';
import Redux2 from './redux2/Redux2';
import Redux3 from './redux3/Redux3';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Increment/Decrement Counter">
        <Tab.Screen name="Example 1" component={Redux1} />
        <Tab.Screen name="Example 2" component={Redux2} />
        <Tab.Screen name="3" component={Redux3} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
