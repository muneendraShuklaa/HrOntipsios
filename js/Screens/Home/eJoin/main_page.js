import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import Swiper from 'react-native-swiper';
import Page from './page';

class eJoin extends Component {
  state = {
    data: [
      //   {
      //     TaskId: 1,
      //     EmpId: 'JHT020',
      //     Seq: 4,
      //     EmpTask: 'Hrontips Tasks',
      //     EmployeeUpload: true,
      //     ViewDocument: true,
      //     eSign: false,
      //     SignDate: null,
      //     TaskName: 'Hrontips Tasks',
      //     TaskDesc: 'Hrontips Tasks',
      //     Document: 'doc2.docx',
      //     DocumentName: 'Hrontips Tasks',
      //   },
      //   {
      //     TaskId: 2,
      //     EmpId: 'JHT020',
      //     Seq: 4,
      //     EmpTask: 'Hrontips Tasks',
      //     EmployeeUpload: true,
      //     ViewDocument: false,
      //     eSign: true,
      //     SignDate: null,
      //     TaskName: 'Hrontips Tasks',
      //     TaskDesc: 'Hrontips Tasks',
      //     Document: 'doc2.docx',
      //     DocumentName: 'Hrontips Tasks',
      //   },
    ],
  };
  render() {
    return (
      <Swiper style={{}} showsButtons={false}>
        {this.state.data.map(data => {
          return <Page key={data.TaskId} viewData={data} />;
        })}
      </Swiper>
    );
  }
}

export const EJoin = withMyHook(eJoin);
// onOK={data => {
//     console.log('MAIN DATA', data);
//   }}
