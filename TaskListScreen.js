
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const TaskListScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, [isFocused]);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks !== null) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.log('Error loading tasks:', error);
        }
    };

    const handleTaskPress = (task) => {
        navigation.navigate('Task Details', { task });
    };

    return (
        <View style={{ backgroundColor: "#F1D9E2", flex: 1 }}>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ padding: 10, margin: 10 }} onPress={() => handleTaskPress(item)}>
                        <Text style={{ color: "#E8568E", fontSize: 20 }}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                    <View style={{ borderBottomColor: 'white', borderBottomWidth: 1 }} />
                )}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Add Task')}
                style={{ alignSelf: 'center', backgroundColor: "#E8568E", borderRadius: 5, margin: 20 }}
            >
                <Text style={{ fontSize: 20, margin: 15, fontWeight: "bold", color: "white" }}>Add Task</Text>
            </TouchableOpacity>


        </View>
    );
};

export default TaskListScreen;
