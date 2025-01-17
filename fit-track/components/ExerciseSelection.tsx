import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';

const predefinedExercises = [
  { name: 'Push-ups', muscleGroup: 'Chest' },
  { name: 'Squats', muscleGroup: 'Legs' },
  { name: 'Pull-ups', muscleGroup: 'Back' },
  // Add more predefined exercises
];

interface ExerciseSelectionProps {
  exercises: any[];
  onExercisesChange: (exercises: any[]) => void;
}

const ExerciseSelection: React.FC<ExerciseSelectionProps> = ({ exercises, onExercisesChange }) => {
  const [customExercise, setCustomExercise] = useState({ name: '', muscleGroup: '', sets: '', reps: '' });

  const addExercise = (exercise) => {
    onExercisesChange([...exercises, { ...exercise, sets: parseInt(exercise.sets), reps: parseInt(exercise.reps) }]);
  };

  const addCustomExercise = () => {
    if (customExercise.name && customExercise.muscleGroup && customExercise.sets && customExercise.reps) {
      addExercise(customExercise);
      setCustomExercise({ name: '', muscleGroup: '', sets: '', reps: '' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Exercises</Text>
      <FlatList
        data={predefinedExercises}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.exerciseItem}
            onPress={() => addExercise({ ...item, sets: '3', reps: '10' })}
          >
            <Text>{item.name} - {item.muscleGroup}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
      <View style={styles.customExercise}>
        <TextInput
          style={styles.input}
          placeholder="Exercise Name"
          value={customExercise.name}
          onChangeText={(text) => setCustomExercise({ ...customExercise, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Muscle Group"
          value={customExercise.muscleGroup}
          onChangeText={(text) => setCustomExercise({ ...customExercise, muscleGroup: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Sets"
          value={customExercise.sets}
          onChangeText={(text) => setCustomExercise({ ...customExercise, sets: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Reps"
          value={customExercise.reps}
          onChangeText={(text) => setCustomExercise({ ...customExercise, reps: text })}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={addCustomExercise}>
          <Text style={styles.addButtonText}>Add Custom Exercise</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  customExercise: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ExerciseSelection;

