import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from "./config/service";
import { symptomSuccess } from "./redux/slices/symptomSlice";
import { io } from "socket.io-client";
import { patientSuccess } from "./redux/slices/patientSlice";

const App = () => {
  const { patients } = useSelector(state => state.patient);
  const { symptoms } = useSelector(state => state.symptom);
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');
    const socket = socketRef.current;

    socket.on('patientAdded', (patient) => {
      dispatch(patientSuccess({ data: patient, type: "add" }));
    });
    socket.on('updatePatient', (update) => {
      dispatch(patientSuccess({ data: update, type: "update" }));
    });
    socket.on('patientDeleted', ({ id }) => {
      dispatch(patientSuccess({ data: id, type: "delete" }));
    });

    return () => {
      socket.off('patientAdded');
      socket.off('updatePatient');
      socket.off('patientDeleted');
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    const getAllPatientssFunction = async () => {
      try {
        const { data } = await service.getAllPatient();
        dispatch(patientSuccess({ data: data.data, type: "more" }));
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    const getAllSymptomsFunction = async () => {
      try {
        const { data } = await service.getAllSymptom();
        dispatch(symptomSuccess({ data: data.data, type: "more" }));
      } catch (error) {
        console.error("Error fetching symptoms:", error);
      }
    };


    getAllPatientssFunction();
    getAllSymptomsFunction();
  }, [dispatch]);

  return (
    <div className="h-screen flex flex-wrap justify-between items-start gap-12 px-12 py-4">
      {
        symptoms?.map(symptom => (
          <div key={symptom?._id} className="text-center">
            <h1 className="border-b-2 text-2xl p-2 font-bold">{symptom?.name}</h1>
            {
              patients?.filter(patient => patient?.symptom?._id === symptom?._id).filter(patient => !patient?.seen).map((patient, index) => (
                <h1 key={patient?._id} className={`${index === 0 ? 'text-black' : 'text-gray-500'} text-3xl p-2`}>{patient?.queueNumber}</h1>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default App