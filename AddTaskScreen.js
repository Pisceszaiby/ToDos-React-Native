import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskScreen = ({ navigation, route }) => {
    const [task, setTask] = useState('');
    let existingTask;
    if (route.params && route.params.task) {
        existingTask = route.params.task;
    } else {
        existingTask = undefined;
    }

    useEffect(() => {
        if (existingTask && existingTask != "") {
            setTask(existingTask.title);
        }
    }, [existingTask]);

    const handleAddTask = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            let tasks = storedTasks ? JSON.parse(storedTasks) : [];
            if (existingTask) {
                const updatedTasks = tasks.map((todo) =>
                    todo.id === existingTask.id ? { ...todo, title: task } : todo
                );
                await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            } else {
                if (task === '') return alert('Please add a task')
                else {
                    const newTask = { id: Date.now(), title: task };
                    tasks.push(newTask);
                    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
                }
            }
            navigation.navigate('Task List');
        } catch (error) {
            console.log('Error adding/updating task:', error);
        }
    };

    return (
        <View style={{ backgroundColor: "#F1D9E2", flex: 1 }}>
            <TextInput
                value={task}
                onChangeText={setTask}
                placeholder="Enter task"
                style={{
                    padding: 10, margin: 10, fontSize: 20, color: "#E8568E", borderBottomColor: '#E8568E', borderBottomWidth: 2
                }}
            />
            < TouchableOpacity style={{ alignSelf: 'center', backgroundColor: "#E8568E", borderRadius: 3, margin: 20 }} onPress={handleAddTask}>
                <Text style={{ fontSize: 20, margin: 10, fontWeight: "bold", color: "white" }}>{existingTask ? 'Update Task' : 'Add Task'}</Text>
            </TouchableOpacity>
        </View >
    );
};

export default AddTaskScreen;
