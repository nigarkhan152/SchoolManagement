import { Mail } from "lucide-react";

const LoginInput = ({ value, onChange }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Email Address
      </label>

      <div className="relative">
        <Mail
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="email"
          name="email"
          value={value}
          onChange={onChange}
          placeholder="Enter your email"
          className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
        />
      </div>
    </div>
  );
};

export default LoginInput;