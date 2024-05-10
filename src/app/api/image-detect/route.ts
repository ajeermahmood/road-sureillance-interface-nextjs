import { NextApiRequest, NextApiResponse } from "next";
import io from "socket.io-client";

const imageDetect = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { base64Image } = req.body;

      // Connect to the Python WebSocket server
      const socket = io("http://localhost:5000");

      // Send the base64Image to the server
      socket.emit("image", { base64Image });

      // Close the socket connection after sending the image
      // socket.close();

      return new Response(JSON.stringify({ message: "success" }), {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ message: "Internal Server Error" }),
        {
          status: 500,
        }
      );
      // res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    // res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export { imageDetect as POST };
