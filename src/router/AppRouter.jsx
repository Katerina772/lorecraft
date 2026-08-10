// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainLayout from "../components/layout/MainLayout";
// import Home from "../pages/Home";
// import Library from "../pages/Library";
// import Quest from "../pages/Quest";
// import CreateQuest from "../pages/CreateQuest";

// export default function AppRouter() {
//   return (
//     <BrowserRouter>
//       <MainLayout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/library" element={<Library />} /> {/* було "/" */}
//           <Route path="/quest/:id" element={<Quest />} />
//           <Route path="/create" element={<CreateQuest />} />
//         </Routes>
//       </MainLayout>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Library from "../pages/Library";
import Quest from "../pages/Quest";
import CreateQuest from "../pages/CreateQuest";
import PlayQuest from "../pages/PlayQuest";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile"; // створимо пізніше
import MyLibrary from "../pages/MyLibrary"; // створимо пізніше
import ProtectedRoute from "../components/common/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/quest/:id" element={<Quest />} />
          <Route path="/quest/:id/play" element={<PlayQuest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Захищені маршрути */}
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateQuest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-library"
            element={
              <ProtectedRoute>
                <MyLibrary />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
