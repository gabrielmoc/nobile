import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";
import logo from "../assets/logo.svg";
import ig from "../assets/ig.svg";
import tk from "../assets/tk.svg";
import fc from "../assets/fc.svg";

const Footer = () => {
  return (
    <footer className="footer-nobile">
      <div className="footer-content">
        <div className="footer-top">
          <div className="social-icons">
            <Link to="/">
              <img src={logo} alt="Nobile" className="logo-img" />
            </Link>
            <a href="#">
              <img src={ig} alt="Instagram" />
            </a>
            <a href="#">
              <img src={tk} alt="TikTok" />
            </a>
            <a href="#">
              <img src={fc} alt="Facebook" />
            </a>
          </div>
          <p className="footer-description">
            Nascemos para ajudar vendedores e compradores a terem mais
            segurança.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h3>Comprar na Nobile</h3>
            <ul>
              <li>
                <a href="#">Seguro do comprador</a>
              </li>
              <li>
                <a href="#">Garantia de autenticidade</a>
              </li>
              <li>
                <a href="#">Processo de pagamento</a>
              </li>
              <li>
                <a href="#">Políticas e termos</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Vender na Nobile</h3>
            <ul>
              <li>
                <a href="#">Guia para vendedores</a>
              </li>
              <li>
                <a href="#">Vender relógios como particular</a>
              </li>
              <li>
                <a href="#">Avaliação de autenticidade</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Sobre a Nobile</h3>
            <ul>
              <li>
                <a href="#">Sobre nós</a>
              </li>
              <li>
                <a href="#">Como funciona</a>
              </li>
              <li>
                <a href="#">Contato</a>
              </li>
              <li>
                <a href="#">Perguntas frequentes</a>
              </li>
              <li>
                <a href="#">Políticas e termos</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Desenvolvido por{" "}
          <a
            href="https://gabrielcavalcanti.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Gabriel Cavalcanti</strong>
          </a>{" "}
          © 2025. Todos os direitos autorais reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
