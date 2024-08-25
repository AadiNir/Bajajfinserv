import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
    const [jsonData, setJsonData] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    useEffect(() => {
        document.title = "21BLC1531"; // Replace with your actual roll number
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Sending Data:', jsonData);
            const parsedData = JSON.parse(jsonData);
            console.log('Parsed Data:', parsedData);
            const res = await axios.post('https://bajajfinserv-5nvzsto6l-aadinirs-projects.vercel.app/bfhl', { data: parsedData });
            setResponse(res.data);
            setError('');
        } catch (err) {
            console.error('Error:', err.response ? err.response.data : err.message);
            setError('Invalid JSON input');
            setResponse(null);
        }
    };
    
  
  

    const handleSelectChange = (selected) => {
        setSelectedOptions(selected);
    };

    const renderFilteredResponse = () => {
        if (!response) return null;

        const filteredResponse = {};

        selectedOptions.forEach(option => {
            filteredResponse[option.value] = response[option.value];
        });

        return (
            <div>
                {Object.keys(filteredResponse).map(key => (
                    <div key={key}>
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {filteredResponse[key].join(', ')}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <h1>Roll Number: 21BLC1531</h1> {/* Replace ABCD123 with your actual roll number */}
            <form onSubmit={handleSubmit}>
                <label>
                    API Input:
                    <textarea
                        value={jsonData}
                        onChange={(e) => setJsonData(e.target.value)}
                        rows="5"
                        cols="50"
                        placeholder='["M","1","334","4","B"]'
                    />
                </label>
                <button type="submit">Submit</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {response && (
                <>
                    <Select
                        isMulti
                        name="filters"
                        options={[
                            { value: 'numbers', label: 'Numbers' },
                            { value: 'alphabets', label: 'Alphabets' },
                            { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
                        ]}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSelectChange}
                    />
                    <div>
                        <h3>Filtered Response</h3>
                        {renderFilteredResponse()}
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
