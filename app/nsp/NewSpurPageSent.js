// return (
//     <View style={styles.outerContainer}>
//       <ScrollView>
//         <View style={styles.container}>
//           <Stack.Screen
//             options={{
//               title: "Pending Spur",
//             }}
//           />
//           <View style={styles.createSpurSection}>
//             <View style={styles.headerContainer}>
//               <Text h3 style={styles.title}>
//                 Activity
//               </Text>
//             </View>
//             <View style={styles.sectionBodyContainer}>
//               <MiniActivityCard activityInfo={activities[activityIndex]} />
//             </View>
//           </View>
//           <View style={styles.createSpurSection}>
//             <View style={styles.headerContainer}>
//               <Text h3 style={styles.title}>
//                 People
//               </Text>
//             </View>
//             <View style={styles.sectionBodyContainer}>
//               <InterestedFriendsList
//                 interestedFriendIds={selectedFriends}
//                 emptyMessage={"This is a spur just for you."}
//               />
//             </View>
//           </View>
//           <View style={styles.createSpurSection}>
//             <View style={styles.headerContainer}>
//               <Text h3 style={styles.title}>
//                 Time
//               </Text>
//             </View>
//             <View style={styles.sectionBodyContainer}>
//               <Text h4 style={{ padding: 10 }}>
//                 {date.toLocaleString(undefined, dateFormat)}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.createSpurSection}>
//             <View style={styles.headerContainer}>
//               <Text h3 style={styles.title}>
//                 Location
//               </Text>
//             </View>
//             <View style={styles.sectionBodyContainer}>
//               <Text h4 style={{ padding: 10 }}>
//                 {location}
//               </Text>
//             </View>
//           </View>
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => {
//               Alert.alert("Modal has been closed.");
//               setModalVisible(!modalVisible);
//             }}
//           >
//             <View style={styles.centeredView}>
//               <View style={styles.modalView}>
//                 <Text h2 style={styles.textStyle}>
//                   Spur sent!
//                 </Text>
//                 <Text h4 style={styles.textStyle}>
//                   We'll notify you when someone accepts this invitation.
//                 </Text>
//                 <Button
//                   style={[styles.button, styles.buttonClose]}
//                   onPress={() => setModalVisible(!modalVisible)}
//                   title="Close"
//                   type="outline"
//                 />
//               </View>
//             </View>
//           </Modal>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
