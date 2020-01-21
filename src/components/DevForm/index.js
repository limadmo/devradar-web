/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import './style.css';


function DevForm({ onSubmit }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // eslint-disable-next-line no-shadow
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      () => {},
      {
        timeout: 3000,
      },

    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      githubUsername,
      techs,
      latitude,
      longitude,
    });
    setGithubUsername('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="githubUsername">Usuário do Github</label>
        <input
          name="githubUsername"
          id="githubUsername"
          value={githubUsername}
          required
          onChange={(e) => setGithubUsername(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          value={techs}
          required
          onChange={(e) => setTechs(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            value={latitude}
            required
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="longitude">longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            value={longitude}
            required
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;
