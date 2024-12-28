import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.tsx";
import SignIn from "./pages/sign-in.tsx";
import SignUp from "./pages/sign-up.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default App;
