import React, { useState } from 'react';

// Main App component for the login page
const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans antialiased text-gray-800">
      <Login />
    </div>
  );
};

// Login component
const Login = () => {
  // State to manage form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // State to simulate successful login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simple Navbar component
  const Navbar = () => (
    <nav className="bg-[#1a1a1a] shadow-lg text-white">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Placeholder for the Corpico logo */}
        <div className="flex items-center space-x-2">
          <img 
            src="https://placehold.co/50x50/ffffff/1a1a1a?text=Corpico" 
            alt="Corpico Logo" 
            className="w-10 h-10 rounded-full"
          />
          <span className="text-xl font-bold">Corpico</span>
        </div>
        <div>
          <span className="text-sm">Iniciar Sesión</span>
        </div>
      </div>
    </nav>
  );

  // Simple Footer component
  const Footer = () => (
    <footer className="bg-gray-800 text-white text-center py-4 text-xs mt-auto">
      <div className="container mx-auto">
        <p>&copy; Corpico 2023. Tumero creado por <span className="font-bold">Sección Sistemas.</span></p>
      </div>
    </footer>
  );

  // Handler for form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Simulate an API call
    try {
      // In a real application, you would make a fetch call here
      // to your .NET backend with JWT.
      // e.g., const response = await fetch('your-api-endpoint/login', { ... });
      const response = await new Promise((resolve) => setTimeout(() => {
        if (username === 'admin' && password === 'password') {
          resolve({ ok: true });
        } else {
          resolve({ ok: false, statusText: 'Credenciales inválidas' });
        }
      }, 1500)); // Simulate network delay

      if (response.ok) {
        setMessage('Inicio de sesión exitoso. Redirigiendo...');
        setIsLoggedIn(true);
        // Here you would store the JWT token and redirect the user
        // to the dashboard or home page.
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    // This is a placeholder for the page the user sees after logging in
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">Bienvenido, {username}!</h2>
            <p>Has iniciado sesión correctamente. Esta es la vista principal.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Usuario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {message && (
              <p className={`text-center text-sm mb-4 ${isLoggedIn ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            )}
            <div className="flex items-center justify-between">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
