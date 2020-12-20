import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAkDQbEOQqx5vqa1y0gBsx3JD8GUPSroyo",
    authDomain: "meezer-d0403.firebaseapp.com",
    databaseURL: "https://meezer-d0403.firebaseio.com",
    projectId: "meezer-d0403",
    storageBucket: "meezer-d0403.appspot.com",
    messagingSenderId: "977633592312",
    appId: "1:977633592312:web:4a1e42f40796e49daecc0d",
    measurementId: "G-2VS51R415Y"

}

class FirebaseSvc {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        } else {
            console.log("Firebase App Already Running")
        }
    }

    login = async (user, success_callback, failed_callback) => {
        console.log("Logging In..");
        const output = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(success_callback, failed_callback);
    }

    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
            try {
                this.login(user);
            } catch ({ message }) {
                console.log("Failed: " + message);
            }
        } else {
            console.log("Reusing Auth....");
        }
    };

    createAccount = async (user) => {
        firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(function () {
                console.log("created user successfully. UserEmail:" + user.email + "name: " + user.name);
                var userf = firebase.auth().currentUser;
                userf.updateProfile({ displayName: user.name })
                    .then(function () {
                        console.log("Updated Display name Successfully. name:" + user.name);
                        alert("User " + user.name + "was created successfully. Please Login.");
                    }, function (error) {
                        console.warn("Error Update displayName.");
                    });
            }, function (error) {
                console.error("got error: " + typeof (error) + "string: " + error.message);
                alert("create account failed. Error: " + error.message);
            });
    }

    onLogout = user => {
        firebase.auth().signOut().then(function () {
            console.log("sign-out Successfully.");
        }).catch(function (error) {
            console.log("An error happened when signing out");
        });
    }

    get uid() {
        alert(currentUser)
        return (firebase.auth().currentUser || {}).uid;
    }

    get ref() {
        var x = 'Mess'

        return firebase.database().ref();
    }

    parce = snapshot => {
        const { timestamp: numberStamp, text, user, createdAt } = snapshot.val();
        const { Key: id } = snapshot;
        const { Key: id } = snapshot;
        const timestamp = new Date(numberStamp);

        const message = {
            _id,
            createdAt,
            text,
            user,
        };
        return message;
    };

    refOn = (callback, string) => {
        this.ref.child(string)
            .limitToLast(85000)
            .on('child_added', snapshot => callback(this.parse(snapshot)));
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    send = async (messages, Key) => {
        const { text, user, createdAt, _id } = messages[0];

        const message = {
            text,
            user,
            createdAt: createdAt + '',
            _id,
            seen: false
        };
        await this.ref.child(Key).push(message);
    };

    refOff() {
        this.ref.off();
    }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;