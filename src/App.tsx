import React, { useState, useEffect } from 'react';
import forge from 'node-forge';
import './App.css';

function App() {
  const [abonado, setAbonado] = useState<string>('');
  const [codigoBanco, setCodigoBanco] = useState<string>('');
  const [claveMac, setClaveMac] = useState<string>('');
  const [encryptedMac, setEncryptedMac] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<forge.pki.rsa.PublicKey | null>(null);

  useEffect(() => {
    // Cargar el archivo PEM desde la carpeta pública
    fetch('/keys/publicKey.pem')
      .then((response) => response.text())
      .then((pem) => {
        // Convertir el PEM en una clave pública usando forge
        const loadedPublicKey = forge.pki.publicKeyFromPem(pem);
        setPublicKey(loadedPublicKey);
      })
      .catch((error) => {
        console.error('Error al cargar la clave pública:', error);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (publicKey) {
      // Encriptar el contenido de claveMac
      const encrypted = publicKey.encrypt(claveMac, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
      });
      const encryptedBase64 = forge.util.encode64(encrypted);
      setEncryptedMac(encryptedBase64);
    }
  };

  return (
    <div className="App">
      <h1>Alta de clave MAC</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="abonado">Abonado:</label>
          <input
            type="text"
            id="abonado"
            value={abonado}
            onChange={(e) => setAbonado(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="codigoBanco">Código Banco:</label>
          <input
            type="text"
            id="codigoBanco"
            value={codigoBanco}
            onChange={(e) => setCodigoBanco(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="claveMac">Clave MAC:</label>
          <input
            type="password"
            id="claveMac"
            value={claveMac}
            onChange={(e) => setClaveMac(e.target.value)}
            required
          />
        </div>
        <button type="submit">Dar de Alta</button>
      </form>

      {encryptedMac && (
        <div>
          <h2>Resultado de la encriptación:</h2>
          <p>{encryptedMac}</p>
        </div>
      )}
    </div>
  );
}

export default App;
