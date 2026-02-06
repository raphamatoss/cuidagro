import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ModalProvider } from './contexts/ModalProvider';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import SymptomsPage from "./pages/SymptomsPage";
import MyHealthPage from "./pages/MyHealthPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import PesticidesPage from "./pages/PesticidesPage";
import DiagnosisResultPage from './pages/DiagnosisPage';


export default function App() {
  return (
    <ModalProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage/>} />
                
                <Route path="/home" element={<HomePage />} />
                <Route path="/symptoms" element={<SymptomsPage/>}/>
                <Route path="/health" element={<MyHealthPage/>}/>
                <Route path="/appointments" element={<AppointmentsPage/>}/>
                <Route path="/pesticide" element={<PesticidesPage/>}/>
                <Route path="/diagnosis" element={<DiagnosisResultPage />} />

                <Route path="/" element={<Navigate to={"/login"} replace />} />
                
                <Route path="*" element={
                        // to-do: fazer página Not Found
                        <div className="p-10 text-center text-red-500 ">
                            Página não encontrada!
                        </div>
                    } 
                />

            </Routes>
        </BrowserRouter>    
    </ModalProvider>
  );
}
