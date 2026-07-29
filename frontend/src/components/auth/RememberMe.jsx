const RememberMe = () => {
  return (
    <div className="flex items-center justify-between">

      <label className="flex items-center gap-2 text-sm text-gray-600">

        <input
          type="checkbox"
          className="h-4 w-4 rounded accent-sky-600"
        />

        Remember Me

      </label>

      <button
        type="button"
        className="text-sm font-medium text-sky-600 hover:text-sky-700"
      >
        Forgot Password?
      </button>

    </div>
  );
};

export default RememberMe;