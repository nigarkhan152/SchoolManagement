// import { Lock, Eye, EyeOff } from "lucide-react";
// import { useState } from "react";

// const PasswordInput = () => {

//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div>

//       <label className="mb-2 block text-sm font-medium text-slate-700">
//         Password
//       </label>

//       <div className="relative">

//         <Lock
//           size={18}
//           className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//         />

//         <input
//           type={showPassword ? "text" : "password"}
//           placeholder="Enter your password"
//           className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none transition-all focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
//         />

//         <button
//           type="button"
//           onClick={() => setShowPassword(!showPassword)}
//           className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
//         >
//           {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//         </button>

//       </div>

//     </div>
//   );
// };

// export default PasswordInput;
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Password
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={value}
          onChange={onChange}
          placeholder="Enter your password"
          className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none transition-all focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;