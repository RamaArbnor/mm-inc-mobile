import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-web';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <FlatList
        data={[1,2,3,4,5]}
        renderItem={() => (<View><Text style={styles.text}>This is text</Text></View>)}
      />
      <TouchableOpacity onPress={() => console.log("click")}><Text>Click</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: '2rem',
    color: 'red',
    border: '1px solid red',
    margin: '1rem',
    padding: '1rem'

  }
});
