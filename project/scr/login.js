// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyALlnbwSdLPaVzvrC0ksnhrYGDWE-6sRA0",
  authDomain: "web-app-6ec58.firebaseapp.com",
  databaseURL: "https://web-app-6ec58-default-rtdb.firebaseio.com/",
  projectId: "web-app-6ec58",
  storageBucket: "web-app-6ec58.appspot.com",
  messagingSenderId: "9037062576",
  appId: "1:9037062576:web:524b5f26a6fe7f8c703675"
};
// Initialize Firebase
firebase.initializeApp(config);


const database = firebase.database()

// show welcome after logging in
// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
  
//       document.getElementById("user_div").style.display = "block";
//       document.getElementById("login_div").style.display = "none";
  
//       var user = firebase.auth().currentUser;
  
//       if(user != null){
  
//         var email_id = user.email;
//         document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
  
//       }
  
//     } else {
//       // No user is signed in.
  
//       document.getElementById("user_div").style.display = "none";
//       document.getElementById("login_div").style.display = "block";
  
//     }
//   });
  
  function login(){
  //get input fields
    var email = document.getElementById("email_field").value;
    var password = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){ 
      //redirect to homepage
      window.location.href="homepage.html"
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });

  }
  
  function logout(){
    firebase.auth().signOut();
  }



