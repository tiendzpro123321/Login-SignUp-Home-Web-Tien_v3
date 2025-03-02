// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD02NoZDg074XR-lBCPzqDioKJilaAJnQ4",
  authDomain: "login-6d8b3.firebaseapp.com",
  projectId: "login-6d8b3",
  storageBucket: "login-6d8b3.firebasestorage.app",
  messagingSenderId: "804062031432",
  appId: "1:804062031432:web:84d9f77481ab823ae9727d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);


      //tính năng đăng kí
      document.addEventListener('DOMContentLoaded', function() {
        const signUpButton = document.getElementById('signUp');

        signUpButton.addEventListener('click', (event) => {
            event.preventDefault();
            const email = document.getElementById('rEmail').value;
            const password = document.getElementById('rPassword').value;
            const cpassword = document.getElementById('cPassword').value;

            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //Đã đăng kí
                const user = userCredential.user;
                set(ref(database, 'users/' + user.uid), {
                    email: email,
                    password: password,
                    cpassword: cpassword,
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                alert(errorMessage, 'signUpMessage');
            });
        });
      });

      //tính năng đăng nhập
      const signInButton = document.getElementById('signIn');
      if (signInButton) {
        signInButton.addEventListener('click', (event) => {
            event.preventDefault();
            const email = document.getElementById('email_field').value;
            const password = document.getElementById('password_field').value;

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //đã đăng nhập
                const user = userCredential.user;
                localStorage.setItem('loggedInUserId', user.uid);
                window.location.href = 'home.html';
                const dt = new Date();
                update(ref(database, 'users/'+ user.uid), {
                    last_login: dt,
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
        });
      }



      //Hàm này tạo ra để theo dõi trạng thái đăng nhập của người dùng
      const user = auth.currentUser;
      onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
        }else {
            //người dùng đã đăng xuất
        }
      });



  