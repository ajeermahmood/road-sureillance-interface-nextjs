"use client";
import { incrementCount } from "@/redux/objectDetectionSlice";
import { socket } from "@/socket";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";

const LiveFeed: React.FC = () => {
  ///////////// Redux //////////////////
  const dispatch = useDispatch();

  ///////////// Redux //////////////////

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const [intervalBtwScreenshot, setInervalBtw] = useState(0);

  const webcamRef = useRef<Webcam>(null);
  const [webcamPermission, setWebcamPermission] = useState(false);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("detected_objects", (data) => {
      // console.log("Received event:", data);
      setInervalBtw((prev) => prev + 1);
      // console.log(data.items) 
      for (let i of data.items) { 
        dispatch(incrementCount(i));
      }
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const toggleWebcam = (toggle: boolean) => {
    if (toggle) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          console.log("received accesss.");
          setWebcamPermission(true);
        })
        .catch((err) => console.log(err));
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          stream!.getVideoTracks()[0].stop();
          stream!.getAudioTracks()[0].stop();
          console.log("accesss revoked.");
          setWebcamPermission(false);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (webcamPermission) {
      setTimeout(() => {
        capture();
      }, 5000);
    }
  }, [webcamPermission, intervalBtwScreenshot]);

  const capture = async () => {
    console.log("image capturing...");
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Convert imageSrc to base64
      const base64Image = imageSrc.split(",")[1];
      socket.emit("image", { img: base64Image });
    } else {
      console.log("screenshot not recieved..");
    }
  };

  return (
    <div>
      <h1 className="mb-10">Live feed</h1>
      <p>
        Websocket Status: {isConnected ? "connected" : "disconnected"} ,
        Transport: {transport}
      </p>
      <p>Cam Status: {webcamPermission ? "ON" : "OFF"}</p>
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

      <div className="mt-10">
        {webcamPermission ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={160}
              height={120}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LiveFeed;
