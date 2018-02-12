var config = {
  apiKey: "AIzaSyChqAaiZpLHOrROIBU9hXR8pNW46xu-fPI",
  authDomain: "whichdate-20373.firebaseapp.com",
  databaseURL: "https://whichdate-20373.firebaseio.com",
  projectId: "whichdate-20373",
  storageBucket: "whichdate-20373.appspot.com",
  messagingSenderId: "385830370918"
};
firebase.initializeApp(config);
const auth = firebase.auth();
var uid;
var events;
auth.onAuthStateChanged(user => {
  uid = user.uid;

  firebase.database().ref('/users/' + uid).once('value').then((data) => {
    events = data.val();
    for(var event in events){
      $('.events').append(`
        <div class="col s12 m4">
        <div class="card">
          <div class="card-content">
            <span class="card-title">` + events[event].title + `</span>
            <p>` + events[event].description + `</p>
          </div>
          <div class="card-action">
            <a href="#">View Event</a>
          </div>
        </div>
      </div>
      `);
    }
  })
})
