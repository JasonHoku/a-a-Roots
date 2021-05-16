import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { Button } from "reactstrap";

function QuestionaireUploader() {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  return (
    <div style={{ width: "100%" }}>
      Sustainable Questionaire Coming Soon. <br />
      Please check back in a few days.
      {/*     <form role="radio" name="radio" id="radio" onSubmit={handleUpload}>
        <input type="radio" onChange={handleChange} /> 
      </form>*/}
    </div>
  );
}
export default QuestionaireUploader;
