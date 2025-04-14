import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 24,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#34A853',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#34A853',
  stepStrokeUnFinishedColor: '#A0A0A0',
  separatorFinishedColor: '#34A853',
  separatorUnFinishedColor: '#A0A0A0',
  stepIndicatorFinishedColor: '#34A853',
  stepIndicatorUnFinishedColor: '#FFFFFF',
  stepIndicatorCurrentColor: '#34A853',
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: '#FFFFFF',
  stepIndicatorLabelFinishedColor: '#FFFFFF',
  stepIndicatorLabelUnFinishedColor: '#A0A0A0',
  labelColor: '#999999',
  labelSize: 14,
  currentStepLabelColor: '#34A853',
};

class Stepper extends Component {
  render() {
    const { labels, currentPosition, totalHours } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Total working hours</Text>
        <Text style={styles.hours}>{totalHours}</Text>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={labels.length}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  hours: {
    fontSize: 16,
    color: '#34A853',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Stepper;
