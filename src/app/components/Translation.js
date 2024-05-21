"use client"

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore, auth } from '../../../firebase';

const Translation = () => {
  const [translation, setTranslation] = useState('');
  const [savedTranslations, setSavedTranslations] = useState([]);
  const articleId = 'demo-article';

  useEffect(() => {
    const fetchTranslations = async () => {
      // Load saved translations from Firestore
      const userId = auth.currentUser?.uid;
      if (userId) {
        const translationsRef = collection(firestore, 'translations');
        const q = query(translationsRef, where('userId', '==', userId), where('articleId', '==', articleId));
        const querySnapshot = await getDocs(q);
        const translations = querySnapshot.docs.map((doc) => doc.data().translation);
        setSavedTranslations(translations);
      }
    };

    // Load current translation from local storage
    const currentTranslation = localStorage.getItem(`current_translation_${articleId}`);
    if (currentTranslation) {
      setTranslation(currentTranslation);
    }

    fetchTranslations();
  }, [articleId]);

  useEffect(() => {
    // Save current translation to local storage whenever it changes
    localStorage.setItem(`current_translation_${articleId}`, translation);
  }, [translation, articleId]);

  const handleTranslationChange = (event) => {
    setTranslation(event.target.value);
  };

  const saveToFirestore = async () => {
    const userId = auth.currentUser.uid;
    const newTranslation = {
      translation,
      userId,
      articleId,
      createdAt: new Date(),
    };

    // Save the new translation as a new document in Firestore
    await addDoc(collection(firestore, 'translations'), newTranslation);

    // Add the new translation to the saved translations list
    setSavedTranslations([...savedTranslations, translation]);

    // Clear the textarea
    setTranslation('');

    // Remove current translation from local storage
    localStorage.removeItem(`current_translation_${articleId}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full mx-auto my-4">
      <textarea
        value={translation}
        onChange={handleTranslationChange}
        rows="10"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your translation here..."
      ></textarea>
      <button
        onClick={saveToFirestore}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
      >
        Save Translation
      </button>
      {savedTranslations.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Saved Translations:</h3>
          {savedTranslations.map((trans, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md border border-gray-300 mb-2">
              <p>{trans}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Translation;
