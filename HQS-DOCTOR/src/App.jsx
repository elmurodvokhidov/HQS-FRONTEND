import { Route, Routes, useNavigate } from "react-router-dom"
import DoctorLayout from "./pages/DoctorLayout"
import DoctorLogin from "./pages/DoctorLogin"
import DoctorDashboard from "./pages/DoctorDashboard"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCookie } from "./config/cookiesService"
import AuthService from "./config/authService"
import { authSuccess } from "./redux/slices/authSlice"
import DoctorProfile from "./pages/DoctorProfile"

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie("x-token")) {
      async function doctorInfoFunction() {
        try {
          const { data } = await AuthService.doctorInfo();
          dispatch(authSuccess(data));
        } catch (error) {
          console.log(error);
          navigate('/');
        }
      };
      doctorInfoFunction();
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<DoctorLogin />} />
        <Route path="doctor" element={<DoctorLayout />}>
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="profile" element={<DoctorProfile />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App