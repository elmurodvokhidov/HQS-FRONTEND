import { useDispatch } from "react-redux";
import { Toast } from "../config/sweetToast";
import service from "../config/service";
import { useState } from "react";
import { patientStart } from "../redux/slices/patientSlice";

const PayModal = ({
    patientId,
    setIsPatientId,
    getAllPatientsFunction,
    isLoading,
}) => {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState("");

    const clearAndClose = () => {
        setIsPatientId(null);
        setAmount("");
    };

    const markSeenFunction = async () => {
        try {
            if (amount !== "") {
                dispatch(patientStart());
                await service.markSeen(patientId, amount);
                Toast.fire({ icon: "success", title: 'Muvaffaqiyatli belgilandi' });
                getAllPatientsFunction();
                clearAndClose();
            }
            else {
                Toast.fire({ icon: "warning", title: "Iltimos, barcha bo'sh joylarni to'ldiring!" });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div onClick={clearAndClose} className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full backdrop-blur-sm" style={{ display: patientId ? "flex" : "none" }}>
            <div onClick={(e) => e.stopPropagation()} className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between px-4 pt-4 rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Ko'rik ma'lumotlari
                        </h3>
                        <button onClick={clearAndClose} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4">
                            <div>
                                <label
                                    htmlFor="amount"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    <span>To'lov so'mmasi</span>
                                    <span className="ml-1 text-red-500">*</span>
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    value={amount}
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    required
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>
                            <button onClick={markSeenFunction} type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {isLoading ? "Loading..." : "Qo'shish"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayModal