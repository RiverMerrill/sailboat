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
var user;
auth.onAuthStateChanged(profile => {
  user = profile;
})
function createEvent(){
  if(user){
    var invites = $('#event_invites').val();
    invites = JSON.parse('[' + invites + ']')
    firebase.database().ref('users/' + user.uid + '/' + $('#event_title').val()).set({
      title: $('#event_title').val(),
      description: $('#event_description').val(),
      earliest: $('#start_date').val(),
      latest: $('#end_date').val(),
      invites: invites
    }).then(() => {
      window.location.replace('index.html')
    })
  } else{
    $('.new-event-error').text('Please login before creating an event.')
  }
}
document.getElementById('create-event').addEventListener('click', createEvent);
$(document).ready(function(){
  $('.datepicker').datepicker();
})
