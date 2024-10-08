import { debugData } from "@/utils/debugData";
import { fetchNui } from "@/utils/fetchNui";
import React, { useState } from "react";
import "./App.css";

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

interface ReturnClientDataCompProps {
  data: unknown;
}

const ReturnClientDataComp: React.FC<ReturnClientDataCompProps> = ({
  data,
}) => (
  <>
    <h5 className="text-lg font-semibold">Returned Data:</h5>
    <pre className="rounded bg-gray-700 p-4">
      <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    </pre>
  </>
);

interface ReturnData {
  x: number;
  y: number;
  z: number;
}

const App: React.FC = () => {
  const [clientData, setClientData] = useState<ReturnData | null>(null);

  const handleGetClientData = () => {
    fetchNui<ReturnData>("getClientData")
      .then((retData) => {
        console.log("Got return data from client scripts:");
        console.dir(retData);
        setClientData(retData);
      })
      .catch((e) => {
        console.error("Setting mock data due to error", e);
        setClientData({ x: 500, y: 300, z: 200 });
      });
  };
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex size-96 items-center justify-center rounded-lg bg-gray-800 text-white">
        <div className="text-center">
          <h1 className="text-xl font-bold">This is the NUI Popup!</h1>
          <p className="mt-2">Exit with the escape key</p>
          <button
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleGetClientData}
          >
            Get Client Data
          </button>
          {clientData && <ReturnClientDataComp data={clientData} />}
        </div>
      </div>
    </div>
  );
};

export default App;
