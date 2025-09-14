import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner1 from "../assets/banner1.svg";
import banner2 from "../assets/banner2.svg";
import banner3 from "../assets/banner3.svg";
import banner4 from "../assets/banner4.svg";

import vend1 from "../assets/vend1.svg";
import vend2 from "../assets/vend2.svg";
import vend3 from "../assets/vend3.svg";
import vend4 from "../assets/vend4.svg";

import fim1 from "../assets/fim1.svg";
import fim2 from "../assets/fim2.svg";
import fim3 from "../assets/fim3.svg";
import fim4 from "../assets/fim4.svg";
import fim5 from "../assets/fim5.svg";
import fim6 from "../assets/fim6.svg";

import marca1 from "../assets/marca1.svg";
import marca2 from "../assets/marca2.svg";
import marca3 from "../assets/marca3.svg";
import marca4 from "../assets/marca4.svg";
import marca5 from "../assets/marca5.svg";
import marca6 from "../assets/marca6.svg";
import marca7 from "../assets/marca7.svg";
import marca8 from "../assets/marca8.svg";
import marca9 from "../assets/marca9.svg";
import marca10 from "../assets/marca10.svg";
import marca11 from "../assets/marca11.svg";
import marca12 from "../assets/marca12.svg";

import desktop from "../assets/prot-dsk.svg";
import mobile from "../assets/prot-mbl.svg";

import desk from "../assets/desk.svg";
import mob from "../assets/mob.svg";

import left from "../assets/prev.png";
import right from "../assets/next.png";

import feedbackIcon from "../assets/feedback.svg";
import iconeCoracao from "../assets/coracao.svg";

