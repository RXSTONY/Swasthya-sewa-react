import React, { useState } from 'react';

function DoctorSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:5000/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("❌ Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>🔍 Doctor Search</h2>
      <input
        type="text"
        placeholder="Search by name, specialization, clinic..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ width: '300px', padding: '8px' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '8px', padding: '8px 16px' }}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      {results.length > 0 && (
        <table style={{ marginTop: '1rem', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Specialization</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Clinic</th>
              <th style={thStyle}>Clinic Address</th>
              <th style={thStyle}>Experience</th>
            </tr>
          </thead>
          <tbody>
            {results.map((doc, idx) => (
              <tr key={idx}>
                <td style={tdStyle}>{doc.name}</td>
                <td style={tdStyle}>{doc.specialization}</td>
                <td style={tdStyle}>{doc.address}</td>
                <td style={tdStyle}>{doc.clinicName}</td>
                <td style={tdStyle}>{doc.clinicAddress}</td>
                <td style={tdStyle}>{doc.experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && results.length === 0 && query && (
        <p>No doctors found matching “{query}”.</p>
      )}
    </div>
  );
}

const thStyle = { border: '1px solid #ccc', padding: '8px', background: '#f2f2f2' };
const tdStyle = { border: '1px solid #ccc', padding: '8px' };

export default DoctorSearch;
