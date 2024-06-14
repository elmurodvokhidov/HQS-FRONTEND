import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { symptomFailure, symptomStart, symptomSuccess } from "../redux/slices/symptomSlice";
import AuthService from "../config/authService";
import { Toast } from "../config/sweetToast";
import { authFailure, authStart, authSuccess } from "../redux/slices/authSlice";
import { setCookie } from "../config/cookiesService";

const PatientRegister = () => {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const { symptoms } = useSelector(state => state.symptom);
    const dispatch = useDispatch();
    const [newPatient, setNewPatient] = useState({
        fullname: "",
        phoneNumber: "",
        symptom: "",
        doctor: "",
    });
    const navigate = useNavigate();

    const getAllSymptomFunction = async () => {
        try {
            dispatch(symptomStart());
            const { data } = await AuthService.getAllSymptom();
            dispatch(symptomSuccess({ data: data.data, type: "more" }));
        } catch (error) {
            dispatch(symptomFailure(error.message));
            console.log(error.message);
        }
    };

    useEffect(() => {
        getAllSymptomFunction();
    }, []);

    const getPatientCred = (e) => {
        setNewPatient({
            ...newPatient,
            [e.target.name]: e.target.value
        });
    };

    const registerFunction = async () => {
        try {
            if (newPatient.fullname !== "" && newPatient.phoneNumber !== "" && newPatient.symptom !== "" && newPatient.doctor !== "") {
                dispatch(authStart());
                const { data } = await AuthService.registerPatient(newPatient);
                dispatch(authSuccess(data));
                setCookie("x-token", data.token, 30);
            }
            else {
                Toast.fire({
                    icon: "error",
                    title: "Iltimos, barcha bo'sh joylarni to'ldiring!"
                });
            }
        } catch (error) {
            dispatch(authFailure(error.message));
            Toast.fire({
                icon: "error",
                title: error.response?.data.message || error.message
            });
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/patient/dashboard');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="h-screen">
            <h1 className="text-center text-3xl mt-10">Ro'yhatdan o'tish</h1>

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

                <div className="flex items-center gap-6 mb-5">
                    <div className="w-full">
                        <label
                            htmlFor="symptom"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            <span>Kasallik turi</span>
                            <span className="ml-1 text-red-500">*</span>
                        </label>
                        <select onChange={getPatientCred} name="symptom" id="symptom" required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value="" className="italic">None</option>
                            {
                                symptoms?.map(sym => (
                                    <option value={sym?._id} key={sym._id}>{sym?.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="doctor"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            <span>Shifokorni tanglang</span>
                            <span className="ml-1 text-red-500">*</span>
                        </label>
                        <select onChange={getPatientCred} name="doctor" id="doctor" required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value="" className="italic">None</option>
                            {
                                symptoms.find(sym => sym._id === newPatient.symptom)?.doctors?.map(doc => (
                                    <option value={doc?._id} key={doc?._id}>{doc?.fullname}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <button
                    onClick={registerFunction}
                    type="button"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    {isLoading ? "Loading..." : "Ro'yxatdan o'tish"}
                </button>
            </form>
        </div>
    )
}

export default PatientRegister