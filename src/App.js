import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import ResidencePage from "./components/ResidencePage";
import PasswordResetPage from "./components/PasswordResetPage";

function App() {
  return (
    <Router>
      <div className="App">
        {/* إزالة nav<Link> لجعل التنقل يتم عبر URL فقط */}
        <Routes>
          <Route path="/aslamadmain123" element={<AdminPage />} />
          <Route path="/residence" element={<ResidencePage />} />
          <Route path="/password-reset" element={<PasswordResetPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
