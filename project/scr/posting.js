// Initialize Firebase (ADD YOUR OWN DATA)
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

// Reference messages collection

const storage = firebase.storage();
const database = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;

    if(user != null){
      var uid = user.uid
      var get_path = "users/"+uid
      var post_path = 'users/'+ uid +'/posts'
      var postsRef = database.ref(post_path);
      // console.log(post_path)
      var email_id = user.email;
      //get from database
      document.getElementById("email").innerHTML = '<i class="fa fa-envelope"></i>  ' + email_id;

      firebase.database().ref(get_path).on("value", function(snapshot){
        // snapshot.forEach(function(child){
          document.getElementById("phone").innerHTML = '<i class="fa fa-phone"></i>  ' + snapshot.val().phone;
          document.getElementById("username").innerHTML = '<i class="fa fa-road"></i>  ' + snapshot.val().username;
          // console.log(snapshot.val())
        // })
      })

      //submit part
      // Listen for form submit
      document.getElementById('contentForm').addEventListener('submit', submitForm);

      // Submit form
      function submitForm(e){
        e.preventDefault();
        var item =  document.getElementById("item").value;
        var category = document.getElementById("category").value;
        var buy_price = document.getElementById("buy_price").value;
        var sell_price = document.getElementById("sell_price").value;

        // Upload message
        uploadinfo(item, category, buy_price, sell_price)
      
        // Show alert
        document.querySelector('.alert').style.display = 'block';

        // Hide alert after 3 seconds
        setTimeout(function(){
          document.querySelector('.alert').style.display = 'none';
        },3000);

        // Clear form
        document.getElementById('contentForm').reset();
      }

      // Function to get form values
      function getInputVal(id){
        return document.getElementById(id).value;
      }

      // Save message function to firebase
      function savePost(item, category, buy_price, sell_price,posting_date, url){//, picture
        var newPostRef = postsRef.push();
        newPostRef.set({
          name: item,
          category:category,
          buy_price:buy_price,
          sell_price:sell_price,
          posting_date :posting_date,
          pic:url
        })
      }
      // 
      function uploadinfo(item, category, buy_price, sell_price) {
          document.getElementById("image").style.display = "none";
          const file = document.querySelector("#uploadpic").files[0];
          const name = +new Date() + "-" + file.name;
          const metadata = {
              contentType: file.type
          };
          const task = storage.ref().child(uid+"/"+name).put(file, metadata);
          task.then(function(){
              storage.ref().child(uid+"/"+name).getDownloadURL()
              .then(function(url){
                var date=new Date()
                var dateTime=date.getTime()
                function formatDate(datetime) {
                  var date = new Date(datetime)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
                  var year = date.getFullYear()
                  var month = ('0' + (date.getMonth() + 1)).slice(-2)
                  var sdate = ('0' + date.getDate()).slice(-2)
                  var hour = ('0' + date.getHours()).slice(-2)
                  var minute = ('0' + date.getMinutes()).slice(-2)
                  var second = ('0' + date.getSeconds()).slice(-2)
                  // 拼接
                  var result = year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute + ':' + second
                  // 返回
                  return result
                }
                var posting_date = formatDate(dateTime);
                savePost(item, category, buy_price, sell_price, posting_date, url)
              });
              }
              )
      }
    }
  }
})