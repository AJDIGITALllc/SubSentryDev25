import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    // Redirect to the OIDC login endpoint
    window.location.href = "/api/login";
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-slate-300">Redirecting to login...</p>
      </div>
    </div>
  );
}