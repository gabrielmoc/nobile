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

  return (
    <div className="home-container">
      {/* Slider */}
      <Slider {...settings}>
        <div><a href="#"><img src={banner1} alt="Banner 1" className="banner-img" /></a></div>
        <div><a href="#"><img src={banner2} alt="Banner 2" className="banner-img" /></a></div>
        <div><a href="#"><img src={banner3} alt="Banner 3" className="banner-img" /></a></div>
        <div><a href="#"><img src={banner4} alt="Banner 4" className="banner-img" /></a></div>
      </Slider>

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