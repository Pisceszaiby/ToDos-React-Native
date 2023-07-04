import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskDetailsScreen = ({ navigation, route }) => {
    const { task } = route.params;

    const handleUpdate = () => {
        navigation.navigate('Add Task', { task });
    };

    const handleDelete = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks !== null) {
                const tasks = JSON.parse(storedTasks);
                const updatedTasks = tasks.filter((t) => t.id !== task.id);
                await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
                navigation.navigate('Task List');
            }
        } catch (error) {
            console.log('Error deleting task:', error);
        }
    };


    return (
        <View style={{ backgroundColor: "#F1D9E2", flex: 1, alignItems: 'center' }}>
            <Text style={{ padding: 10, margin: 10, marginTop: 20, fontSize: 20, color: "#E8568E", borderBottomColor: '#E8568E', borderBottomWidth: 2 }}>{task.title}</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ backgroundColor: "black", width: "40%", borderRadius: 2, margin: 10, justifyContent: 'center' }} onPress={handleDelete}>
                    <Text style={{ fontSize: 18, margin: 10, textAlign: 'center', color: 'white' }}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#E8568E", width: "40%", borderRadius: 2, margin: 10, justifyContent: 'center' }} onPress={handleUpdate}>
                    <Text style={{ fontSize: 18, margin: 10, textAlign: 'center', color: 'white' }}>Update</Text>
                </TouchableOpacity>

            </View>
        </View>

    );
};

export default TaskDetailsScreen;
