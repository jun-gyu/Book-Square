import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SearchBooks from './pages/SearchBooks';
import MyLibrary from './pages/MyLibrary';
import MyReport from './pages/MyReport';
import DiscussionRoom from './pages/DiscussionRoom';
import MyPage from './pages/MyPage';
import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";
import ModalBg from "./components/ModalBG";
import WriteReport from './pages/WriteReport';
import { useSelector } from "react-redux";

const App = () => {
  const modalLoading = useSelector((state) => state.modalLoading.bool);
  return (
    <div className="App">
      <Switch>
        <Route exact component={MainPage} path={"/"} />
        <Route component={SearchBooks} path={"/SearchBooks"} />
        <Route component={MyLibrary} path={"/MyLibrary"} />
        <Route component={MyReport} path={"/MyReport"} />
        <Route component={WriteReport} path={"/WriteReport"} />
        <Route component={DiscussionRoom} path={"/DiscussionRoom"} />
        <Route component={MyPage} path={"/MyPage"} />
        <Route component={SignIn} path={"/SignIn"} />
        <Route component={SignUp} path={"/SignUp"} />
      </Switch>
      {modalLoading && <ModalBg />}
    </div>
  );
}

export default App;
