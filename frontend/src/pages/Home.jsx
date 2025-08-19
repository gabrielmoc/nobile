import React from 'react';
import '../styles/Home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import banner1 from '../assets/banner1.svg';
import banner2 from '../assets/banner2.svg';
import banner3 from '../assets/banner3.svg';
import banner4 from '../assets/banner4.svg';

import fim1 from '../assets/fim1.svg';
import fim2 from '../assets/fim2.svg';
import fim3 from '../assets/fim3.svg';
import fim4 from '../assets/fim4.svg';
import fim5 from '../assets/fim5.svg';
import fim6 from '../assets/fim6.svg';

import marca1 from '../assets/marca1.svg';
import marca2 from '../assets/marca2.svg';
import marca3 from '../assets/marca3.svg';
import marca4 from '../assets/marca4.svg';
import marca5 from '../assets/marca5.svg';
import marca6 from '../assets/marca6.svg';
import marca7 from '../assets/marca7.svg';
import marca8 from '../assets/marca8.svg';
import marca9 from '../assets/marca9.svg';
import marca10 from '../assets/marca10.svg';
import marca11 from '../assets/marca11.svg';
import marca12 from '../assets/marca12.svg';

const Home = () => {
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

  const marcas = [
    { img: marca1, nome: 'Rolex' },
    { img: marca2, nome: 'Tag Heuer' },
    { img: marca3, nome: 'Brietling' },
    { img: marca4, nome: 'Audemars Piguet' },
    { img: marca5, nome: 'Patek Phillipe' },
    { img: marca6, nome: 'Hublot' },
    { img: marca7, nome: 'Cartier' },
    { img: marca8, nome: 'Seiko' },
    { img: marca9, nome: 'Omega' },
    { img: marca10, nome: 'IWC' },
    { img: marca11, nome: 'Panerai' },
    { img: marca12, nome: 'Tissot' },
  ];

  return (
    <div className="home-container">
      {/* Slider */}
      <Slider {...settings}>
        <div><a href="#"><img src={banner1} alt="Banner 1" className="banner-img" /></a></div>
        <div><a href="#"><img src={banner2} alt="Banner 2" className="banner-img" /></a></div>
        <div><a href="#"><img src={banner3} alt="Banner 3" className="banner-img" /></a></div>
        <div><a href="#"><img src={banner4} alt="Banner 4" className="banner-img" /></a></div>
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

      {/* Como funciona */}
      <section className="como-funciona">
        <p className="subtitulo">Como funciona</p>
        <h2 className="titulo">Entregamos com segurança<br />e garantia de qualidade</h2>

        <div className="etapas">
          <div className="etapa">
            <img src={fim1} alt="Escolha seu relógio" />
            <h3>Você escolhe o seu relógio</h3>
            <p>Explore nossa coleção e encontre o relógio perfeito para você.</p>
          </div>
          <div className="etapa">
            <img src={fim2} alt="Pagamento" />
            <h3>Realiza o pagamento</h3>
            <p>Finalize sua compra com segurança e diversas opções de pagamento.</p>
          </div>
          <div className="etapa">
            <img src={fim3} alt="Envio" />
            <h3>Vendedor envia o relógio</h3>
            <p>O vendedor despacha seu relógio com cuidado e segurança.</p>
          </div>
          <div className="etapa">
            <img src={fim4} alt="Certificação" />
            <h3>Certificamos a autenticidade</h3>
            <p>Nosso time de especialistas verifica cada detalhe para garantir a originalidade.</p>
          </div>
          <div className="etapa">
            <img src={fim5} alt="Entrega" />
            <h3>Seu relógio é entregue</h3>
            <p>Receba seu relógio com toda a segurança e proteção que você merece.</p>
          </div>
          <div className="etapa">
            <img src={fim6} alt="Recebimento do valor" />
            <h3>Vendedor recebe o valor</h3>
            <p>O pagamento é liberado ao vendedor após a confirmação da entrega.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;