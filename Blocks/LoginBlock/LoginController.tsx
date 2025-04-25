
// Customizable Area Start
// Customizable Area End

import { Component } from "react";
import { Alert, Platform } from "react-native";



export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  route:any
  // Customizable Area End
}

interface S {
  // Customizable Area Start

  name : any,
  email:any
  password:any,
  isChecked:any,
  OtpViewModal:boolean,
  setSelection:boolean,
  errorViewModal:any,
  errortext:any,
  passwordvisible:any,
  devicename:any,
  deviceBattery:any
  // Customizable Area End
}


export default class LoginBlockscreenController extends  Component<Props,S> {
  constructor(props:Props) {
    super(props);
    this.state = {
     name:"",
     email:'',
     errortext:'',
     errorViewModal:false,
     password:'',
     isChecked:false,
     OtpViewModal:false,
     setSelection:true,
     passwordvisible:true,
     devicename:'',
     deviceBattery:''

    };
 
 
  }
   
    async componentDidMount() {
    this.setState({
      email:'',
      password:''
    })
     
    
     
    }
    // handelAlllowComments =async(allowcomments: any)=>{
    //  if(this.state.room)
    //  {
    //   const chatRoom =this.state.room; 
    //   const giftArrtibute = this.state.selectedGift?.attributes
    //    let attributes={
    //     message_type: "Allowcomments",
    //      senderName: `${this.state.currentUser7.full_name}`, 
    //    senderId: `S{this.state.currentUser?.datasaver.account_id}`,
    //     Allowcommnets: {allowcomments},
    //    };
    //     const request =new SendMessageRequest("Allowcomments", attributes);
    //      await chatRoom.sendMessage(request);
    //   }
    // }

    
LoginApi =  () => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  if(this.state.email == '')
  {
    this.setState({errorViewModal:true,
    errortext:'Please enter email address.'})


  }
  else   if (reg.test(this.state.email) === false) {
    this.setState({errorViewModal:true,
      errortext:'Please enter the valid email'})


  }
else  if(this.state.password == "")
  {
    this.setState({errorViewModal:true,
      errortext:('Please enter password.')})


  }
  else{
        fetch('https://www.friendlyfone.com/api/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
            password:this.state.password,
           
          }),
        })

        .then(async(res)=> {
          let response=await res.json()
          console.log("body>>",this.state.email,this.state.password)
          console.log("mydatatoken>>", response.api_access_token)
      
          console.log("response>>",response)
          if(response.status == "error")
      {
        console.log(response.message,"error msg")
        this.setState({errorViewModal:true,
        errortext:response.message})
        
      }
    
      else{
        await AsyncStorage.setItem(
          'token',
          response.api_access_token,
          
        );
        await AsyncStorage.setItem(
         
          'userid',
          response.data.id.toString(),
        );
        this.Updatedevicedata()
          this.props.navigation.navigate("TermsandConditionScrren")
          this.setState({
            email:'',
            password:''
          })
      }

        //   this.setState({
        //    mydata:response.data,
        //    OtpViewModal:true
        //    // loader:false
        //   })
        //   console.log("mydata>>",this.state.mydata)
    
        })
        .catch(error => {
          console.log("error>>",error)
            this.setState({
          //loader:false
        })
        Alert.alert("Oops! Something went wrong.")
    
            
        });
    
      }
    }
  
    

  }