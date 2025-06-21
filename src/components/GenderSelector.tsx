import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type GenderSelectorProps = {
  gender: string | null;
  setGender: (gender: string) => void;
};

const GenderSelector: React.FC<GenderSelectorProps> = ({gender, setGender}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, gender === 'male' && styles.selected]}
        onPress={() => setGender('male')}>
        <Icon name="gender-male" size={40} color={gender === 'male' ? '#fff' : '#007BFF'} />
        <Text style={[styles.text, gender === 'male' && styles.selectedText]}>Male</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, gender === 'female' && styles.selected]}
        onPress={() => setGender('female')}>
        <Icon name="gender-female" size={40} color={gender === 'female' ? '#fff' : '#007BFF'} />
        <Text style={[styles.text, gender === 'female' && styles.selectedText]}>Female</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    marginHorizontal: 10,
  },
  selected: {
    backgroundColor: '#007BFF',
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    color: '#007BFF',
  },
  selectedText: {
    color: '#fff',
  },
});

export default GenderSelector; 