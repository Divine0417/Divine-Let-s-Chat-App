console.log(firebase);

const firebaseConfig = {
    apiKey: "AIzaSyABEjDUtslgVPisOiNum0MqP33PTX9UWFU",
    authDomain: "divine-apps-7bc36.firebaseapp.com",
    projectId: "divine-apps-7bc36",
    storageBucket: "divine-apps-7bc36.firebasestorage.app",
    messagingSenderId: "663553850684",
    appId: "1:663553850684:web:d18e01630ca95802b7f239",
    measurementId: "G-CHDJF7MHT3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
console.log(app);

const auth = firebase.auth();
console.log(auth);

function checkUserAuth() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/v8/firebase.User
            var uid = user.uid;
            forUserName.innerHTML = user.displayName || 'user'
            console.log(user, 'im here');

        } else {
            // User is signed out
            console.log('im in the else block');
            window.location.href = '../public/login.html'
        }
    });
}


checkUserAuth()

function logUserOut() {
    let canLogout = confirm('Are you sure?')
    if (canLogout) {
        auth.signOut().then(() => {
            window.location.href = '../public/login.html'
        }).catch((error) => {
            console.log(error);
            alert(error.message)
        });
    }

}