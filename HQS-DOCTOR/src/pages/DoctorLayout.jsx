import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect } from "react";
import { getCookie } from "../config/cookiesService";

const DoctorLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!getCookie("x-token")) navigate("/doctor/login");
    }, [navigate]);

    return (
        <div>
            {location.pathname !== '/doctor/login' && <Navbar />}
            <Outlet />
        </div>
    )
}

export default DoctorLayout