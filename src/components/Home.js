import React from "react";
import Notes from "./Notes";

const Home = ({showAlert}) => {
  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  );
};

export default Home;
