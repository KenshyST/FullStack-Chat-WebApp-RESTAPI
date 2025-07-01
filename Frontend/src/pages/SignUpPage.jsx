import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div>
      {/*Left and Right side Components BOX */}
      <div className="min-h-screen grid lg:grid-cols-2 ">
        {/* Left side of the page, the formulary */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 min-h-screen bg-[#121825]">
          <div className="w-full max-w-md space-y-8 fle flex-col justify-center items-center">
            {/* LOGO */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <div
                  className="size-12 rounded-xl bg-pink-800 flex items-center justify-center
                            group-hover:bg-primary/20 transition-colors"
                >
                  <img
                    src="../../public/KenshyST.svg"
                    alt="Kenshy Icon"
                    className=""
                  />
                </div>
                <h1 className="text-2xl font-bold mt-2"> Create Account</h1>
                <p className="text-base-content/60">
                  {" "}
                  Get Started with your free account
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 flex flex-col items-center  w-full"
            >
              {/*This below Div Is for Input User Full Name */}
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  required
                  placeholder="Please Fill Your Full Name"
                  pattern="[A-Za-z][A-Za-z\- ]*"
                  minLength={2}
                  maxLength={30}
                  title="Only letters, numbers or dash"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />
              </label>
              <p className="validator-hint hidden">
                Must be 2 to 30 characters
                <br />
                containing only letters, numbers or dash
              </p>
              {/*This Div Below is for Email Input */}
              <label className="input validator">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="mail@site.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
              {/*Div below belows to Password field */}
              <label className="input validator relative">
                {/* Ícono del candado (opcional) */}
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                  </g>
                </svg>

                {/* Input de contraseña */}
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Password"
                  minLength={8}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pr-10"
                />

                {/* Botón para mostrar/ocultar */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    // Ícono de ojo abierto
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    // Ícono de ojo tachado
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.263-3.568M6.293 6.293A9.97 9.97 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.953 9.953 0 01-3.221 4.163M6.293 6.293L3 3m0 0l18 18"
                      />
                    </svg>
                  )}
                </button>
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>
              {/*Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-80"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
            <div className="text-center">
              <p className="text-base-content/60">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 fle hidden lg:flex flex-col items-center justify-center p-8 min-h-screen w-full">
          {/*Right Side of the component */}
          <AuthImagePattern
            title="Join our community"
            subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
            patternShape="square"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
