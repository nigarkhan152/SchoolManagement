import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 font-medium text-gray-700 transition hover:bg-gray-50 hover:shadow-md"
    >
      <FcGoogle size={22} />

      Continue with Google

    </button>
  );
};

export default GoogleLoginButton;