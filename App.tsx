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
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import GenderSelector from './src/components/GenderSelector';
import LinearGradient from 'react-native-linear-gradient';

export default function App(): React.JSX.Element {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<string | null>(null);
  const [bmi, setBmi] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100;
    const ageNum = parseInt(age, 10);

    if (!weightNum || !heightNum || !ageNum || !gender) {
      setMessage('Please fill in all fields');
      setBmi(null);
      return;
    }

    if (heightNum <= 0 || weightNum <= 0 || ageNum <= 0) {
      setMessage('Please enter valid positive numbers');
      setBmi(null);
      return;
    }

    const bmiValue = weightNum / (heightNum * heightNum);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setMessage('Underweight');
    } else if (bmiValue < 24.9) {
      setMessage('Normal weight');
    } else if (bmiValue < 29.9) {
      setMessage('Overweight');
    } else {
      setMessage('Obese');
    }
  };

  const resetFields = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setGender(null);
    setBmi(null);
    setMessage('');
  };

  return (
    <LinearGradient colors={['#E8F5E9', '#C8E6C9']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>Smart BMI Calculator</Text>

            <GenderSelector gender={gender} setGender={setGender} />

            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholder="Age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
              <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholder="Weight (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Height (cm)"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />

            <TouchableOpacity style={styles.calculateButton} onPress={calculateBMI}>
              <Text style={styles.calculateButtonText}>Calculate BMI</Text>
            </TouchableOpacity>

            {bmi !== null && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Your BMI: {bmi.toFixed(2)}</Text>
                <Text style={styles.message}>{message}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.resetButton} onPress={resetFields}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1B5E20',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputHalf: {
    flex: 1,
    marginRight: 10,
    color: '#333',
  },
  calculateButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    fontSize: 20,
    marginTop: 10,
    color: '#2E7D32',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
});
