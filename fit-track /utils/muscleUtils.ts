export const getMuscleColor = (lastWorkedDays: number): string => {
  if (lastWorkedDays === 0) {
    return '#4CAF50'; // Green
  } else if (lastWorkedDays === 1) {
    return '#8BC34A'; // Light Green
  } else if (lastWorkedDays >= 2 && lastWorkedDays <= 3) {
    return '#FFC107'; // Orange
  } else {
    return '#F44336'; // Red
  }
};

