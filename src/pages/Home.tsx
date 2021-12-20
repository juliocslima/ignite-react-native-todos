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
        Alert.alert(
          'Task já cadastrada', 
          'Você não pode cadastrar uma task com o mesmo nome'
        );
        return;
      } else {
        const newTask = {
          id: tasks.length + 1,
          title: newTaskTitle,
          done: false
        };
  
        setTasks(oldState => [...oldState, newTask]);
      }
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
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "NÃO",
          style: "cancel"
        },
        { text: "SIM", onPress: () => {
          setTasks(oldState => oldState.filter(
            task => task.id !== id
          ));
        }}
      ]
    );
  }

  function handleEditTask(id: number, newTitle: string) {
    const updatedTasks = tasks.map(task => ({...task}));
    const taskToBeEdited = updatedTasks.find(task => task.id === id);

    if(!taskToBeEdited) {
      return;
    }

    taskToBeEdited.title = newTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask} 
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