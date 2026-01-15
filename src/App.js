import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isZoomed, setIsZoomed] = useState(false);
  const [sloganPhase, setSloganPhase] = useState(0);

  useEffect(() => {
    const electionDate = new Date('2026-03-08T00:00:00');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = electionDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSloganPhase(prev => prev === 0 ? 1 : 0);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '573113134949';
    const message = 'Hola, me gustaría solicitar información sobre la candidatura al Senado de María Irma Norena.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sloganPhases = ["Faltan Solo", "¡Estamos Listos!"];

  return (
    <div className="App">
      {[...Array(6)].map((_, i) => (
        <img
          key={i}
          src="https://raw.githubusercontent.com/appyem/imagenesappy/refs/heads/main/logo%20de%20la%20U.webp"
          alt="Logo La U Fondo"
          className="u-logo-bg"
          style={{
            width: '55px',
            top: `${10 + (i * 18) % 80}%`,
            left: `${5 + (i * 22) % 90}%`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${21.25 - i * 1.5}s`
          }}
        />
      ))}

      <div className="candidate-section">
        <motion.img
          src="https://raw.githubusercontent.com/appyem/imagenesappy/refs/heads/main/irma%20fredy.jpeg"
          alt="Candidata María Irma Norena"
          className="candidate-image"
          onClick={handleImageClick}
          animate={{
            scale: isZoomed ? 1.05 : 1,
          }}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 15px 30px rgba(0,0,0,0.4), 0 0 0 3px rgba(217,108,141,0.6)"
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25,
            duration: 0.3 
          }}
        />
      </div>

      <div className="countdown-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={sloganPhase}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ 
              duration: 0.6,
              ease: "easeInOut"
            }}
            className="slogan-text"
          >
            {sloganPhases[sloganPhase]}
          </motion.div>
        </AnimatePresence>
        
        <div className="countdown-grid">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <motion.div
              key={unit}
              className="countdown-item"
              whileHover={{ 
                y: -3,
                backgroundColor: 'rgba(255,255,255,0.18)'
              }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <div className="countdown-number">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="countdown-label">
                {unit === 'days' ? 'DÍAS' : 
                 unit === 'hours' ? 'HORAS' : 
                 unit === 'minutes' ? 'MIN' : 'SEG'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bottom-section">
        <div className="main-slogan">De Caldas y por Caldas</div>
        
        <div className="logo-number-row">
          <motion.div
            className="party-logo"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="https://raw.githubusercontent.com/appyem/imagenesappy/refs/heads/main/logo%20de%20la%20U.webp"
              alt="Partido La U"
            />
          </motion.div>
          
          <motion.div
            className="candidate-number"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            99
          </motion.div>
        </div>

        <div className="social-buttons">
          <motion.button
            className="social-button"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            onClick={handleWhatsAppClick}
            whileHover={{ y: -3, scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="https://raw.githubusercontent.com/appyem/imagenesappy/refs/heads/main/logo%20whatsapp.jpg"
              alt="WhatsApp"
            />
          </motion.button>

          <motion.a
            href="https://www.facebook.com/share/1DATu429BK/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
            style={{ background: 'linear-gradient(135deg, #1877F2, #0d5cb6)' }}
            whileHover={{ y: -3, scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="https://raw.githubusercontent.com/appyem/imagenesappy/refs/heads/main/facebook.png"
              alt="Facebook"
            />
          </motion.a>

          <motion.a
            href="https://www.instagram.com/mariairmanorena?igsh=MW40enF3dnM0OHE1dQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
            style={{ background: 'linear-gradient(45deg, #833AB4, #FD1D1D, #FCB045)' }}
            whileHover={{ y: -3, scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="https://raw.githubusercontent.com/appyem/imagenesappy/refs/heads/main/instagram.webp"
              alt="Instagram"
            />
          </motion.a>

          <motion.a
            href="https://forms.gle/jdJHr3CHpKLdXVQU6"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
            style={{ background: 'linear-gradient(135deg, #4CAF50, #2E7D32)' }}
            whileHover={{ y: -3, scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="https://raw.githubusercontent.com/appyem/imagenesappy/refs/heads/main/formulario.png"
              alt="Formulario"
            />
          </motion.a>
        </div>
      </div>
    </div>
  );
}

export default App;