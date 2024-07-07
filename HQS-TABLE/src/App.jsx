import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from "./config/service";
import { symptomSuccess } from "./redux/slices/symptomSlice";
import { io } from "socket.io-client";
import { patientSuccess } from "./redux/slices/patientSlice";
import { baseURL } from "./config/api";
import logo from "../public/images/logo.png"
import { FaPhoneAlt } from "react-icons/fa";

const App = () => {
  const { patients } = useSelector(state => state.patient);
  // const { symptoms } = useSelector(state => state.symptom);
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(baseURL);
    const socket = socketRef.current;

    socket.on('patientAdded', (patient) => {
      dispatch(patientSuccess({ data: patient, type: "add" }));
    });
    socket.on('updatePatient', (update) => {
      dispatch(patientSuccess({ data: update, type: "update" }));
      audioRef.current.play().catch((error) => {
        console.log("Playback failed due to user interaction policy: ", error);
      });
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

  const filteredPatients = patients?.filter(patient => !patient?.seen);

  return (
    <div className="w-full h-screen overflow-hidden">
      <audio
        ref={audioRef}
        src="../public/sounds/Electronic-queue-sound-Sound-effect.m4a"
        className="hidden"
      />
      <div className="flex items-center px-6 py-4 bg-gradient-to-b from-white to-blue-300 shadow-smooth">
        <h1 className="largest:w-[400px] w-[300px] text-3xl text-center font-semibold">Barcha navbat</h1>
        <div className="w-full flex justify-end">
          <figure className="largest:size-16 size-14 overflow-hidden rounded-full">
            <img className="size-full object-cover" crossOrigin="anonymous" src={logo} alt="company logo" />
          </figure>
        </div>
      </div>
      <div className="size-full flex bg-gradient-to-b from-white to-blue-300">
        <div className="largest:w-[400px] w-[300px] flex flex-col items-center gap-6 p-4">
          {
            filteredPatients?.slice(1, 9)?.map(patient => (
              <h1
                key={patient?._id}
                className="text-7xl font-semibold">
                {patient?.queueNumber}
              </h1>
            ))
          }
        </div>
        <div className="w-full largest:h-[900px] pc:h-[700px] h-[500px] flex flex-col items-center justify-center bg-white">
          {/* <h1 className="pc:text-7xl text-6xl">Joriy navbat</h1> */}
          <h1 className="largest:text-[400px] text-[300px] font-semibold">
            {filteredPatients[0]?.queueNumber}
          </h1>
        </div>
        <div className="flex items-center gap-4 absolute bottom-10 right-8 text-3xl">
          <p className="flex items-center gap-2 border-r-2 border-r-black pr-4"><FaPhoneAlt className="text-blue-700" /> <span>1344</span></p>
          <p>78 148 00 10</p>
        </div>
      </div>
    </div>
  )
}

export default App