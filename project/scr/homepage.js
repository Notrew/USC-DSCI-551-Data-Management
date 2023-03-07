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

const searchBar = document.getElementById('searchBar');
const searchBar2 = document.getElementById('searchBar2');
const searchBar3 = document.getElementById('searchBar3');
const postList = document.getElementById('postList');
let postArray = [];

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
        window.filteredPosts2 = filteredPosts2
        displayPosts(filteredPosts2);
    });
    searchBar3.addEventListener('keyup', (e) => {
        const searchString3 = e.target.value;
        const filteredPosts3 = filteredPosts2.filter((post) => {
            return (
                post.zipcode.toString().match('^'+searchString3)
                );
        });
    displayPosts(filteredPosts3);
    });
});

const displayPosts = (posts) => {
    const htmlString = posts
        .map((post) => {
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
            </li>
        `;
        })
        .join('');
    postList.innerHTML = htmlString;
};

function fetchPosts() {
    var ref = firebase.database().ref("users");
    ref.on("value", function(snapshot) {
        snapshot.forEach(function(child) {
            let city = child.val().city;
            let zipcode = child.val().zipcode;
            let phone = child.val().phone;
            let post = child.val().posts;
            let array = Object.values(post);
            for (let i = 0; i < array.length; i++) {
                array[i].city = city;
                array[i].zipcode = zipcode;
                array[i].phone = phone;
                postArray.push(array[i]);
              }
        })
    })
    try {
        displayPosts(postArray);
    } catch (err) {
        console.error(err);
    }
}

fetchPosts();

// show email after logging in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
    
        if(user != null){
            var email_id = user.email;
            document.getElementById("login").innerHTML =  email_id;
        }
    }
});

function logout(){
    firebase.auth().signOut();
    window.location.href="homepage.html"
    alert('User Logged Out!!')
  };