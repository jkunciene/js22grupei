import { useState, useEffect } from 'react';

import db from '../firebase';
import { collection, getDocs } from "firebase/firestore";

const Questions = () => {
    const [questions, setQuestion] = useState([]);

    //funkcija gauti duomenis is db
    const getDataFromFirestore = async () => {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const tempQuestion = querySnapshot.docs.map((doc) => (
            {
                id: doc.id,
                ...doc.data()
            }));
            console.log(tempQuestion)
        setQuestion(tempQuestion);
    }
    //useEffect, kada ta funkcija iskviesti
    useEffect(() => {
        getDataFromFirestore()
    }, []);
console.log(questions)
    return (
        <div>
            duomenys is db
        </div>
    )
}

export default Questions
