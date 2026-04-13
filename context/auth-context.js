import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  OAuthProvider,
  onAuthStateChanged,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";

import {
  useSession,
  signIn,
  signOut as signOutWithApple,
} from "next-auth/react";

const firebaseConfig = {
  apiKey: "AIzaSyC4KJ91WtzRACe-C4ZaXDfzBAkMsCT0Pg0",
  authDomain: "bit-sika-1.firebaseapp.com",
  databaseURL: "https://bit-sika-1.firebaseio.com",
  projectId: "bit-sika-1",
  storageBucket: "bit-sika-1.appspot.com",
  messagingSenderId: "200980152615",
  appId: "1:200980152615:web:d4d98e852e7a0288",
  measurementId: "G-DX3E1YETKB",
};

const app = initializeApp(firebaseConfig);

export const googleprovider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");
appleProvider.addScope("email");
appleProvider.addScope("name");

// googleprovider.addScope('profile')
googleprovider.setCustomParameters({
  prompt: "select_account",
});

// const appleProvider = new OAuthProvider();
export const auth = getAuth(app);

export const AuthContext = React.createContext({
  authUser: null,
  loading: false,
  loginWithGoogleMobile: () => null,
  loginWithGoogleDesktop: () => null,
  token: null,
  getGoogleLoginResultDesktop: () => Promise,
  getGoogleLoginResultMobile: () => Promise,
  checkFirebaseUser: () => Promise,
  setAuthUser: () => null,
  loginUser: () => Promise,
  logoutUser: () => null,
  loginWithApple: () => null,
  updateProfile: () => null,
});

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // checks if the user is logged in
  const [hasUserSignedUp, setHasUserSignedUp] = useState(false); // checks if the user is signed up in
  const { push } = useRouter();
  const { data: appleSession, status } = useSession();

  useEffect(() => {
    const token = localStorage.getItem("sika__token");
    const sika_user = localStorage.getItem("sika__user");

    if (sika_user) setAuthUser(JSON.parse(sika_user));
    if (token) setToken(token);
  }, []);

  useEffect(() => {
    const getUserLogin = async () => {
      try {
        const user = await getGoogleLoginResultMobile();

        if (user) {
          setIsUserLoggedIn(true);
          const userAvailable = await checkFirebaseUser(user.uid);
          if (Boolean(userAvailable)) {
            setHasUserSignedUp(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserLogin();
  }, [authUser]);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const loginWithGoogleMobile = () => {
    return new Promise((resolve) => {
      signInWithPopup(auth, googleprovider)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const loginWithGoogleDesktop = async () => {
    // return new Promise((resolve) => {
    //   signInWithRedirect(auth, googleprovider)
    //     .then((result) => {
    //       resolve(result)
    //     }).catch((error) => {
    //       console.log(error)
    //     });
    // })

    const result = await signInWithPopup(auth, googleprovider);
    if (result) {
      const token = result.user.accessToken;
      const user = result.user;
      setToken(token);
      // resolve(user);
      return user;
    }
  };

  // const loginWithApple = (username) => {
  //   return new Promise((resolve, reject) => {
  //     signIn('apple', { callbackUrl: `https://bitsika.com/${username}/invite` })
  //       .then(data => resolve(data))
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // }

  const loginWithApple = () => {
    return new Promise((resolve, reject) => {
      signInWithRedirect(auth, appleProvider)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  function getGoogleLoginResultMobile() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        (result) => {
          if (result) {
            const token = result.accessToken;
            const user = result;            
            setToken(token);
            resolve(user);
            return user;
          }
        },
        (error) => reject(error)
      );
    });
  }

  async function getGoogleLoginResultDesktop() {
    return new Promise((resolve, reject) => {
      getRedirectResult(auth)
        .then((result) => {
          if (result) {
            const token = result.user.accessToken;
            const user = result.user;
            setToken(token);
            resolve(user);
            return user;
          }
          reject(`${result}`);
          return result;
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function checkFirebaseUser(uid) {
    const BASE_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;

    return new Promise((resolve, reject) => {
      axios
        .post(
          `${BASE_URL}/customer/check-fuid`,
          { fuid: uid },
          {
            headers: {
              "Content-Type": "application/json",
              // "x-service-name": "transaction-api"
            },
          }
        )
        .then((data) => {
          resolve(data?.data?.username);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function updateProfile(payload, authUser, token) {
    const BASE_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
    const data = {
      name: payload?.name,
    };
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/customer/update`, data, {
          headers: {
            "Content-Type": "application/json",
            "x-service-name": "transaction-api",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if ([200, 201].includes(response.status)) {
            const user = {
              ...authUser,
              user: { ...authUser.user, name: response.data.name },
            };
            setAuthUser(user);
            localStorage.setItem("sika__user", JSON.stringify(user));
            setToken(token);
            localStorage.setItem("sika__token", token);
            push("/auth-user");
            resolve();
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  const loginUser = (payload) => {
    const BASE_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/customer`, payload, {
          headers: {
            "Content-Type": "application/json",
            "x-service-name": "transaction-api",
          },
        })
        .then(async (response) => {
          if ([200, 201].includes(response.status)) {
            const authUser = {
              authorized: true,
              user: {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                username: response.data.username,
                photo_url: response.data.photo_url,
                is_active: response.data.is_active,
                phone_verified: response.data.phone_verified,
                kyc_verified: response.data.kyc_verified,
                kyc_status: response.data.kyc_status,
                social_verification: response.data?.social_verification,
              },
            };
            await updateProfile(payload, authUser, response.data.token);
            return resolve();
          }
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  };

  const logoutUser = () => {
    push("/");

    setTimeout(() => {
      localStorage.removeItem("sika__user");
      setToken(null);
      localStorage.removeItem("sika__token");
      setAuthUser(null);
      signOut(auth);
      setHasUserSignedUp(false);
      setIsUserLoggedIn(false);
    }, 500);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        loading,
        loginWithGoogleDesktop,
        loginWithGoogleMobile,
        getGoogleLoginResultDesktop,
        getGoogleLoginResultMobile,
        checkFirebaseUser,
        setAuthUser,
        loginUser,
        logoutUser,
        token,
        isUserLoggedIn,
        hasUserSignedUp,
        loginWithApple,
        updateProfile,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
