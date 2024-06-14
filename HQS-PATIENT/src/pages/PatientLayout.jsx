import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { getCookie } from "../config/cookiesService";

const PatientLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!getCookie("x-token")) navigate("/");
    }, [navigate]);

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default PatientLayout