import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import service from "../config/service";
import { Toast } from "../config/sweetToast";
import { authFailure, authStart, authSuccess } from "../redux/slices/authSlice";
import { setCookie } from "../config/cookiesService";

const PatientLogin = () => {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [newPatient, setNewPatient] = useState({
        fullname: "",
        phoneNumber: "",
    });
    const navigate = useNavigate();

    const getPatientCred = (e) => {
        setNewPatient({
            ...newPatient,
            [e.target.name]: e.target.value
        });
    };

    const loginFunction = async () => {
        try {
            if (newPatient.fullname !== "" && newPatient.phoneNumber !== "") {
                dispatch(authStart());
                const { data } = await service.loginPatient(newPatient);
                dispatch(authSuccess(data));
                setCookie("x-token", data.token, 30);
            }
            else {
                Toast.fire({ icon: "error", title: "Iltimos, barcha bo'sh joylarni to'ldiring!" });
            }
        } catch (error) {
            dispatch(authFailure(error.message));
            Toast.fire({ icon: "error", title: error.response?.data.message || error.message });
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/patient/dashboard');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="h-screen">
            <h1 className="text-center text-3xl mt-10">Hisobga kirish</h1>

            <form className="max-w-sm mx-auto my-10">
                <div className="mb-5">
                    <label
                        htmlFor="fullname"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        <span>Ismingiz (FIO)</span>
                        <span className="ml-1 text-red-500">*</span>
                    </label>
                    <input
                        onChange={getPatientCred}
                        type="text"
                        id="fullname"
                        name="fullname"
                        required
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>

                <div className="flex flex-col mb-5">
                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 pc:text-lg">
                        <span>Telefon raqamingiz</span>
                        <span className="ml-1 text-red-500">*</span>
                    </label>
                    <div className="flex">
                        <label htmlFor="phoneNumber" className="text-sm border border-r-0 rounded-l-lg border-gray-300 p-2.5">+998</label>
                        <input
                            onChange={getPatientCred}
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            className="w-full block border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm rounded-l-none p-2.5 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <button
                    onClick={loginFunction}
                    type="button"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    {isLoading ? "Loading..." : "Kirish"}
                </button>

                <Link to={'/'} className="text-blue-500 underline block text-center mt-4">Ro'yhatdan o'tish uchun, bu yerga...</Link>
            </form>
        </div>
    )
}

export default PatientLogin