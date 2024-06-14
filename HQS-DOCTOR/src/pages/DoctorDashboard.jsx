import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { patientFailure, patientStart, patientSuccess } from "../redux/slices/patientSlice";
import AuthService from "../config/authService";
import tick from "../assets/icons/tick.svg";
import copy from "../assets/icons/copy.svg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DoctorDashboard = () => {
    const { auth } = useSelector(state => state.auth);
    const { patients, isLoading } = useSelector(state => state.patient);
    const dispatch = useDispatch();
    const [copied, setCopied] = useState("");
    const [loadingCell, setLoadingCell] = useState(null);

    const getAllPatientsFunction = async () => {
        try {
            dispatch(patientStart());
            const { data } = await AuthService.getAllPatient();
            dispatch(patientSuccess({ data: data.data, type: "more" }));
        } catch (error) {
            dispatch(patientFailure(error.message));
            console.log(error.message);
        }
    };

    useEffect(() => {
        getAllPatientsFunction();
    }, []);

    // Matnni nusxalash funksiyasi
    const handleCopy = (text) => {
        setCopied(text);
        navigator.clipboard.writeText(text);
        setTimeout(() => {
            setCopied("");
        }, 3000);
    };

    const markSeenFunction = async (patientId) => {
        try {
            setLoadingCell({ patientId });
            await AuthService.deletePatient(patientId);
            getAllPatientsFunction();
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingCell(null);
        }
    };

    const filteredPatients = patients.filter(patient => patient?.doctor?._id === auth?._id);

    return (
        <div className="container">
            <h1 className="text-xl mb-6">Qabuldagi bemorlar ro'yhati</h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Bemor ismi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Telefon raqami
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Navbat raqami
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amallar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {isLoading ? <tr><td className="py-12 text-center text-lg odd:bg-white even:bg-gray-50" colSpan={10}>Yuklanmoqda...</td></tr> : <> */}
                        {filteredPatients?.length > 0 ?
                            filteredPatients.map(patient => (
                                <tr key={patient._id} className={`${patient?.seen && 'text-gray-300'} odd:bg-white even:bg-gray-50 border-b`}>
                                    <th scope="row" className={`${patient?.seen ? 'text-gray-300' : 'text-gray-900'} px-6 py-4 font-medium whitespace-nowrap`}>
                                        {patient?.fullname}
                                    </th>
                                    <td onClick={() => handleCopy(patient?.phoneNumber)} className={`${patient?.seen ? 'text-gray-300' : 'text-blue-600'} px-6 py-4 flex items-center gap-1 cursor-pointer`}>
                                        {patient?.phoneNumber}
                                        <img
                                            src={copied === patient?.phoneNumber ? tick : copy}
                                            alt="copy svg"
                                            className="cursor-pointer" />
                                    </td>
                                    <td className="px-6 py-4 font-bold">
                                        {patient?.queueNumber}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            disabled={patient?.seen}
                                            onClick={() => markSeenFunction(patient?._id)}
                                            className="font-medium text-blue-600 hover:underline disabled:no-underline disabled:text-gray-300">
                                            {
                                                loadingCell && loadingCell.patientId === patient?._id ?
                                                    <AiOutlineLoading3Quarters className="animate-spin text-sm pc:text-base m-auto" /> :
                                                    "Ko'rildi"
                                            }
                                        </button>
                                    </td>
                                </tr>
                            )) :
                            <tr><td className="py-12 text-center text-lg odd:bg-white even:bg-gray-50" colSpan={10}>Bemor mavjud emas</td></tr>}
                        {/* </>} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DoctorDashboard