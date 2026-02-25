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

let theButton = document.getElementById("login-button");

function signUpUser() {
    let userName = document.getElementById("user-name").value.trim();
    let uEmail = document.getElementById("user-email").value.trim();
    let uPassword = document.getElementById("user-password").value.trim();
    let conPassword = document.getElementById("confirm-password").value.trim();

    if (!userName || !uEmail || !uPassword || !conPassword) {
        alert('All fields are mandatory!')
    } else if (uPassword.length < 6) {
        alert(`Password must be at least 6 character`)
    } else if (conPassword !== uPassword) {
        alert('Password did not match!')
    } else {
        loadingState('Loading...', true);

        auth.createUserWithEmailAndPassword(uEmail, uPassword)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                user.updateProfile({
                    displayName: userName
                }).then(() => {
                    alert(`Sign Up Successful!, Welcome to Let's Chat`);
                    window.location.href = '../public/login.html'
                    loadingState('Sign Up', false)
                    console.log(user);
                }).catch((error) => {
                    console.log(error);
                    alert(`Sign Up Successful!, Welcome to Let's Chat, Failed to Update Username!`)
                    window.location.href = '../public/login.html'
                    loadingState('Sign Up', false)
                });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
                alert(`Sign Up Failed!, ${errorMessage}`)
                loadingState('Sign Up', false)
            });
    }
}

function loadingState(text, isLoading) {
    theButton.innerHTML = text;
    theButton.disabled = isLoading
}

function loginUser() {
    let userName = document.getElementById("user-name").value.trim();
    // let uEmail = document.getElementById("user-email").value.trim();
    let uPassword = document.getElementById("user-password").value.trim();

    if (!userName || !uPassword) {
        alert(`All field are Mandatory`)
    } else if (uPassword.length < 6) {
        alert(`Incorrect password or email or username`)
    } else {
        loadingState('Loading...', true);

        auth.signInWithEmailAndPassword(userName, uPassword)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                alert(`Login Successful!, Welcome Back`);
                window.location.href = '../public/dashboard.html'
                loadingState('Log in', false);
                console.log(user);

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(`Login Failed!, Try using Email ${errorMessage}`);
                loadingState('Log in', false);
            });
    }
}


var provider = new firebase.auth.GoogleAuthProvider();

function googleLogin() {
    auth.signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            alert(`Login Successful! Welcome to Let's Chat`)
            window.location.href = `../public/dashboard.html`
            
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorMessage, email, credential);
            
            alert(`Login Failed! ${errorMessage}`)
        });
}

function changePassword() {
    let conAction = confirm(`A reset email link will be send to your account`)
    // window.location.href = `../public/forget.html`
    if (conAction) {
        let userEmail = prompt(`Please enter your email address ⬇️`)
        auth.sendPasswordResetEmail(userEmail)
            .then(() => {
                // Password reset email sent!
                alert(`Rest Mail Sent Successfully ✅, Follow the link in your mail`)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(`Failed to send reset mail ${errorMessage}`)
            });
    }
}



