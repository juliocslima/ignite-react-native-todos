import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import closeIcon from '../assets/icons/Xclose/Xclose.png'

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTask: string) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {

  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, taskNewTitleValue);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return(
    <View style={ styles.container }>
      <View style={ styles.infoContainer }>
        <TouchableOpacity
          testID={`button-${task.id}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${task.id}`}
            style={styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
                style={styles.taskMarkerDone}
              />
            )}
          </View>

          
          <TextInput 
            ref={textInputRef}
            style={ task.done ? styles.taskTextDone : styles.taskText}
            value={taskNewTitleValue}
            editable={isEditing}
            onChangeText={setTaskNewTitleValue}
            onSubmitEditing={handleSubmitEditing}
          />
          
        </TouchableOpacity>
      </View>

      <View style={ styles.iconsContainer }>
        { isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Image source={closeIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
      </View>

      <View 
        style={ styles.iconsDivider }
      />

      <TouchableOpacity
        style={{ paddingRight: 16 }}
        onPress={() => removeTask(task.id)}
        disabled={isEditing}
      >
        <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
      </TouchableOpacity>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },

  infoContainer: {
    flex: 1,
  },

  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconsDivider: {
    width: 1.5,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.6)',
    marginHorizontal: 12,
  },

  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 10,
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