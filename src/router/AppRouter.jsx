import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
// import Library, Quest, Profile, CreateQuest, Login, Register later

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Інші маршрути додаси пізніше */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