const Home = () => {
  const [relogios, setRelogios] = useState([]);

  useEffect(() => {
    const buscarRelogios = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/api/watches");
        const dados = await resposta.json();

        const ultimos = dados
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        setRelogios(ultimos);
      } catch (erro) {
        console.error("Erro ao buscar relógios:", erro);
      }
    };

    buscarRelogios();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const Arrow = ({ className, style, onClick, dir }) => (
    <button
      type="button"
      className={`${className} custom-arrow ${dir}`}
      style={style}
      onClick={onClick}
      aria-label={dir === "prev" ? "Anterior" : "Próximo"}
    >
      <img src={dir === "prev" ? left : right} alt="" />
    </button>
  );

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: "15%",
    responsive: [
      { breakpoint: 1280, settings: { centerPadding: "12%" } },
      { breakpoint: 991, settings: { centerPadding: "10%" } },
      { breakpoint: 768, settings: { centerPadding: "8%" } },
      { breakpoint: 480, settings: { centerPadding: "0" } },
    ],
    prevArrow: <Arrow dir="prev" />,
    nextArrow: <Arrow dir="next" />,
  };

  const marcas = [
    { img: marca1, nome: "Rolex" },
    { img: marca2, nome: "Tag Heuer" },
    { img: marca3, nome: "Breitling" },
    { img: marca4, nome: "Audemars Piguet" },
    { img: marca5, nome: "Patek Philippe" },
    { img: marca6, nome: "Hublot" },
    { img: marca7, nome: "Cartier" },
    { img: marca8, nome: "Seiko" },
    { img: marca9, nome: "Omega" },
    { img: marca10, nome: "IWC" },
    { img: marca11, nome: "Panerai" },
    { img: marca12, nome: "Tissot" },
  ];

  return (
    <div className="home-container">
      {/* Slider */}
      <Slider {...settings}>
        <div>
          <a href="#">
            <img src={banner1} alt="Banner 1" className="banner-img" />
          </a>
        </div>
        <div>
          <a href="#">
            <img src={banner2} alt="Banner 2" className="banner-img" />
          </a>
        </div>
        <div>
          <a href="#">
            <img src={banner3} alt="Banner 3" className="banner-img" />
          </a>
        </div>
        <div>
          <a href="#">
            <img src={banner4} alt="Banner 4" className="banner-img" />
          </a>
        </div>
      </Slider>

      {/* Marcas */}
      <section className="marcas">
        <div className="marcas-slider">
          {marcas.map((marca, index) => (
            <a href="#" className="marca" key={index}>
              <div className="marca-icon">
                <img src={marca.img} alt={marca.nome} />
              </div>
              <p>{marca.nome}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Sugestões para você */}
      <section className="sugestoes">
        <div className="sugestoes-topo">
          <h2 className="titulo">Sugestões para você</h2>
          <a href="#" className="ver-tudo">
            Ver tudo
          </a>
        </div>

        <div className="sugestoes-grid">
          {relogios.map((relogio, index) => (
            <div className="relogio-card" key={index}>
              <div className="relogio-imagem">
                <img src={relogio.images[0]} alt={relogio.model} />
              </div>
              <p className="relogio-marca">
                {relogio.brand}
                <img
                  src={feedbackIcon}
                  alt="Selo de feedback"
                  className="icon-verificado"
                />
              </p>
              <h3 className="relogio-nome">{relogio.model}</h3>
              <p className="relogio-descricao">{relogio.description}</p>
              <div className="relogio-preco-fav">
                <p className="relogio-preco">
                  R$ {Number(relogio.price).toLocaleString("pt-BR")}
                </p>
                <img
                  src={iconeCoracao}
                  alt="Favorito"
                  className="icon-coracao"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seguro */}
      <section className="secao-protecao">
        <picture>
          <source media="(max-width: 991px)" srcSet={mobile} />
          <img src={desktop} alt="Proteção completa na compra" />
        </picture>
      </section>

      {/* Relógios em Destaque */}
      <section className="secao-destaques">
        <h2 className="titulo-destaques">RELÓGIOS EM DESTAQUE</h2>
        <Slider {...settings2}>
          {relogios.map((relogio, index) => (
            <div className="slide-destaque" key={index}>
              <img
                src={relogio.images[0]}
                alt={relogio.model}
                className="imagem-destaque"
              />
              <p className="nome-destaque">{relogio.model}</p>
              <p className="preco-destaque">
                R$ {Number(relogio.price).toLocaleString("pt-BR")}
              </p>
            </div>
          ))}
        </Slider>
      </section>

      {/* Vendedores destaque*/}
      <section className="vendedores-svg">
        <h2 className="vendedoresm-titulo">Vendedores destaque</h2>

        <div className="vendedores-svg-grid">
          <div className="vend-svg-item">
            <a href="#" className="vend-svg-card">
              <img src={vend1} alt="Cordial Watches" />
            </a>
            <p className="vend-nome">Cordial Watches</p>
          </div>

          <div className="vend-svg-item">
            <a href="#" className="vend-svg-card">
              <img src={vend2} alt="TMG Time Gateways" />
            </a>
            <p className="vend-nome">TMG Time Gateways</p>
          </div>

          <div className="vend-svg-item">
            <a href="#" className="vend-svg-card">
              <img src={vend3} alt="Fist Wear." />
            </a>
            <p className="vend-nome">Fist Wear.</p>
          </div>

          <div className="vend-svg-item">
            <a href="#" className="vend-svg-card">
              <img src={vend4} alt="Linksor Joias" />
            </a>
            <p className="vend-nome">Linksor Joias</p>
          </div>
        </div>
        <a href="#" className="vend-btn-mobile">
          Ver todos vendedores
        </a>
      </section>

      {/* Vire vendedor (banner) */}
      <section className="vire-vendedor">
        <a
          href="#"
          className="vire-vendedor__link"
          aria-label="Vire vendedor na Nobile"
        >
          <picture>
            <source media="(max-width: 991px)" srcSet={mob} />
            <img src={desk} alt="Vire vendedor na Nobile" loading="lazy" />
          </picture>
        </a>
        <p>
          Oferecemos uma plataforma segura, elegante e com visibilidade
          internacional para que você possa vender suas peças com confiança.
        </p>
      </section>

      {/* Como funciona */}
      <section className="como-funciona">
        <p className="subtitulo">Como funciona</p>
        <h2 className="titulo">
          Entregamos com segurança
          <br />e garantia de qualidade
        </h2>

        <div className="etapas">
          <div className="etapa">
            <img src={fim1} alt="Escolha seu relógio" />
            <h3>Você escolhe o seu relógio</h3>
            <p>
              Explore nossa coleção e encontre o relógio perfeito para você.
            </p>
          </div>
          <div className="etapa">
            <img src={fim2} alt="Pagamento" />
            <h3>Realiza o pagamento</h3>
            <p>
              Finalize sua compra com segurança e diversas opções de pagamento.
            </p>
          </div>
          <div className="etapa">
            <img src={fim3} alt="Envio" />
            <h3>Vendedor envia o relógio</h3>
            <p>O vendedor despacha seu relógio com cuidado e segurança.</p>
          </div>
          <div className="etapa">
            <img src={fim4} alt="Certificação" />
            <h3>Certificamos a autenticidade</h3>
            <p>
              Nosso time de especialistas verifica cada detalhe para garantir a
              originalidade.
            </p>
          </div>
          <div className="etapa">
            <img src={fim5} alt="Entrega" />
            <h3>Seu relógio é entregue</h3>
            <p>
              Receba seu relógio com toda a segurança e proteção que você
              merece.
            </p>
          </div>
          <div className="etapa">
            <img src={fim6} alt="Recebimento do valor" />
            <h3>Vendedor recebe o valor</h3>
            <p>
              O pagamento é liberado ao vendedor após a confirmação da entrega.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
