import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/home" element={<HomePage />} />
            
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
  );
}
