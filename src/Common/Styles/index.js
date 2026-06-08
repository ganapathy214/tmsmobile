import {StyleSheet} from 'react-native';

export const primaryColor="#00143c"

export const primaryIconColor="#4E5052"

export const secondaryColor="#800080"

export const greenColor = "#1bcfb4"

export const commonStyle= StyleSheet.create({
    primaryBackGround:{
        backgroundColor:primaryColor
    },
    primaryColor:{
        color:primaryColor
    },
    secondaryBackground:{
        backgroundColor:secondaryColor
    },secondaryColor:{
        color:secondaryColor
    },
    flexRow:{
        flexDirection:'row'
    },
    display:{
        display:"flex"
    },
    flexColumn:{
        flexDirection:"column"
    },
    alignTextCenter:{
        alignItems:"center"
    },
    justifyCenter:{
        justifyContent:"center"
    },
    card:{
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        backgroundColor: "white",
    },
    welcomeContainer:{
        marginHorizontal:0,
        marginVertical:1,
        height:50
    },
    welcomeNotes:{
        fontFamily:"Avenir-Black",
        fontSize:20,
        marginLeft:15,
        marginTop:10,
        color:"black"
    },
    welcomeTenant:{
        fontFamily:"Cabin-Italic",
        fontSize:15,
        marginLeft:15,
        marginTop:1,
        color:"black"
    },
    AvanirBlack:{
        fontFamily:"Avenir-Black"
    },
    AvanirRoman:{
        fontFamily:"Avenir-Roman"
    },
    AvanirLight:{
        fontFamily:"Avenir-Light"
    },
    AvanirBook:{
        fontFamily:"Avenir-Book"
    },
    AvanirHeavy:{
        fontFamily:"Avenir-Heavy"
    },
    AvanirMedium:{
        fontFamily:"Avenir-Medium"
    },
    AvanirLightOblique:{
        fontFamily:"Avenir-LightOblique"
    },
    TitilliumWebBlack:{
        fontFamily:"TitilliumWeb-Black"
    },
    TitilliumWebSemiBoldItalic:{
fontFamily:"TitilliumWeb-SemiBoldItalic"
    },
    TitilliumWebExtraLightItalic:{
        fontFamily:"TitilliumWeb-ExtraLightItalic"
    },
    TitilliumWebLightItalic:{
        fontFamily:"TitilliumWeb-LightItalic"
    },
    TitilliumWebItalic:{
        fontFamily:"TitilliumWeb-Italic"
    },
    TitilliumWebBoldItalic:{
        fontFamily:"TitilliumWeb-BoldItalic"
    },
    TitilliumWebBlack:{
        fontFamily:"TitilliumWeb-Black"
    }
})