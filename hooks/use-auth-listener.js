import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../context/firebase";

export default function useAuthListener() {
    // Checking whether the user is in the local storage or not.
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));
    const { firebase } = useContext(FirebaseContext);

    // Run of the first itteration
    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                localStorage.setItem("authUser", JSON.stringify(authUser));
                setUser(authUser);
            } else {
                localStorage.removeItem("authUser");
                setUser(null);
            }
        });
        // Clean listener
        return () => listener();
    }, []);

    return { user };
}
