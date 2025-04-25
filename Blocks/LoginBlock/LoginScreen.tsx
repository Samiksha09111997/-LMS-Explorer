
import { PureComponent, ReactNode } from "react";
import React from "react";

// Customizable Area Start
import {
  View,
  Button,
  StyleSheet,
  Platform,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Switch,
  ImageBackground,
  Modal,
  StatusBar,
  Linking,
  BackHandler
} from "react-native";
// import Scale, { verticalScale } from "../../../components/src/Scale";
// import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../components/src/StyleConstants";
// import { deviceBasedDynamicDimension } from "../../../components/src/utils";

import LoginBlockscreenController , {Props} from "./LoginController";
import Scale from "../../Component/Scale";
import { SCREEN_HEIGHT } from "../../Component/StyleConstant";


export default class LoginScrren extends LoginBlockscreenController{




  componentDidMount = async () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick
    );

  }
  handleBackButtonClick = async () => {
    BackHandler.exitApp();
    return true;
  };
  componentWillUnmount() {
    console.log('componentWillUnmount');
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  errorViewModal = () => {
    return (
        <View>
      
  
        <Modal
          animationType="slide"
          transparent={true}
          style={{opacity:10}}
          visible={this.state.errorViewModal}
           onRequestClose={() => {this.setState({
            errorViewModal:false
           })}}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',width:"100%",  backgroundColor: 'rgba(0, 0, 0, 0.5)'
 }}>
            <View style={{ backgroundColor: 'white', width:"80%", borderRadius: 10,alignItems:'center',justifyContent:'center' }}>
            <Image  source={require("./Assets/Vector.png")}
       style={{
                    width: 50,
                    height: 50, 
                    resizeMode:'contain',
                    marginTop:10
                  }} />
              <Text style={{paddingTop:20,color:'#F21E1E',fontSize:25}}>Error!</Text>
                <Text  style={{paddingBottom:20,color:'#212121',fontSize:18,paddingHorizontal:10, fontFamily: 'Poppins-Regular',
              }}>{this.state.errortext}</Text>
            <TouchableOpacity 
            style={{
              width:200,
              height:50,
              backgroundColor:'blue',alignItems:'center',justifyContent:'center',marginBottom:20,borderRadius:10
            }} onPress={() => {
              this.setState({
                errorViewModal:false
              })
  //  this.PermissionForphysicalActivity()

  
  }}>
                <Text style={{color:'white',fontSize:18,fontWeight:'700',}}>Ok</Text>
            </TouchableOpacity>
        
            </View>
          </View>
        </Modal>
      </View>


  )
  }
 
  render() {
    return (
     
       <ScrollView style={{ flexGrow: 1,}}
       keyboardShouldPersistTaps="always"
       showsVerticalScrollIndicator={false}       >
        {/* Your image or content */}
      <ImageBackground
     source={require("./Assets/bg1.png")}
     // Replace with the path or URL of your image
        style={styles.backgroundImage}
        resizeMode="stretch" // You can use 'contain' or other values here
      >
         <View style={{alignItems:'center'}}>
             <Image  source={require("./Assets/logoagora.png")}
       style={{
        width: 80,
        height: 80, 
        resizeMode:'contain',
        marginTop:Scale(65)
                  }} />

                  <Text  style={{color:"blue",fontSize:40, fontFamily: 'Poppins-Bold',marginBottom:10}}>Login</Text>
                  </View>
        {/* Your other components or content */}
        <View style={{alignItems:'center'}}>
        <View style={styles.inputView1}>

<Text style={{color:"#646060",fontSize:15, fontFamily: 'Poppins-Regular',}}>Email</Text>
</View>
        <View style={styles.inputView}>
<TextInput
style={styles.inputText}
value={this.state.email}
onChangeText={text => this.setState({email:text})}/>
</View>
<View style={styles.inputView1}>

<Text style={{color:"#646060",fontSize:15, fontFamily: 'Poppins-Regular',}}>Password</Text>
</View>
<View style={styles.inputView2}>
<TextInput
style={styles.inputText}
secureTextEntry={this.state.passwordvisible}
value={this.state.password}

onChangeText={text => this.setState({password:text})}/>
{this.state.passwordvisible ==false ?
<TouchableOpacity
onPress={() => {
  this.setState({
    passwordvisible:true
  })


}}
>
    <Image  source={require("./Assets/eyeshow.png")}
       style={{
        width: 20,
        height: 20, 
        resizeMode:'contain'                  }} />
               </TouchableOpacity>:<TouchableOpacity
               onPress={() => {
                this.setState({
                  passwordvisible:false
                })
              
              
              }}>
               
    <Image  source={require("./Assets/hide1.png")}
       style={{
        width: 20,
        height: 20, 
        resizeMode:'contain'
                  }} />
               </TouchableOpacity>}
                </View>


</View>

<View style={{alignItems:'center'}}>

<TouchableOpacity
 onPress={() => {
    this.LoginApi()

  
  }}
  style={styles.loginBtn}>
<Text style={styles.loginText}>Login </Text>
</TouchableOpacity>
</View>
<TouchableOpacity 
// onPress={item?.onpress}
//  key={index}
  style={styles.settingsBgnd1}>
              <View style={styles.buttonsContainer}>
            


             <Text style={{color:'black',fontFamily: 'Poppins-Regular',}}>Don't have an account?</Text>
             <Text style={{color:'blue',fontFamily: 'Poppins-SemiBold',
}}   onPress={() => {
             this.props.navigation.navigate('CreateAccountScrren')
             this.setState({
              email:'',
              password:'',
             })
          }}>  Sign up?</Text>


              </View>
            
              </TouchableOpacity>



      </ImageBackground>
      {this.errorViewModal()}
      {this.state.errorViewModal == true?
      <View style={styles.overlay} />:null}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
 
    container: {
        flex: 1,
      },
      backgroundImage: {
        height: SCREEN_HEIGHT * 0.9999 ,

        resizeMode: "cover",
        position: "relative",
       // You can adjust these properties as needed
        //alignItems: 'center',
      },
      text: {
        color: 'white',
        fontSize: 24,
      },    
    btnWrapper: {
       
        height: 60,
        width: 380,
        backgroundColor: "#0d99ff",
        alignSelf: "center",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
      },
      title:{
        fontWeight: "bold",
        fontSize:50,
        color:"#4C99A0",
        marginBottom: 50,
        },
        inputView:{
        width:"85%",
        backgroundColor:"#F8FAFC",
        borderRadius:10,
        borderColor:'#E9EBEE',
        borderWidth:1,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
        },
        inputView2:{
          flexDirection:'row',
          width:"85%",
          backgroundColor:"#F8FAFC",
          borderRadius:10,
          borderColor:'#E9EBEE',
          borderWidth:1,
          height:50,
          marginBottom:20,
          justifyContent:"space-between",
          alignItems:'center',
         paddingHorizontal:15
          },
        inputView1:{
          width:"85%",
         
          padding:10,
          paddingLeft:0
          },
        inputText:{
        height:50,
        width:"85%",

        color:"black"
        },
        forgotAndSignUpText:{
        color:"#5C27FE",
        fontSize:11,
        fontWeight:"600"
        },
        loginBtn:{
        width:"50%",
        backgroundColor:"blue",
        borderRadius:30,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
        },
        loginText:{
            color:"white",
            fontFamily: 'Poppins-SemiBold',
        },
        settingsBgnd1: {
          flexDirection: "row",
          justifyContent:'center',
          alignItems: "center",
          paddingBottom:Scale(180),
          
        },
        buttonsContainer: {
          flexDirection: "row",
          justifyContent:'space-between'
 },
        optionIcon: {
          width: 20,
          height: 20,
         
          marginRight: 10,
          resizeMode: "contain"
        },
        overlay: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for the desired transparency
        },

//   rateTextWrapper: {
//     flexDirection: "row",
//     marginTop: deviceBasedDynamicDimension(35, false, 1),
//     justifyContent: "space-between",
//   },
//   rateCardText: {
//     color: "#fff",
//     fontFamily: "Poppins-Bold",
//     fontSize: deviceBasedDynamicDimension(18, true, 1),
//     // fontWeight: "700",
//   },
//   bodyContainer: {
//     flex: 0.9,
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   image_BitmapImage2: {
//     width: deviceBasedDynamicDimension(30, true, 1),
//     height: deviceBasedDynamicDimension(30, false, 1),
//     opacity: 1,
//     resizeMode: "contain",
//   },
//   textInput: {
//     // borderWidth: 1,
//     backgroundColor: "rgb(242,242,242)",
//     borderRadius: Scale(12),
//     // fontSize: Scale(15),
//     fontWeight: "200",
//     height: Scale(50),
//     borderColor: "#101f66",
//     marginTop: SCREEN_HEIGHT * 0.015,
//     paddingHorizontal: SCREEN_WIDTH * 0.03,
//     color: "rgb(100,100,100)",
//   },
//   noteInput: {
//     marginTop: SCREEN_HEIGHT * 0.015,
//     paddingHorizontal: SCREEN_WIDTH * 0.03,
//     fontWeight: "200",
//     // height: Scale(150),
//     borderRadius: Scale(12),
//     backgroundColor: "rgb(242,242,242)",
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 3
//     },
//     shadowOpacity: 1,
//     shadowRadius: 3,
//     // elevation: 5,
//     textAlign: 'left',
//     alignItems: 'flex-start'
//   },
//   wrapper: {
//     // backgroundColor:"red",
//     paddingVertical: 10,
//     height: Scale(415),
//   },
//   section: {
//     height: Scale(130),
//     // backgroundColor: "red",
//     marginHorizontal: Scale(20),
//     marginVertical: Scale(10),
//     borderBottomColor: "rgb(205,215,250)",
//     borderBottomWidth: 0.8,
//     paddingBottom: 30
//   },
//   card: {
//     height: "100%",
//     width: "100%",
//     flexDirection: "row"
//   },

//   // modal 
//   // centeredViewnew: {
//   //   flex: 1,
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   //   marginTop: 22,
//   // },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   innersection: {
//     // backgroundColor: "yellow",
//     justifyContent: "space-between",
//     flexDirection: "row",
//     paddingVertical: 5
//   },
//   atmcards: {
//     height: Scale(70),
//     // backgroundColor: "red",
//     marginHorizontal: Scale(20),
//     marginVertical: Scale(10),
//     flexDirection: "row",
//   },
//   atmcard: {
//     height: Scale(70),
//     backgroundColor: "#fff",
//     marginHorizontal: Scale(20),
//     marginVertical: Scale(10),
//     flexDirection: "row"
//   },
//   checkboxImg: {
//     height: 15, width: 15,
//     marginLeft: deviceBasedDynamicDimension(3, true, 1)
//   },
//   IagreetermText: {
//     // position: 'relative',
//     width: deviceBasedDynamicDimension(108, true, 1),
//     height: deviceBasedDynamicDimension(20, false, 1),
//     marginLeft: deviceBasedDynamicDimension(14, true, 1),
//     // marginTop: deviceBasedDynamicDimension(739, false, 1),
//     opacity: 1,
//     backgroundColor: 'transparent',
//     fontStyle: 'normal',
//     // fontWeight: 'normal',
//     includeFontPadding: false,
//     padding: deviceBasedDynamicDimension(0, true, 1),
//     color: 'rgba(139, 139, 139, 1)',
//     textAlign: 'left',
//     letterSpacing: 1,
//     textAlignVertical: 'top',
//     fontFamily: 'Poppins-Regular',
//     fontSize: deviceBasedDynamicDimension(12, true, 1),

//   },
//   TermsCondition: {
//     // opacity: 1,
//     // backgroundColor: 'transparent',
//     // fontStyle: 'normal',
//     // fontWeight: 'normal',
//     // includeFontPadding: false,
//     // padding: deviceBasedDynamicDimension(0, true, 1),
//     // color: 'rgba(53, 114, 255, 1)',
//     // textAlign: 'left',
//     // textAlignVertical: 'top',
//     // fontFamily: 'Poppins-Regular',
//     // fontSize: deviceBasedDynamicDimension(12, true, 1),
//     position: 'relative',
//     width: deviceBasedDynamicDimension(278, true, 1),
//     height: deviceBasedDynamicDimension(20, false, 1),
//     // marginLeft: deviceBasedDynamicDimension(5, true, 1),
//     // marginTop: deviceBasedDynamicDimension(739, false, 1),
//     opacity: 1,
//     backgroundColor: 'transparent',
//     fontStyle: 'normal',
//     fontWeight: 'normal',
//     includeFontPadding: false,
//     padding: deviceBasedDynamicDimension(0, true, 1),
//     color: 'rgba(53, 114, 255, 1)',
//     textAlign: 'left',
//     textAlignVertical: 'top',
//     fontFamily: 'Poppins-Regular',
//     fontSize: deviceBasedDynamicDimension(12, true, 1),
//     letterSpacing: 1,
//   },
//   attrbuted_textlabel_CreditCardText:
//   {
//     position: 'relative',
//     width: deviceBasedDynamicDimension(80, true, 1),
//     height: deviceBasedDynamicDimension(20, false, 1),
//     // marginLeft: deviceBasedDynamicDimension(63, true, 1),
//     // marginTop: deviceBasedDynamicDimension(334, false, 1),
//     opacity: 1,
//     backgroundColor: 'transparent',
//     fontStyle: 'normal',
//     // fontWeight: 'normal',
//     includeFontPadding: false,
//     padding: deviceBasedDynamicDimension(0, true, 1),
//     color: 'rgba(31, 33, 34, 1)',
//     textAlign: 'center',
//     textAlignVertical: 'top',
//     fontFamily: 'Poppins-Regular',
//     fontSize: deviceBasedDynamicDimension(14, true, 1),
//   },

//   attrbuted_textlabel_CreditCardText2:
//   {
//     position: 'relative',
//     width: deviceBasedDynamicDimension(80, true, 1),
//     height: deviceBasedDynamicDimension(20, false, 1),
//     marginLeft: deviceBasedDynamicDimension(63, true, 1),
//     marginTop: deviceBasedDynamicDimension(334, false, 1),
//     opacity: 1,
//     backgroundColor: 'transparent',
//     fontStyle: 'normal',
//     // fontWeight: 'normal',
//     includeFontPadding: false,
//     padding: deviceBasedDynamicDimension(0, true, 1),
//     color: 'rgba(31, 33, 34, 1)',
//     textAlign: 'center',
//     textAlignVertical: 'top',
//     fontFamily: 'Poppins-Regular',
//     fontSize: deviceBasedDynamicDimension(14, true, 1),
//   },
//   textlabel_SafeMoneyTransferText:
//   {
//     // position: 'absolute',
//     width: deviceBasedDynamicDimension(259, true, 1),
//     height: deviceBasedDynamicDimension(40, false, 1),
//     marginLeft: deviceBasedDynamicDimension(7, true, 1),
//     marginTop: deviceBasedDynamicDimension(4, false, 1),
//     opacity: 1,
//     backgroundColor: 'transparent',
//     fontStyle: 'normal',
//     // fontWeight: 'normal',
//     includeFontPadding: false,
//     padding: deviceBasedDynamicDimension(0, true, 1),
//     color: 'rgba(154, 154, 154, 1)',
//     textAlign: 'left',
//     textAlignVertical: 'top',
//     fontFamily: 'Poppins-Regular',
//     fontSize: deviceBasedDynamicDimension(12, true, 1),
//   },
//   textlabel_InspectionAmountText:
//   {
//     // position: 'absolute',
//     width: deviceBasedDynamicDimension(133, true, 1),
//     height: deviceBasedDynamicDimension(20, false, 1),
//     // marginLeft: deviceBasedDynamicDimension(20, true, 1),
//     // marginTop: deviceBasedDynamicDimension(179, false, 1),
//     opacity: 1,
//     backgroundColor: 'transparent',
//     fontStyle: 'normal',
//     // fontWeight: 'normal',
//     includeFontPadding: false,
//     padding: deviceBasedDynamicDimension(0, true, 1),
//     color: 'rgba(124, 124, 124, 1)',
//     textAlign: 'left',
//     textAlignVertical: 'top',
//     fontFamily: 'Poppins-Regular',
//     fontSize: deviceBasedDynamicDimension(14, true, 1),
//   },
//   textlabel_50000Text:
//   {
//     // position: 'absolute',
//     width: deviceBasedDynamicDimension(99, true, 1),
//     height: deviceBasedDynamicDimension(23, false, 1),
//     // marginLeft: deviceBasedDynamicDimension(276, true, 1),
//     // marginTop: deviceBasedDynamicDimension(181, false, 1),
//     opacity: 1,
//     backgroundColor: 'transparent',
//     fontStyle: 'normal',
//     // fontWeight: 'normal',
//     includeFontPadding: false,
//     padding: deviceBasedDynamicDimension(0, true, 1),
//     color: 'rgba(124, 124, 124, 1)',
//     textAlign: 'right',
//     textAlignVertical: 'top',
//     fontFamily: 'Poppins-Medium',
//     fontSize: deviceBasedDynamicDimension(18, true, 1),
//   },
//   textlabel_TotalText:
//   {
//     // position: 'absolute',
//     width: deviceBasedDynamicDimension(49, true, 1),
//     height: deviceBasedDynamicDimension(25, false, 1),
//     // marginLeft: deviceBasedDynamicDimension(20, true, 1),
//     // marginTop: deviceBasedDynamicDimension(215, false, 1),
//     opacity: 1,
//     backgroundColor: 'transparent',
//     fontStyle: 'normal',
//     // fontWeight: 'bold',
//     includeFontPadding: false,
//     padding: deviceBasedDynamicDimension(0, true, 1),
//     color: 'rgba(52, 52, 52, 1)',
//     textAlign: 'left',
//     textAlignVertical: 'top',
//     fontFamily: 'Poppins-Bold',
//     fontSize: deviceBasedDynamicDimension(18, true, 1),
//   },
//   textlabel_50000Text2:
//   {
//     // position: 'absolute',
//     width: deviceBasedDynamicDimension(99, true, 1),
//     height: deviceBasedDynamicDimension(21, false, 1),
//     // marginLeft: deviceBasedDynamicDimension(267, true, 1),
//     // marginTop: deviceBasedDynamicDimension(219, false, 1),
//     opacity: 1,
//     backgroundColor: 'transparent',
//     fontStyle: 'normal',
//     fontWeight: 'bold',
//     includeFontPadding: false,
//     padding: deviceBasedDynamicDimension(0, true, 1),
//     color: 'rgba(52, 52, 52, 1)',
//     textAlign: 'right',
//     textAlignVertical: 'top',
//     fontFamily: 'poppins-semibold',
//     fontSize: deviceBasedDynamicDimension(20, true, 1),
//   },
//   attrbuted_textlabel_OrderDetailsText:
//   {
//     position: 'relative',
//     width: deviceBasedDynamicDimension(117, true, 1),
//     height: deviceBasedDynamicDimension(25, false, 1),
//     // marginLeft: deviceBasedDynamicDimension(18, true, 1),
//     // marginTop: deviceBasedDynamicDimension(143, false, 1),
//     opacity: 1,
//     backgroundColor: 'transparent',
//     fontStyle: 'normal',
//     fontWeight: '600',
//     includeFontPadding: false,
//     padding: deviceBasedDynamicDimension(0, true, 1),
//     color: 'rgba(16, 21, 32, 1)',
//     // textAlign: 'center',
//     textAlignVertical: 'top',
//     fontFamily: 'Poppins-Regular',
//     fontSize: deviceBasedDynamicDimension(18, true, 1),
//   },
//   attrbuted_textlabel_PaymentModesText:
//   {
//     // position: 'relative',
//     width: deviceBasedDynamicDimension(149, true, 1),
//     height: deviceBasedDynamicDimension(25, false, 1),
//     // marginLeft: deviceBasedDynamicDimension(20, true, 1),
//     // marginTop: deviceBasedDynamicDimension(293, false, 1),
//     opacity: 1,
//     backgroundColor: 'transparent',
//     fontStyle: 'normal',
//     // fontWeight: 'normal',
//     includeFontPadding: false,
//     padding: deviceBasedDynamicDimension(0, true, 1),
//     color: 'rgba(0, 0, 0, 1)',
//     textAlign: 'left',
//     textAlignVertical: 'top',
//     fontFamily: 'Poppins-Regular',
//     fontSize: deviceBasedDynamicDimension(18, true, 1),
//   },
//   Advert_image_View: {
//     width: SCREEN_WIDTH,
//     height: moderateScaleVertical(120),
//     // marginLeft:moderateScale(10),
//     padding: moderateScale(1),
//     borderRadius: moderateScale(10),
//     // overflow:"hidden",
//     marginVertical: moderateScaleVertical(17),
//     alignSelf: "center"
//   },
//   Advert_image: {
//     width: SCREEN_WIDTH * 1,
//     height: moderateScale(155),
//     // marginLeft:moderateScale(10),
//     borderRadius: moderateScale(10),
//     // marginTop: moderateScaleVertical(17),
//     alignSelf: "center"
//   },
//   btnWrapper: {
//     // marginHorizontal: moderateScale(4),
//     // width: '90%',
//     // height: deviceBasedDynamicDimension(55, false, 1),

//     // backgroundColor: 'rgba(21, 131, 144, 1)',
//     // marginTop: moderateScaleVertical(10),
//     // borderRadius: moderateScale(8),
//     // alignSelf: 'center'
//     height: Scale(60),
//     width: Scale(380),
//     backgroundColor: "rgba(21, 131, 144, 1)",
//     alignSelf: "center",
//     borderRadius: Scale(10),
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: Scale(20),
//   },
});

