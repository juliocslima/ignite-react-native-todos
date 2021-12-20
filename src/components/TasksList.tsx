import React from 'react';
import { FlatList, TouchableOpacityProps } from 'react-native';

import { ItemWrapper } from './ItemWrapper';


import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps extends TouchableOpacityProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}

export function TasksList({ 
  tasks, 
  toggleTaskDone, 
  removeTask, 
  editTask, 
  ...rest 
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem 
              task={item} 
              toggleTaskDone={toggleTaskDone} 
              removeTask={removeTask} 
              editTask={editTask}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}