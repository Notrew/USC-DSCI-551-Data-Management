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

function signup(){
  //get input fields
  var username = document.getElementById("username_field").value;
  var email = document.getElementById("email_field").value;
  var password = document.getElementById("password_field").value;
  var city = document.getElementById("city_field").value;
  var zipcode = document.getElementById("zipcode_field").value;
  var password = document.getElementById("password_field").value; 
  var phone = document.getElementById("phone_field").value;
  
  //move on with auth
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = firebase.auth().currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      username : username,
      email : email,
      password : password,
      city : city,
      zipcode : zipcode,
      phone : phone

    }
    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)
    // Done
    alert('User Created!!')
  })
  .then(function(){ 
    //redirect to homepage
    window.location.href="login.html"
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

  



