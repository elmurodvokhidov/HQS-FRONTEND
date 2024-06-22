import { useSelector } from "react-redux"

const PatientDashboard = () => {
    const { auth } = useSelector(state => state.auth);
    return (
        <div className="flex h-screen justify-center items-start pt-4 pc:pt-8">
            <div className="w-72 border border-gray-300 rounded-lg bg-white text-center p-4">
                <center>
                    <h3 style={{ fontSize: '20px' }}>Sizning raqamingiz:</h3>
                    <h1 style={{ fontSize: '60px', fontWeight: '600' }}>{auth?.queueNumber}</h1>
                    <h2 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: '600', textTransform: 'uppercase' }}>Sizdan oldin navbatda: <span>{auth?.symptom?.patients?.filter(patient => patient?.queueNumber < auth?.queueNumber).length}</span></h2>
                    <h6 style={{ fontSize: '15px' }}>Tanlangan xizmatlar:</h6>
                    <h2 style={{ fontSize: '25px', marginBottom: '10px', fontWeight: '600', textTransform: 'uppercase' }}>{auth?.symptom?.name}</h2>
                    <h3 style={{ fontSize: '15px' }}>Kelgan vaqt: <span>{new Date(auth?.createdAt).toLocaleString()}</span></h3>
                </center>
            </div>
        </div>
    )
}

export default PatientDashboard