"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { AuthContext, AuthUser } from "@/contexts/auth.context";
import { usePathname } from "next/navigation";
import { findMatchingRoute, normalizeRole } from "@/lib/utils";
import AccessDenied from "@/components/ui/access-denied";

interface PartnerProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: PartnerProviderProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  
  const getAuthState = (sessionData: any): AuthUser => {
    return sessionData
      ? {
        isAuthenticated: true,
        user: {
          firstName: sessionData.user.firstName,
          lastName: sessionData.user.lastName,
          name: sessionData.user.name || "",
          email: sessionData.user.email || "",
          id: sessionData.user.id || "",
          token: sessionData.accessToken || "",
        },
      }
      : { isAuthenticated: false };
  };

  const [auth, setAuth] = useState<AuthUser>(getAuthState(session));

  // Update auth state when session changes
  useEffect(() => {
    setAuth(getAuthState(session));
  }, [session]);

  const role = normalizeRole(session?.current_business?.role || "");
  const route = findMatchingRoute(pathname);
  const hasAccess = useMemo(() => {
    if (!route) {
      return true;
    }

    if (!role) {
      return route.actors.includes("all");
    }

    if (role === "admin" || role === "owner") {
      return true;
    }

    return route.actors.includes(role) || route.actors.includes("all");
  }, [route, role]);

  if (!hasAccess) {
    return (
      <AccessDenied returnTo="/dashboard" />
    );
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
