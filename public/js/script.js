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
var currentEvent;
var uid;
var events;
$(document).ready(function(){
    $('#event-modal').modal();
    $('#delete-modal').modal();
});
auth.onAuthStateChanged(user => {
  uid = user.uid;

  firebase.database().ref('/users/' + uid).once('value').then((data) => {
    events = data.val();
    for(var event in events){
      $('.events').append(`
        <div class="col s12 m4">
          <div class="card">
            <div class="card-content">
              <a class="modal-trigger" href="#delete-modal" onclick="setEvent('` + events[event].title + `')" href="#" class="float-right">x</a>
              <span class="card-title">` + events[event].title + `</span>
              <p>` + events[event].description + `</p>
            </div>
            <div class="card-action">
              <a class="modal-trigger" href="#event-modal" onclick="modalData('` + events[event].title + `','` + events[event].description + `')">View Event</a>
            </div>
          </div>
        </div>`
      );
    }
  })
})

function setEvent(e){
  currentEvent = e;
  $('#delete-modal h3').text('Are you sure you want to delete ' + e + '?')
}
function deleteEvent(){
  firebase.database().ref('/users/' + uid + '/' + currentEvent).remove().then(e => {
    window.location.replace('index.html');
  });
}
function modalData(title, description){
  $('.event-modal-title').text(title);
  $('.event-modal-description').text(description);
}
