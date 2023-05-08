// lib/auth.tsx
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getAuthUser} from "./local-storage-service";
import LoadingPageSpinner from "components/ui/loading-page-spinner";

export function withAuth<P>(Component: React.ComponentType<P>) {
  const AuthenticatedComponent = (props: React.PropsWithChildren<P>) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      function checkAuth() {
        const {logged} = getAuthUser();

        if (!logged) router.replace("/login-1");
        else setIsLoading(false);
      }

      checkAuth();
    }, []);

    if (isLoading) return <LoadingPageSpinner />;
    return <Component {...props} />;
  };

  return AuthenticatedComponent;
}
