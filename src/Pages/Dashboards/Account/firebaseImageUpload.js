import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { Button } from "reactstrap";
function FireBaseImageUpload() {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    const storage = firebase.storage();
    e.preventDefault();
    const uploadTask = storage.ref(`/listings/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("listings")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
          localStorage.setItem("gotDownloadURL", url);
          console.log(localStorage.getItem("gotDownloadURL"));
        });
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <form role="imgForm" name="imgForm" id="imgForm" onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} />
        <center>
          <Button
            hidden={!file}
            fill="true"
            color="primary"
            disabled={!file}
            style={{
              alignSelf: "center",
              justifySelf: "center",
              display: "block",
              position: "relative",
              width: "55%",
            }}
            type="submit"
          >
            <h5 style={{ position: "relative", top: "-2px" }}>Upload Image</h5>
          </Button>{" "}
        </center>
      </form>
      <img style={{ maxWidth: "100%" }} src={url} alt="" />
    </div>
  );
}
export default FireBaseImageUpload;
