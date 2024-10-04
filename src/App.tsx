import React, { useState } from 'react';
import './App.css';

function App() {
  // Definir los tipos de estado como `string` usando TypeScript
  const [abonado, setAbonado] = useState<string>('');
  const [codigoBanco, setCodigoBanco] = useState<string>('');
  const [claveMac, setClaveMac] = useState<string>('');

  // Tipar la función de manejo del formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica de la solicitud para dar de alta la clave MAC
    console.log('Abonado:', abonado);
    console.log('Código Banco:', codigoBanco);
    console.log('Clave MAC:', claveMac);
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
    </div>
  );
}

export default App;