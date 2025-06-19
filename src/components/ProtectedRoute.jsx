import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProtectedRoute({ children, allowedRoles }) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const user = auth.currentUser;

      if (!user) {
        setAllowed(false);
        setChecking(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setAllowed(false);
      } else {
        const role = userSnap.data().role;
        setAllowed(allowedRoles.includes(role));
      }

      setChecking(false);
    };

    checkAccess();
  }, [allowedRoles]);

  if (checking) return <div className="p-8 text-center">Loading...</div>;

  return allowed ? children : <Navigate to="/login" replace />;
}
