import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Common from "./component/common";

import { lazy } from "react";
const PatientData = lazy(() => import("./pages/patientData"));
const Notice = lazy(() => import("./pages/notice"));
const Doctor = lazy(() => import("./pages/doctor"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Common />}>
            <Route index element={<PatientData />} />{/* 患者データ */}
            <Route path="/notice" element={<Notice />} /> {/* 通知一覧 */}
            <Route path="/doctor" element={<Doctor />} /> {/* 医師の閲覧 */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
