"use client";
import { RootState } from "@/redux/rootReducer";
import React from "react";
import { useSelector } from "react-redux";

const CardDashboard: React.FC = () => {
  const detections = useSelector(
    (state: RootState) => state.objectDetection.detections
  );

  // Check if detections is empty
  const isDetectionsEmpty = Object.keys(detections).length === 0;
  return (
    <div className="p-7">
      <a
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Detected Objects
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here display the amount of objects that got detected by camera.
        </p>

        {isDetectionsEmpty ? (
          <p className="mt-2 font-bold text-xl text-gray-700 dark:text-gray-400">
            No items detected.
          </p>
        ) : (
          <ul>
            {Object.entries(detections).map(([itemName, count]) => (
              <li key={itemName}>
                <p className="mt-2 font-bold text-xl text-gray-700 dark:text-gray-400">
                  {itemName}: {count}
                </p>
              </li>
            ))}
          </ul>
        )}
      </a>
    </div>
  );
};

export default CardDashboard;
