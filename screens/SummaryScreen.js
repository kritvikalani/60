import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import db from '../config';

export default class SummaryScreen extends React.Component(){
constructor(){
  super();
  this.state = {
    present_student : [],
    absent_students : []
  }
}
getTodaysDate(){
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

  return today;
}

componentDidMount = async () => {
var today = await this.getTodaysDate()
var students_ref = db.ref('/').on('value', (data) => {
  var class_a = data.val()
  var present_students = []
  var absent_students = []
  for (var i in class_a) {
    if (class_a[i][today] === 'present') {
      present_students.push(class_a[i])
    }
    if (class_a[i][today]==='absent') {
      absent_students.push(class_a[i])
    }
  }
  present_students.sort(function (a,b) {
    return a.roll_no - b.roll_no
  })
  absent_students.sort(function (a,b) {
    return a.roll_no - b.roll_no
  })
  this.setState({present_students: present_students,
  absent_students: absent_students})
})
}

render(){
    return(
<View style = {{flex:1}}>

<Text style={styles.textP}> PRESENT STUDENTS </Text>
<View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
{this.state.present_students.map((student, index)=>(
  <Text>{student.name}</Text>
))}
</View>
<Text style={styles.textA}> ABSENT STUDENTS </Text>
<View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
{this.state.absent_students.map((student, index)=>(
  <Text>{student.name}</Text>
))}
</View>
<View style = {{flexDirection: 'row', justifyContent: 'center'}}>
<Text>Present:{this.state.present_student.length}</Text>
<Text>Absent:{this.state.absent_students.length}</Text>
</View>
</View>
    )
  }
}

const styles = StyleSheet.create({
  textP:{
    fontSize: 25,
    marginLeft: 5,
    marginRight: 5,
    color: 'green',
  },
  textA:{
    fontSize: 25,
    marginLeft: 5,
    marginRight: 5,
    color: 'red',
  },
})