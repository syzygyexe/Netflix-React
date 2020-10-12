import { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../context/firebase";

// target is films or series in our DB.
export default function useContent(target) {
    const [content, setContent] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        firebase.
            firestore()
            // By passing a target user can choose type inside of the firestore
            .collection(target)
            .get()
            .then((snapshot) => {
                const allContent = snapshot.docs.map((contentObj) => ({
                    // All data with doc id
                    ...contentObj.data(),
                    // docId is used as the key in our map
                    docId: contentObj.id,
                }));

                setContent(allContent);
            })
            .catch((error) => {
                console.log(error.message);
            }) 
    }, []);
    // target films or series. We just sign in it to content.
    return { [target]: content}
}
