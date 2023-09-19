import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./component/navbar";
import Dashboard from "./component/dashboard";
import Preview from "./component/previewbox";

function App() {
  const [path, setPath] = useState({});
  const [exif, setExif] = useState({});
  const [bolb, setBolb] = useState("");

  return (
    <motion.div className="w-full md:h-full md:px-16 flex flex-col bg-white overflow-hidden relative">
      {/* Navbar */}
      <Navbar />
      {/* App */}
      <div className="md:flex-1 bg-white md:overflow-hidden flex flex-col md:flex-row-reverse md:gap-16 md:pt-2 pb-4 md:pb-20">
        {/* Preview */}
        <Preview path={path} exif={exif} bolb={bolb} setBolb={setBolb} />
        {/* Dashboard */}
        <Dashboard
          path={path}
          setPath={setPath}
          exif={exif}
          setExif={setExif}
          bolb={bolb}
        />
      </div>
    </motion.div>
  );
}

export default App;
