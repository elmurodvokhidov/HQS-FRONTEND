import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCookie } from "./config/cookiesService"
import AuthService from "./config/authService"
import { authSuccess } from "./redux/slices/authSlice"
import PatientRegister from "./pages/PatientRegister"
import PatientLayout from "./pages/PatientLayout"
import PatientDashboard from "./pages/PatientDashboard"

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("x-token")) {
      async function patientInfoFunction() {
        try {
          const { data } = await AuthService.patientInfo();
          dispatch(authSuccess(data));
        } catch (error) {
          console.log(error);
          navigate('/');
        }
      };
      patientInfoFunction();
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<PatientRegister />} />
        <Route path="patient" element={<PatientLayout />}>
          <Route path="dashboard" element={<PatientDashboard />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App