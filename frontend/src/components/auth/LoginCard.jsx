// import { FaGoogle } from "react-icons/fa";

// const LoginCard = () => {
//   return (
//     <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-10">

//       <h2 className="text-3xl font-bold text-center text-slate-800">
//         Admin Login
//       </h2>

//       <p className="text-center text-gray-500 mt-2 mb-8">
//         Sign in to continue
//       </p>

//       <form className="space-y-5">

//         <input
//           type="email"
//           placeholder="Email Address"
//           className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
//         />

//         <div className="flex justify-between text-sm">

//           <label className="flex gap-2 items-center">
//             <input type="checkbox" />
//             Remember me
//           </label>

//           <button
//             type="button"
//             className="text-blue-600 hover:underline"
//           >
//             Forgot Password?
//           </button>

//         </div>

//         <button
//           className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
//         >
//           Sign In
//         </button>

//       </form>

//       <div className="flex items-center gap-3 my-6">
//         <div className="flex-1 h-px bg-gray-300"></div>
//         <span className="text-gray-500 text-sm">OR</span>
//         <div className="flex-1 h-px bg-gray-300"></div>
//       </div>

//       <button
//         className="w-full border rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50"
//       >
//         <FaGoogle />
//         Continue with Google
//       </button>

//     </div>
//   );
// };

// export default LoginCard;
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";

const LoginCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
      <div className="rounded-3xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-2xl p-10">

        {/* Logo */}

        <div className="flex justify-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 shadow-lg">

            <GraduationCap
              size={34}
              className="text-white"
            />

          </div>

        </div>

        {/* Heading */}

        <h2 className="mt-6 text-center text-4xl font-bold text-slate-800">
          Welcome Back
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Sign in to continue to EduManage
        </p>

        {/* Login Form */}

        <div className="mt-8">

          <LoginForm />

        </div>

      </div>
    </motion.div>
  );
};

export default LoginCard;