"use client";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { io } from "socket.io-client";

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

  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (webcamPermission) {
      const interval = setInterval(() => {
        capture();
      }, 5000); // Change 5000 to your desired interval in milliseconds

      // Connect to the Python WebSocket server
      const socket = io("http://localhost:5000");

      // Listen for 'event' emitted from the server
      socket.on("detected_objects", (data) => {
        console.log("Received event:", data);
        // Handle the received data as needed
      });

      // Cleanup function to disconnect the socket when the component unmounts
      return () => {
        socket.disconnect();
        clearInterval(interval);
      };
    }
  }, [webcamPermission]);

  const capture = async () => {
    console.log("image capturing...");
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      // Convert imageSrc to base64
      const base64Image = imageSrc.split(",")[1];
      // console.log(base64Image);

      try {
        const response = await fetch("/api/image-detect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ base64Image }),
        });

        if (!response.ok) {
          throw new Error("Failed to send image data");
        } else {
          console.log("response ok...");
          const json = await response.json();
          console.log(json);
        }
      } catch (error) {
        console.error(error);
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

      <div className="mt-10">
        {webcamPermission ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={640}
              height={480}
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
