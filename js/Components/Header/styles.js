import {StyleSheet} from 'react-native';
import {vw, vh, normalize} from '../../Utils/dimentions';
import utils from '../../Utils';

export default StyleSheet.create({
  container: {
    height: vh(60),
    // height:vh(90),
    // width:"100%",borderBottomStartRadius:30,borderBottomEndRadius:30,
    // justifyContent:'space-around',
    alignItems: 'center',
    marginTop: 0,
    flexDirection: 'row',
    // backgroundColor: utils.color.BackPagecolor,
  },
  titleContainer: {
    // marginTop:vh(10),
    // backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    height: vh(25),
    tintColor: '#000',
    width: vw(25),
    marginLeft: vw(20),
    // marginVertical:vh(10),
    marginHorizontal: vw(16.75),
    // tintColor:"#fff"
  },
  rightIcon: {
    height: vh(25),
    width: vh(25),
    // height: vh(38),
    // width: vh(38),
    alignItems: 'flex-end',
    // marginVertical:vh(5),
    // marginHorizontal:vw(16.75)
  },
});
