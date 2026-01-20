
"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      role,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/");
    } else {
      // Optionally show an error message
    }
  };

  const demoLogins = [
    { email: "user@test.com", password: "demo123", role: "user", label: "👤 User Login" },
    { email: "admin@test.com", password: "admin123", role: "admin", label: "👨‍💼 Admin Login" },
    { email: "support@test.com", password: "support123", role: "support", label: "🎧 Support Login" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-700 mb-2">💳 E-Shop</h1>
            <p className="text-gray-600">Login to your account</p>
          </div>

          {/* Demo Credentials Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 font-semibold mb-2">📝 Demo Credentials:</p>
            <div className="space-y-2 text-xs text-gray-600">
              <p>👤 User: user@test.com / demo123</p>
              <p>👨‍💼 Admin: admin@test.com / admin123</p>
              <p>🎧 Support: support@test.com / support123</p>
            </div>
          </div>

          {/* Quick Login Buttons */}
          <div className="space-y-3 mb-6">
            {demoLogins.map((login) => (
              <button
                key={login.role}
                onClick={() => {
                  setEmail(login.email);
                  setPassword(login.password);
                  setRole(login.role);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                {login.label}
              </button>
            ))}
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="support">Support</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-all mt-6"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-gray-600">
            <p>Dont have an account? <span className="text-blue-600 font-semibold">Create one</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
