import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Landing,
  Register,
  Error,
  SharedLayout,
  ProtectedRoute,
  SingleMuscle,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/singleMuscle/:id"
          element={
            <ProtectedRoute>
              <SingleMuscle />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
