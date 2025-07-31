import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const VisaForm = ({ setVisaInfo }) => {
  const allCountries = useMemo(() => countryList().getData(), []);
  const [citizen, setCitizen] = useState(null);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filter destinations so it can't be same as nationality
  const filteredDestinations = useMemo(() => {
    return allCountries.filter((country) => country.label !== citizen?.label);
  }, [citizen, allCountries]);

  const filteredCitizens = useMemo(() => {
    return allCountries.filter((country) => country.label !== destination?.label);
  }, [destination, allCountries]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!citizen || !destination) return;

    setLoading(true);
    const prompt = `What are the visa requirements for a citizen of ${citizen.label} traveling to ${destination.label} for tourism in 2025? Please provide accurate and concise information. Use **bold** for key requirements (e.g., Visa on Arrival, e-Visa, Visa-Free, etc.) and format the response in **clear Markdown with paragraphs**.`;

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-sonnet',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
          max_tokens: 300
        }),
      });

      const result = await res.json();
      const answer = result.choices?.[0]?.message?.content;
      setVisaInfo({
        destination: destination.label,
        requirement: 'Fetched via OpenRouter AI',
        details: answer?.trim()
          ? answer
          : 'Sorry, no visa details found. Try different countries or check spelling.',
      });
    } catch (error) {
      setVisaInfo({
        destination: destination.label,
        requirement: 'Error fetching data',
        details: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '0.75rem',
      border: '2px solid #2563eb',
      padding: '2px 4px',
      boxShadow: 'none',
      cursor: 'pointer',
      textAlign: 'left',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#dbeafe' : 'white',
      color: 'black',
      cursor: 'pointer',
      textAlign: 'left',
      borderRadius: '0.5rem',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0.75rem',
    }),
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Select
          options={filteredCitizens}
          value={citizen}
          onChange={setCitizen}
          styles={customStyles}
          placeholder="Select your nationality"
          isSearchable
        />
      </div>

      <div>
        <Select
          options={filteredDestinations}
          value={destination}
          onChange={setDestination}
          styles={customStyles}
          placeholder="Select your destination"
          isSearchable
        />
      </div>

      
      <button
        type="submit"
        disabled={loading}
        className={`${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        } hover:bg-[#2d2bb1dc] bg-[#2d2bb1] text-white py-2 px-6 rounded transition`}
      >
        {loading ? 'Fetching...' : 'Check Visa'}
      </button>
    </form>
  );
};

export default VisaForm;
