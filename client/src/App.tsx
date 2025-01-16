import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.tsx";
import AuthForm from "./pages/authForm.tsx";
import { UserContext } from "./hooks/use-context.ts";
import { getItem } from "./utils/localStorage.ts";
import { ApiResponse } from "./types/apiResponse.ts";

const App = () => {
  const [userAuth, setUserAuth] = useState<ApiResponse>({
    access_token: "",
    profileImg: "",
    username: "",
    fullname: "",
  });

  useEffect(() => {
    const userToken: ApiResponse = getItem("user");

    userToken
      ? setUserAuth({
          access_token: userToken.access_token,
          profileImg: userToken.profileImg,
          fullname: userToken.fullname,
          username: userToken.username,
        })
      : setUserAuth({
          access_token: "",
          username: "",
          fullname: "",
          profileImg: "",
        });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="signin" element={<AuthForm authType="sign-in" />} />
          <Route path="signup" element={<AuthForm authType="sign-up" />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
