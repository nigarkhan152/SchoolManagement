// import LoginInput from "./LoginInput";
// import PasswordInput from "./PasswordInput";
// import RememberMe from "./RememberMe";
// import GoogleLoginButton from "./GoogleLoginButton";

// const LoginForm = () => {
//   return (
//     <form className="space-y-5">

//       <LoginInput />

//       <PasswordInput />

//       <RememberMe />

//       <button
//         type="submit"
//         className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 py-3 text-lg font-semibold text-white transition hover:scale-[1.02] hover:shadow-xl"
//       >
//         Sign In
//       </button>

//       <div className="flex items-center gap-3">

//         <div className="h-px flex-1 bg-gray-300"></div>

//         <span className="text-sm text-gray-400">
//           OR
//         </span>

//         <div className="h-px flex-1 bg-gray-300"></div>

//       </div>

//       <GoogleLoginButton />

//     </form>
//   );
// };

// export default LoginForm;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginInput from "./LoginInput";
import PasswordInput from "./PasswordInput";
import RememberMe from "./RememberMe";
import GoogleLoginButton from "./GoogleLoginButton";
import { login } from "../../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await login(formData);

//       localStorage.setItem("token", response.token);

//       navigate("/dashboard");
//     } catch (error) {
//       console.error(error);
//       alert("Invalid email or password");
//     }
//   };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(formData);

            localStorage.setItem("token", response.data.token);

            localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
            );

            navigate("/dashboard");
        } catch (error) {
            console.error(error);

            alert(
            error.response?.data?.message || "Login Failed"
            );
        }
    };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <LoginInput
        value={formData.email}
        onChange={handleChange}
      />

      <PasswordInput
        value={formData.password}
        onChange={handleChange}
      />

      <RememberMe />

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 py-3 text-lg font-semibold text-white transition hover:scale-[1.02] hover:shadow-xl"
      >
        Sign In
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-300"></div>

        <span className="text-sm text-gray-400">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-300"></div>
      </div>

      <GoogleLoginButton />

    </form>
  );
};

export default LoginForm;