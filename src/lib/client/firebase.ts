import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, collection } from 'firebase/firestore/lite'
import { 
    PUBLIC_FIREBASE_API_KEY, 
    PUBLIC_FIREBASE_APP_ID, 
    PUBLIC_FIREBASE_AUTH_DOMAIN, 
    PUBLIC_FIREBASE_BUCKET, 
    PUBLIC_FIREBASE_MEASUREMENT_ID, 
    PUBLIC_FIREBASE_PROJECT_ID, 
    PUBLIC_FIREBASE_SENDER_ID 
} from '$env/static/public'
import { memoize } from 'lodash';

const firebaseConfig = {
    apiKey: PUBLIC_FIREBASE_API_KEY,
    authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId:PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: PUBLIC_FIREBASE_BUCKET,
    messagingSenderId: PUBLIC_FIREBASE_SENDER_ID,
    appId: PUBLIC_FIREBASE_APP_ID,
    measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID,
}

export const initFirebase = memoize(() => {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const userDoc = (userId: string) => doc(db, 'users', userId);

    return { app, analytics, auth, db, userDoc };
})