"use client";
import React, { useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import styles from './page.module.css';

// Ensure the URL matches your backend server's Socket.IO endpoint
const socket = io('http://localhost:8000/ws');  // Adjust URL if necessary

const Page: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  socket.on('progress', (data) => {
    setProgress(data.progress);
    setMessage(data.message);
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post('http://localhost:8000/api/process-pdf/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <input type="file" onChange={handleFileChange} />
      <button className={styles.uploadButton} onClick={handleUpload}>Upload PDF</button>
      <div>
        <p>{message}</p>
        <progress value={progress} max="100">{progress}%</progress>
      </div>
    </div>
  );
};

export default Page;