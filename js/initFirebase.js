import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js'
import {
    getDatabase,
    ref as rtdbRef,
    onValue as rtdbOnValue
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js"
import {
    getStorage,
    ref as storageRef,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js"

const firebaseConfig = {
    apiKey: "AIzaSyCexUQ76dMqMvCzcojiM_8mcvBGTLwO1T0",
    authDomain: "foma-website.firebaseapp.com",
    databaseURL: "https://foma-website-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "foma-website",
    storageBucket: "foma-website.appspot.com",
    messagingSenderId: "294809545914",
    appId: "1:294809545914:web:3a28acffe3207b14a6e683",
    measurementId: "G-K4TMNEWHWJ"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const database = getDatabase(app);

var firebaseData = 
{
    storage: storage,
    database: database,
    rtdbRef: rtdbRef,
    rtdbOnValue: rtdbOnValue,
    storageRef: storageRef,
    getDownloadURL: getDownloadURL
}

export { firebaseData }