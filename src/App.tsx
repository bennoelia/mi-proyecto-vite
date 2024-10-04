import React, { useState } from 'react';
import forge from 'node-forge';
import './App.css';

function App() {
  // Definir los estados
  const [abonado, setAbonado] = useState<string>('');
  const [codigoBanco, setCodigoBanco] = useState<string>('');
  const [claveMac, setClaveMac] = useState<string>('');
  const [encryptedMac, setEncryptedMac] = useState<string | null>(null);

  // Generar un par de claves RSA (esto puede hacerse de manera síncrona para fines de demostración)
  const generateRSAKeyPair = () => {
    const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);
    return { privateKey, publicKey };
  };

  const { publicKey } = generateRSAKeyPair();

  // Manejar el envío del formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Encriptar el contenido de la clave MAC usando la clave pública
    const encrypted = publicKey.encrypt(claveMac, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
    });

    // Convertir el resultado cifrado en base64 para mostrarlo
    const encryptedBase64 = forge.util.encode64(encrypted);

    // Mostrar el resultado de la encriptación
    setEncryptedMac(encryptedBase64);
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

      {/* Mostrar el resultado de la encriptación si existe */}
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
