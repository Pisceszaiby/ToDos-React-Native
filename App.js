import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskListScreen from './TaskListScreen';
import TaskDetailsScreen from './TaskDetailsScreen';
import AddTaskScreen from './AddTaskScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Task List">
        <Stack.Screen name="Task List" component={TaskListScreen} />
        <Stack.Screen name="Task Details" component={TaskDetailsScreen} />
        <Stack.Screen name="Add Task" component={AddTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
