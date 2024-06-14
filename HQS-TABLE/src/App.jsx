import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from "./config/service";
import { doctorSuccess } from "./redux/slices/doctorSlice";
import { patientSuccess } from "./redux/slices/patientSlice";
import { symptomSuccess } from "./redux/slices/symptomSlice";

const App = () => {
  const { patients } = useSelector(state => state.patient);
  // const { doctors } = useSelector(state => state.doctor);
  // const { symptoms } = useSelector(state => state.symptom);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllDoctorsFunction = async () => {
      const { data } = await service.getAllDoctor();
      dispatch(doctorSuccess({ data: data.data, type: "more" }));
    };
    const getAllPatientsFunction = async () => {
      const { data } = await service.getAllPatient();
      dispatch(patientSuccess({ data: data.data, type: "more" }));
    };
    const getAllSymptomsFunction = async () => {
      const { data } = await service.getAllSymptom();
      dispatch(symptomSuccess({ data: data.data, type: "more" }));
    };

    getAllDoctorsFunction();
    getAllPatientsFunction();
    getAllSymptomsFunction();
  }, []);

  return (
    <div className="h-screen flex flex-col gap-10 items-center justify-start pt-8">
      <div className="h-fit flex items-center border-2 border-green-500 rounded shadow-xl">
        <h1 className="text-7xl border-r-2 border-green-500 p-6">42</h1>
        <div className="flex flex-col justify-center p-6">
          <h2 className="text-2xl">Tohir Ergashev</h2>
          <div className="flex items-center gap-2 text-xl">
            <p>Shifokor:</p>
            <p className="font-semibold">Hamid Rustamov</p>
            <p>Lor</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {
          patients && patients.map(patient => (
            <div key={patient._id} className="h-fit flex items-center border-2 rounded shadow-xl">
              <h1 className="text-5xl border-r-2 p-6">{patient.queueNumber}</h1>
              <div className="flex flex-col justify-center p-6">
                <h2 className="text-xl">{patient.fullname}</h2>
                <div className="flex items-center gap-2 text-lg">
                  <p>Shifokor:</p>
                  <p className="font-semibold">{patient.doctor?.fullname}</p>
                  <p>{patient.symptom?.name}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App