import React from 'react';
import '../styles/footer.css';
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-nobile">
      <div className="footer-top">
        <h2 className="logo">N<span className="logo-detail">o</span>bile</h2>
        <div className="social-icons">
          <FaInstagram />
          <FaTiktok />
          <FaFacebook />
        </div>
      </div>

      <div className="footer-links">
        <div>
          <h3>Comprar na Nobile</h3>
          <ul>
            <li>Seguro do comprador</li>
            <li>Garantia de autenticidade</li>
            <li>Processo de pagamento</li>
            <li>Políticas e termos</li>
          </ul>
        </div>

        <div>
          <h3>Vender na Nobile</h3>
          <ul>
            <li>Guia para vendedores</li>
            <li>Vender relógios como particular</li>
            <li>Avaliação de autenticidade</li>
          </ul>
        </div>

        <div>
          <h3>Sobre a Nobile</h3>
          <ul>
            <li>Sobre nós</li>
            <li>Como funciona</li>
            <li>Contato</li>
            <li>Perguntas frequentes</li>
            <li>Políticas e termos</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Todos os direitos reservados © Nobile V 1.0</p>
      </div>
    </footer>
  );
};

export default Footer;