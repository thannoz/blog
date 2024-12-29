import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.tsx";
import AuthForm from "./pages/authForm.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="signin" element={<AuthForm authType="sign-in" />} />
        <Route path="signup" element={<AuthForm authType="sign-up" />} />
      </Route>
    </Routes>
  );
};

export default App;
