import React from 'react';
import FileUpload from "./components/FileUpload";

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>PLANITY - TechOps Fullstack Technical Test 2024 - Beauclair BILONG</p>
        <span className="App-span">Objective : The purpose of this test is to evaluate skills in React interface development and Node.js API, as well as the ability to efficiently handle a CSV file. The candidate must create a user interface for uploading a CSV file, send it to a Node.js API that processes the file, and then return the zipped result to the client.</span>
        <span className="App-span">The CSV file is available at that link : <a target='_blank' className="App-link" href='https://drive.google.com/file/d/1MG0MoczOYM-UoFsEQN8ThRyyG3aH4v4Y/view?usp=sharing'>Google drive</a></span>
      </header>
      <main>
        <FileUpload />
      </main>
    </div>
  );
}

export default App;
