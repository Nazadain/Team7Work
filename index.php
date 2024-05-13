<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="manager/index.php"></a>
    <a href="user/index.php"></a>
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDfGPnbUW89jd07Ha3maBK_KIAJ1i1UmYE",
    authDomain: "superfood-ec8e6.firebaseapp.com",
    projectId: "superfood-ec8e6",
    storageBucket: "superfood-ec8e6.appspot.com",
    messagingSenderId: "652196711377",
    appId: "1:652196711377:web:6eba61ab42be9f7eb1eef0",
    measurementId: "G-ZGM8JP973G"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
</body>
</html>