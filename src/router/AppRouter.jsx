import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Library from "../pages/Library";
import Quest from "../pages/Quest";
import CreateQuest from "../pages/CreateQuest";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} /> {/* було "/" */}
          <Route path="/quest/:id" element={<Quest />} />
          <Route path="/create" element={<CreateQuest />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
