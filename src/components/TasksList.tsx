import React from 'react';
import { FlatList, Image, TouchableOpacity, TouchableOpacityProps, View, Text, StyleSheet, FlatListProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps extends TouchableOpacityProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, ...rest }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  style={styles.taskMarker}
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                      style={styles.taskMarkerDone}
                    />
                  )}
                </View>

                { item.done ? (
                  <Text 
                    style={styles.taskTextDone}
                  >
                    {item.title}
                  </Text>
                ) : (
                  <Text 
                    style={styles.taskText}
                  >
                    {item.title}
                  </Text>
                ) }
                
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              testID={`edit-${index}`}
              onPress={() => removeTask(item.id)}
            >
              <Image source={editIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              testID={`trash-${index}`}
              onPress={() => removeTask(item.id)}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    marginLeft: 16,
    padding: 2,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})