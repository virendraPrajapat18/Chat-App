import Left from "./home/left/Left";
import Right from "./home/right/Right";
import Logout from "./home/left/Logout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import toast,{Toaster} from "react-hot-toast";

function App() {
  const [authUser, setAuthUser] = useAuth();
  // console.log("authUser at App:",authUser);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Logout></Logout>
                <Left></Left>
                <Right></Right>
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
      </Routes>
      <Toaster/>
      {/* <Loading/> */}
    </>
  );
}

export default App;
