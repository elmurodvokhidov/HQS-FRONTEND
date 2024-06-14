import { useSelector } from "react-redux"

const PatientDashboard = () => {
    const { auth } = useSelector(state => state.auth);
    return (
        <div className="flex h-screen justify-center items-start pt-4 pc:pt-8">
            <div className="flex flex-col gap-4 text-center mt-6 border shadow-smooth rounded-lg px-4 py-8">
                <h4>Sizning navbat raqamingiz</h4>
                <h1 className="size-12 flex items-center justify-center text-4xl bg-green-300 rounded-full text-blue-500 mx-auto">{auth?.queueNumber}</h1>
                <h1>Sizdan avval navbatda <b>{auth?.queueNumber - 1}</b>ta bemor bor</h1>
            </div>
        </div>
    )
}

export default PatientDashboard