import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './style.css';

const CSVUploadComponent = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle file selection
    const handleFileSelect = (event) => {
        setSelectedFiles(event.target.files);
        setUploadStatus('');
    };

    // Function to handle the upload process
    const handleUpload = async () => {
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        try {
            setUploadStatus('Uploading...');
            // Making a POST request using axios
            await axios.post('http://localhost:8081/upload-csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadStatus('Upload successful!');
            navigate('/customer'); // Navigate to the customer page
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('Upload failed. Please try again.');
        }
    };

    return (
        <div>
            <input type="file" class = "file`   3" multiple onChange={handleFileSelect} />
            <button onClick={handleUpload}>Upload</button>
            {uploadStatus && <div className="upload-status">{uploadStatus}</div>}
        </div>
    );
};

export default CSVUploadComponent;
