import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(newTaskTitle) {

      const taskExists = tasks.find(task => task.title === newTaskTitle);

      if(taskExists) {
        Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
        return;
      }

      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        done: false
      };

      setTasks(oldState => [...tasks, newTask]);
      

    }
  }

  function handleToggleTaskDone(id: number) {
    console.log(id);
    const updatedTasks = tasks.map(task => {
      if(task.id === id){
        task.done = !task.done;
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(
      task => task.id !== id
    ));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})