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


$(document).ready(function(){
  $('.login-button').click(signIn);
})
function signIn(){
  var email = $('#email').val();
  var password = $('#password').val();
  auth.signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    $('.login-error').text(errorMessage);
  });
}
auth.onAuthStateChanged(user => {
  if(user){
    window.location.replace('index.html');
  }
})
