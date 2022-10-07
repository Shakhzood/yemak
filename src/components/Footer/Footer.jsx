import React from "react";
import { Link } from "react-router-dom";
import { FaTelegram } from "react-icons/fa";

import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <div className="footer-section">
        <div className="box">
          <h2 className="yemak_link">yemak</h2>
          <p>mazali taomlar yetkazib berish</p>
          <a
            className="yemek-telegram"
            href={`https://t.me/YemakBot`}
            target="_blank"
            rel="noreferrer"
          >
            <FaTelegram /> <span>YemakBot</span>{" "}
          </a>
          <br />
          <p>biz bilan bog'lanish: +998752200105</p>
        </div>
        <div className="box">
          <a href="#" className="link-rule">
            Yemak haqida
          </a>{" "}
          <br /> <br />
          <a href="#" className="link-rule">
            Hamkorlarga
          </a>{" "}
          <br /> <br />
          <a href="#" className="link-rule">
            Foydalanish shartlari
          </a>{" "}
          <br />
          <br />
          <a href="https://t.me/YemakSupport" className="link-rule">
            Bogʻlanish
          </a>
        </div>
        <div className="box">
          <span className="link-rule">O'zbek</span> <br />
          <span className="link-rule">Русский</span>
          <div className="test">
            <a className="test" href="https://t.me/YemakBot">
              <img
                className="google-play-image"
                src="https://play.google.com/intl/en_us/badges/static/images/badges/uz_badge_web_generic.png"
                alt="google play orqali oling"
              />
            </a>
          </div>
          <div>
            <span>© 2022, yemak</span>
          </div>
        </div>
      </div>
      <div className="footer-corporation">
        <p>Sayt OPEN WEB kompaniyasi tomonidan ishlab chiqilgan.</p>
      </div>
    </>
  );
};

export default Footer;
