import { StyleSheet, Platform } from 'react-native'
import { vh, normalize, vw } from '../Utils/dimentions'

export default StyleSheet.create({
    TextTitleBold: {
        fontSize: normalize(24), 
        fontFamily: 'WorkSans-Bold'
    },
    TextSemiBold:{
        // fontFamily: 'Poppins-Bold',
        fontSize: normalize(16), 
        fontFamily: 'WorkSans-SemiBold'


    },
    FontFamilyExtraBold:{
        fontFamily:'WorkSans-ExtraBold',
        fontSize: normalize(24), 

    },
    FontFamilyRegular:{
        fontFamily:'WorkSans-Regular',
        fontSize: normalize(18), 


    },
 
})