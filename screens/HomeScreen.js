import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppHeader from '../components/AppHeader';
import SummaryScreen from '../screens/SummaryScreen';
import db from '../config'

export default class HomeScreen extends React.Component{
  constructor(){
    super();
    this.state={
      all_students: [],
      present: [],
      absent: []
    }
  }

componentDidMount = async () => {
  var class_ref = await db.ref('/').on('value', data => {
    var all_students = []
    var class_a = data.val().class_a;
    for (var i in class_a) {
      all_students.push(class_a[i]);
    }
    all_students.sort(function(a, b) {
      return a.roll_no - b.roll_no;
    });
    this.setState({all_students: all_students})
  })
}

updateAttendance(roll_no, status) {
  var id = '';
  if(roll_no <= 9) {
    id = '0' + roll_no;
  } else {
    id = roll_no;
  }

  var today = new Date();
  var dd = today.getDate();
  var nm = today.getMonth() + 1;

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (nm < 10) {
    nm = '0' + nm;
  }
  today = dd + '-' + nm + '-' + yyyy;
  var ref_path = id;
  var class_ref = db.ref(ref_path);
  class_ref.update({
    [today]: status,
  })
}

render() {

  var all_students = this.state.all_students
  if (all_students.length === 0) {
    return (
    <View style = {{flex:1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>No Student Found </Text>
    </View>
    )
  }
  else {
    return (
      <View style = {{flex: 1}}>
      <View style = {{flex: 3}}>
      {all_students.map((student, index)=>(
        <View key = {index} style = {styles.studentChartContainer}>
        <View key = {'name' + index} style = {{flex: 1, flexDirection: 'row'}}>
          <Text>{student.roll_no}</Text>
          <Text>{student.name}</Text>
        </View>
        <View style = {{flex: 1}}>
        <TouchableOpacity style = {styles.presentButton}
        onPress = {()=>{
          var present = this.state.present
          present.push(index)
          this.setState({present:present})
          var roll_no = index + 1
          this.updateAttendance(roll_no, 'present')
        }}>
        <Text>PRESENT</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.absentButton}
        onPress = {()=>{
          var absent = this.state.absent
          absent.push(index)
          this.setState({absent:absent})
          var roll_no = index + 1
          this.updateAttendance(roll_no, 'absent')
        }}>
        <Text>ABSENT</Text>
        </TouchableOpacity>
        </View>
        </View>
      ))}
      <View style = {{flex:1}}>
      <TouchableOpacity style = {styles.submit}
      onPress={
      this.props.navigation.navigate('SummaryScreen')
      }>
      <Text> SUBMIT </Text>
      </TouchableOpacity>
      </View>
      </View>
      </View>
    )
  }
  }
}
const styles = StyleSheet.create({
  studentChartContainer: {
    flexDirection: 'row',
    padding: 10,
    margin: 20,
    alignItems: 'center'
  },
  presentButton: {
    backgroundColor: 'lightgreen',
    borderWidth: 2,
    borderColor: 'green',
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  absentButton: {
    backgroundColor: 'pink',
    borderWidth: 2,
    borderColor: 'red',
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20
  },
  submit: {
    backgroundColor: 'yellow',
    borderWidth: 2,
    borderColor: 'brown',
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
