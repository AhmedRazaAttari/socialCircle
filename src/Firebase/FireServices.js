import firebase from '@react-native-firebase/app';

class FireServicesClass {
    signupUserToFirebase = (email, password, callback) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(userInfo => {
            callback({
              isSuccess: true,
              response: userInfo.user._user,
              uid: userInfo.user._user.uid,
            });
          })
          .catch(error => {
            callback({isSuccess: false, error: error.message});
          });
      };
   
      userLogin = (email, password, callback) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(response => {
            callback({isSuccess: true, response: response.user._user});
          })
          .catch(error => {
            callback({isSuccess: false, error: error});
          });
      };
     
}

const FireServices = new FireServicesClass();
export default FireServices;
