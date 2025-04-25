import { Dimensions } from "react-native";

export const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
export const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);

export const FONTS = {
  // font nameConstant key : font name in string
  OpenSans_Regular: "OpenSans-Regular",
  OpenSans_Medium: "OpenSans-Medium",
  OpenSans_SemiBold: "OpenSans-SemiBold",
  OpenSans_Bold: "OpenSans-Bold",
  OpenSans_ExtraBold: "OpenSans-ExtraBold",
  Poppins_SemiBold : "poppins-semibold",
  Poppins_Medium:"Poppins-Medium"
};
