import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function App(): React.JSX.Element {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100;

    if (!weightNum || !heightNum || heightNum <= 0) {
      setMessage('Please enter valid numbers');
      setBmi(null);
      return;
    }

    const bmiValue = weightNum / (heightNum * heightNum);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setMessage('Underweight');
    else if (bmiValue < 24.9) setMessage('Normal weight');
    else if (bmiValue < 29.9) setMessage('Overweight');
    else setMessage('Obese');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.title}>BMI Calculator</Text>
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <View style={styles.button}>
          <Button title="Calculate BMI" onPress={calculateBMI} />
        </View>
        {bmi !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Your BMI: {bmi.toFixed(2)}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginBottom: 24,
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
  },
  message: {
    fontSize: 20,
    marginTop: 10,
    color: '#555',
  },
});
