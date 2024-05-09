"use client";
import React, { useState } from "react";
import Webcam from "react-webcam";

const LiveFeed: React.FC = () => {
  var myStream: MediaStream | undefined;

  const [webcamPermission, setWebcamPermission] = useState(false);

  const toggleWebcam = (toggle: boolean) => {
    if (toggle) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          console.log("received accesss");
          myStream = stream;
          setWebcamPermission(true);
        })
        .catch((err) => console.log(err));
    } else {
      if (myStream != undefined) {
        myStream!.getVideoTracks()[0].stop();
        console.log("accesss revoked");
        setWebcamPermission(false);
      }
    }
  };

  return (
    <div>
      <h1 className="mb-10">Live feed</h1>
      <button
        onClick={() => toggleWebcam(true)}
        className="mr-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Open Webcam
      </button>
      <button
        onClick={() => toggleWebcam(false)}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Revoke Webcam
      </button>

      <div className="mt-10">{webcamPermission ? <Webcam /> : <></>}</div>
    </div>
  );
};

export default LiveFeed;
