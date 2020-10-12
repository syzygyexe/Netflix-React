// prod.js means production version
import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initial DataBase update
// import { seedDatabase } from "../seed";

const config = {
    apiKey: ******************************************,
authDomain: ********************************************,
databaseURL: *********************************************,
projectId: "netflix-powered-by-react",
storageBucket: *******************************************,
messagingSenderId: ***************************************,
appId: ***************************************************
}

const firebase = Firebase.initializeApp(config)

// Initial DataBase update
// seedDatabase(firebase);

export { firebase }
