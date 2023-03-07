const firebaseConfig = {
    apiKey: "AIzaSyALlnbwSdLPaVzvrC0ksnhrYGDWE-6sRA0",
    authDomain: "web-app-6ec58.firebaseapp.com",
    databaseURL: "https://web-app-6ec58-default-rtdb.firebaseio.com",
    projectId: "web-app-6ec58",
    storageBucket: "web-app-6ec58.appspot.com",
    messagingSenderId: "9037062576",
    appId: "1:9037062576:web:524b5f26a6fe7f8c703675"
  };
firebase.initializeApp(firebaseConfig);

const postList = document.getElementById('postList');
let postArray = [];

const searchBar = document.getElementById('searchBar');
const searchBar2 = document.getElementById('searchBar2');

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredPosts = postArray.filter((post) => {
        return (
            post.name.toLowerCase().includes(searchString)
        );
    });
    displayPosts(filteredPosts);
    searchBar2.addEventListener('keyup', (e) => {
        const searchString2 = e.target.value.toLowerCase();
        const filteredPosts2 = filteredPosts.filter((post) => {
            return (
                post.category.toLowerCase().includes(searchString2)
            );
        });
        displayPosts(filteredPosts2);
    });
});

const displayPosts = (posts) => {
    const htmlString = posts
        .map((post) => {
            window.uid= new String(post.uid);
            window.pid= new String(post.pid);
            return `
            <li class="post">
                <h2>${post.name}</h2>
                <br>
                <h2>Category: ${post.category}</h2>
                <br>
                <p>Price: $${post.sell_price}</p>
                <br>
                <p>Contact: ${post.phone}</p>
                <br>
                <p>City: ${post.city}</p>
                <br>
                <p>Zipcode: ${post.zipcode}</p>
                <br>
                <img src="${post.pic}"></img>
                <br>
                <button style="float: right" onclick="deletePost()">Delete</button>
            </li>
        `;
        })
        .join('');
    postList.innerHTML = htmlString;
};

var deletePost = function() {
    firebase.database().ref("users/"+uid+"/posts/"+pid).remove()
    window.alert("Deleted successfully");
    location.reload(true);
    fetchPosts(uid);
};

function fetchPosts(uid) {
    var ref = firebase.database().ref("users/"+uid);
    ref.on("value", function(snapshot) {
        let city = snapshot.val().city;
        let zipcode = snapshot.val().zipcode;
        let phone = snapshot.val().phone;
        let post = snapshot.val().posts;
        let pid = Object.keys(post)
        let array = Object.values(post);
        for (let i = 0; i < array.length; i++) {
            array[i].uid = uid;
            array[i].pid = pid[i];
            array[i].city = city;
            array[i].zipcode = zipcode;
            array[i].phone = phone;
            postArray.push(array[i]);
        }
    })
    try {
        displayPosts(postArray);
    } catch (err) {
        console.error(err);
    }
}

// show email after logging in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
        var uid = user.uid;
    
        if(user != null){
            var email_id = user.email;
            document.getElementById("login").innerHTML = email_id;
            fetchPosts(uid);
        }
    }
});

function logout(){
    firebase.auth().signOut();
    location.reload(true);
    alert("User Logged Out!!");
  }