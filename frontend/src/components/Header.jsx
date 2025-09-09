import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import logo from "../assets/logo.svg";
import { FaBars } from "react-icons/fa";
import cart from "../assets/cart.svg";
import mala from "../assets/mala.svg";
import coracao from "../assets/coracao.svg";
import relogio from "../assets/relogio.svg";
import perfil from "../assets/perfil.svg";
import sair from "../assets/sair.svg";
import etiqueta from "../assets/etiqueta.svg";
import mao from "../assets/mao.svg";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      <header className="header-nobile">
        <div className="header-content">
          <Link to="/">
            <img src={logo} alt="Nobile" className="logo-img" />
          </Link>

          <div className="header-busca-links">
            <div className="esq">
              <a href="#" className="header-link">
                Perguntas frequentes
              </a>
              <a href="#" className="header-link">
                Vender meu relógio
              </a>
            </div>

            <input type="text" placeholder="Pesquisar 564.937 relógios..." />
          </div>

          <FaBars className="menu-icon" onClick={() => setMenuAberto(true)} />
        </div>
      </header>

      {menuAberto && (
        <div className="side-menu">
          <div className="menu-header">
            <Link to="/">
              <img src={logo} alt="Nobile" className="logo-img" />
            </Link>
            <button className="close-btn" onClick={() => setMenuAberto(false)}>
              ×
            </button>
          </div>

          <input
            type="text"
            placeholder="Pesquisar..."
            className="search-input"
          />

          <div className="menu-section">
            <p className="menu-title">Gerenciamento</p>
            <div className="menu-grid">
              <a href="#">
                <img src={cart} alt="Carrinho" />
                Meu carrinho
              </a>
              <a href="#">
                <img src={mala} alt="Compras" />
                Minhas compras
              </a>
              <a href="#">
                <img src={coracao} alt="Desejos" />
                Lista de desejos
              </a>
              <a href="#">
                <img src={relogio} alt="Coleção" />
                Minha coleção
              </a>
            </div>
          </div>

          <div className="menu-section">
            <p className="menu-title">Meus dados</p>
            <div className="menu-grid">
              <a href="#">
                <img src={perfil} alt="Perfil" />
                Meu perfil
              </a>
              <a href="#">
                <img src={mao} alt="Vender" />
                Vender
              </a>
              <a href="#">
                <img src={etiqueta} alt="Anúncios" />
                Meus anúncios
              </a>
            </div>
          </div>

          <div className="menu-section">
            <p className="menu-title">Opções</p>
            <div className="menu-grid">
              <a href="#" className="sair-link">
                <img src={sair} alt="Sair" />
                Sair
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
