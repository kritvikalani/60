import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

class AppHeader extends React.Component{
  render(){
    return(
      <View style= {styles.textContainer}>
        <Text style={styles.text}>School Attendance</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer:{
    backgroundColor: 'red',
  },
  text:{
    color: 'white',
    textAlign: 'center',
    padding: 20,
    fontSize: 25,
    fontWeight: 'bold',
  }
});

export default AppHeader;