import React ,{ useState, useEffect, useContext, createContext } from 'react';
import './App.css';
import UserRegister from './Components/UserLink/UserRegister';
import DailyRecord from './Components/RecordLink/DailyRecord';
import { Routes, Route } from 'react-router-dom';
import UserLogin from './Components/UserLink/UserLogin';
import Mainpage from './Components/Home-Main/Mainpage';
import Homepage from './Components/Home-Main/Homepage';
import Event from "./Components/Event";
import GraphRecord from './Components/RecordLink/GraphRecord';
import axios from 'axios';
import CreateEvent from "./Components/EventLink/CreateEvent.jsx";
import GetSingleEventPage from "./Components/EventLink/EventSinglePage";
import UpdateEvent from "./Components/EventLink/UpdateEvent";
import DeleteEvent from "./Components/EventLink/DeleteEvent.jsx";

export const UserIDContext = createContext();


function App() {

  const [userLoginDetailId, setUserLoginDetailId] =useState()

  useEffect(() => {
    axios
      .get("/api/session")
      .then((response) => {
        //console.log("session login check:", response.data);
        setUserLoginDetailId(response.data._id);
      })
      .catch((error) => {
        console.log("user login error", error);
      });
  }, []);

  return (
    <>
      <UserIDContext.Provider value={userLoginDetailId}>
        <Routes>
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/toUserRegister" element={<UserRegister />} />
          <Route path="/dailyRecord" element={<DailyRecord />} />
          <Route path="/event" element={<Event />} />
          <Route path="/event/create" element={<CreateEvent />} />
          <Route path="/event/page/:id" element={<GetSingleEventPage />} />
          <Route path="/event/:id" element={<UpdateEvent />} />
          <Route path="/event/delete/:id" element={<DeleteEvent />} />
          <Route path="/mainpage" element={<Mainpage />} />
          <Route path="/toGraphrecord" element={<GraphRecord />}/>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </UserIDContext.Provider>
    </>
  );
}

export default App;
