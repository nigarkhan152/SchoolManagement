import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };
    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">

            <h1 className="text-5xl font-bold text-slate-800">
                Welcome Admin 🎉
            </h1>

            <p className="mt-4 text-slate-600">
                Dashboard Coming Soon...
            </p>

            <button
                onClick={handleLogout}
                className="mt-8 rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700 transition"
            >
                Logout
            </button>

        </div>

    );

};

export default Dashboard;