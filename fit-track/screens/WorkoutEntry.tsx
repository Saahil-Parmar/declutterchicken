import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useWorkout } from '../contexts/WorkoutContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import ExerciseSelection from '../components/ExerciseSelection';

const WorkoutEntry = () => {
  const { addWorkout } = useWorkout();
  const [date, setDate] = useState(new Date());
  const [exercises, setExercises] = useState([]);

  const handleSave = () => {
    const workout = {
      date: date.toISOString().split('T')[0],
      exercises,
    };
    addWorkout(workout);
    // Navigate back to dashboard or show confirmation
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Log Workout</Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => setDate(selectedDate || date)}
      />
      <ExerciseSelection
        exercises={exercises}
        onExercisesChange={setExercises}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutEntry;

