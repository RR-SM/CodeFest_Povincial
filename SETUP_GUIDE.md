# Authentup Guide

## Option 1: Firebase Authentication (Recommended - Easiest)

### Installation
```bash
npm install firebase
# or
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
```

### Setup Steps

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com/
   - Click "Add project"
   - Follow the setup wizard
   - Enable Email/Password authentication in Authentication > Sign-in method

2. **Get Firebase Config**
   - In Project Settings, find your web app config
   - Copy the firebaseConfig object

3. **Create Firebase Config File**
   Create `app/config/firebase.ts`:
   ```typescript
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   ```

4. **Update UserContext.tsx**
   Replace the mock functions with real Firebase calls:
   ```typescript
   import {
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     signOut as firebaseSignOut,
     onAuthStateChanged
   } from 'firebase/auth';
   import { doc, setDoc, getDoc } from 'firebase/firestore';
   import { auth, db } from '../config/firebase';

   // In signUp function:
   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   await setDoc(doc(db, 'users', userCredential.user.uid), {
     fullName, email, phone
   });

   // In signIn function:
   await signInWithEmailAndPassword(auth, email, password);
   const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
   setUser(userDoc.data());

   // In signOut function:
   await firebaseSignOut(auth);
   ```

---

## Option 2: Supabase (Open Source Alternative)

### Installation
```bash
npm install @supabase/supabase-js
```

### Setup Steps

1. **Create Supabase Project**
   - Go to https://supabase.com/
   - Create a new project
   - Get your project URL and anon key

2. **Create Supabase Config**
   Create `app/config/supabase.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = 'YOUR_SUPABASE_URL';
   const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

   export const supabase = createClient(supabaseUrl, supabaseAnonKey);
   ```

3. **Update UserContext.tsx**
   ```typescript
   import { supabase } from '../config/supabase';

   // In signUp:
   const { data, error } = await supabase.auth.signUp({
     email, password,
     options: { data: { full_name: fullName, phone } }
   });

   // In signIn:
   const { data, error } = await supabase.auth.signInWithPassword({
     email, password
   });

   // In signOut:
   await supabase.auth.signOut();
   ```

---

## Option 3: Custom Backend API

### Setup Steps

1. **Create Backend** (Node.js/Express example)
   ```bash
   npm install express bcrypt jsonwebtoken
   ```

2. **Backend API Endpoints**
   ```javascript
   // POST /api/auth/signup
   // POST /api/auth/signin
   // POST /api/auth/signout
   // GET /api/user/profile
   ```

3. **Update UserContext.tsx**
   ```typescript
   // In signUp:
   const response = await fetch('YOUR_API_URL/auth/signup', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ fullName, email, phone, password })
   });
   const data = await response.json();

   // In signIn:
   const response = await fetch('YOUR_API_URL/auth/signin', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email, password })
   });
   const data = await response.json();
   ```

---

## Option 4: AWS Amplify

### Installation
```bash
npm install aws-amplify @aws-amplify/react-native
```

### Setup
```bash
amplify init
amplify add auth
amplify push
```

---

## Recommended: Firebase Implementation

Here's the complete updated UserContext with Firebase:

```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface User {
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: User & { password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userDoc.exists()) {
        setUser(userDoc.data() as User);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signUp = async (userData: User & { password: string }) => {
    try {
      const { password, ...userInfo } = userData;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        password
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), userInfo);
      setUser(userInfo);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (auth.currentUser && user) {
        const updatedUser = { ...user, ...userData };
        await setDoc(doc(db, 'users', auth.currentUser.uid), updatedUser);
        setUser(updatedUser);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoggedIn: !!user,
      loading,
      signIn,
      signUp,
      signOut,
      updateProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
```

---

## Security Best Practices

1. **Never store passwords in plain text**
2. **Use HTTPS for all API calls**
3. **Implement rate limiting**
4. **Add email verification**
5. **Use secure password requirements**
6. **Store sensitive keys in environment variables**
7. **Add two-factor authentication (optional)**

---

## Next Steps

1. Choose your authentication provider
2. Install required packages
3. Set up your project on the provider's platform
4. Update UserContext.tsx with real API calls
5. Add error handling and loading states
6. Test thoroughly
7. Add email verification (recommended)
8. Implement password reset functionality

---

## Additional Features to Consider

- **Social Login**: Google, Facebook, Apple Sign In
- **Email Verification**: Verify user emails before allowing access
- **Password Reset**: Allow users to reset forgotten passwords
- **Profile Pictures**: Upload and store user avatars
- **Session Management**: Handle token refresh and expiration
- **Offline Support**: Cache user data for offline access

