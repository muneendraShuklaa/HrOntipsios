// import React, { Component } from "react";
// import { Text, StyleSheet, View, Animated, Easing } from "react-native";
// import { getStatusBarHeight } from "react-native-status-bar-height";
//  import Ionicons from "react-native-vector-icons/FontAwesome";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
// Icon.loadFont();

// const THEME = {
//   warning: {
//     bg: "#ffbf80",
//     iconBg: "#e74c3c",
//     iconColor: "white",
//     titleTextColor: "#e74c3c",
//     subtitleTextColor: "#e74c3c",
//     iconName: "user-circle"
//   },
//   Mobilee: {
//     bg: "#ffbf80",
//     iconBg: "#e74c3c",
//     iconColor: "white",
//     titleTextColor: "#e74c3c",
//     subtitleTextColor: "#e74c3c",
//     iconName: "mobile-phone"
//   },
//   success: {
//     bg: "#f8fdfa",
//     iconBg: "#27ae60",
//     iconColor: "white",
//     titleTextColor: "#27ae60",
//     subtitleTextColor: "#27ae60",
//     iconName: "help"
//   },
  
//   error: {
//     bg: "#ffbf80",
//     iconBg: "#e74c3c",
//     iconColor: "white",
//     titleTextColor: "#e74c3c",
//     subtitleTextColor: "#e74c3c",
//     iconName: "wechat"
//   },
//   date: {
//     bg: "#ffbf80",
//     iconBg: "#e74c3c",
//     iconColor: "white",
//     titleTextColor: "#e74c3c",
//     subtitleTextColor: "#e74c3c",
//     iconName: "calendar"
//   },
//   terms: {
//     bg: "#ffbf80",
//     iconBg: "#e74c3c",
//     iconColor: "white",
//     titleTextColor: "#e74c3c",
//     subtitleTextColor: "#e74c3c",
//     iconName: "file-text"
//   }
// };

// class AlertDialog extends Component {
//   height = 90;
//   statusBarHeight = getStatusBarHeight();
//   constructor(props) {
//     super(props);

//     this.state = {
//       size: new Animated.Value(0),
//       iconSize: new Animated.Value(0),
//       title: "",
//       subtitle: "",
//       theme: THEME.warning
//     };
//   }

//   show = (theme, title = "", subtitle = "") => {
//     let myTheme;
//     let t = ["warning", "error", "success","Mobilee","date","terms"].includes(theme);
//     if (!t) {
//       console.log("Avainlable themes are : 'warning','error','success'");
//       myTheme = THEME.warning;
//     } else if (!theme) {
//       console.log("No Theme provided So default warning is applied");
//       myTheme = THEME.warning;
//     } else {
//       console.log("Theme is ", theme);
//       myTheme = THEME[theme];
//     }
//     // console.log({ myTheme });
//     this.state.theme = myTheme;
//     this.state.title = title;
//     this.state.subtitle = subtitle;
//     this.setState({});
//     Animated.timing(this.state.size, {
//       toValue: this.statusBarHeight + this.height,
//       duration: 400,
//       easing: Easing.bounce
//     }).start(() => {
//       setTimeout(() => {
//         this.hide();
//       }, 2000);
//     });
//   };

//   hide = theme => {
//     Animated.timing(this.state.size, {
//       toValue: 0,
//       duration: 400,
//       easing: Easing.bounce
//     }).start();
//   };

//   render() {
//     let { theme, title, subtitle } = this.state;

   
//     theme = theme || THEME["warning"];

//     return (
//       <Animated.View
//         style={{
//           width: "100%",
//           position: "absolute",
//           height: this.state.size,
//           backgroundColor: theme.bg,
//           top: 0,
//           left: 0,
//           zIndex: 1000,
//           elevate: 1000
//         }}
//       >
//         <View
//           style={{
//             flex: 1,
//             flexDirection: "row",
//             paddingTop: this.statusBarHeight,
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "row",
//             paddingHorizontal: 15,
//             justifyContent: "space-between"
//           }}
//         >
//           <Animated.View
//             style={{
//               height: this.state.size.interpolate({
//                 inputRange: [0, this.statusBarHeight + this.height],
//                 outputRange: [0, 50]
//               }),
//               width: 50,
//               borderRadius: 30,
//               backgroundColor: theme.iconBg,
//               justifyContent: "center",
//               marginRight: 10,
//               alignItems: "center"
//             }}
//           >
//             <Ionicons name={theme.iconName} size={25} color={theme.iconColor} />
//           </Animated.View>
//           <View style={{ flex: 1 }}>
//             {/* <Text
//               numberOfLines={1}
//               style={{
//                 fontWeight: "bold",
//                 fontSize: 14,
//                 color: theme.titleTextColor,
//                 letterSpacing: -0.09,
//                 lineHeight: 22
//               }}
//             >
//               {title}
//             </Text> */}


//             <Text
//               numberOfLines={2}
//               style={{
//                 fontSize: 12,
//                 color: theme.subtitleTextColor,
//                 letterSpacing: -0.09
//               }}
//             >
//               {subtitle}
//             </Text>
//           </View>

//           <TouchableOpacity
//             onPress={() => {
//               this.hide();
//             }}
//           >
//             <Animated.View
//               style={{
//                 // height: this.state.size.interpolate({
//                 //   inputRange: [0, this.statusBarHeight + this.height],
//                 //   outputRange: [0, 30]
//                 // }),
//                 // width: 30,
//                 borderRadius: 30,
//                 marginLeft: 10,
//                 justifyContent: "center",
//                 alignItems: "center"
//               }}
//             >
//               <Ionicons name={"thumbs-o-down"} size={42} color={theme.iconBg} />
//             </Animated.View>
//           </TouchableOpacity>
//         </View>
//       </Animated.View>
//     );
//   }
// }

// const styles = StyleSheet.create({});

// export { AlertDialog };
