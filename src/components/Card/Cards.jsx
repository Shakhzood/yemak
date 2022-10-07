import React, { useState, useEffect } from "react";
import { AiOutlinePlusCircle, AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCards } from "../../Store/Thunk";

import CardContentLoader from "./CardContentLoader";
import AddCardPopup from "./AddCardPopup";

import "./Cards.scss";
import VerifyBankCard from "./VerifyBankCard";
import DeleteModal from "./DeleteCardModal/DeleteModal";

const Cards = () => {
  const { cards, loading } = useSelector((state) => state.UserReducer);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVerifyOpen, setVerifyOpen] = useState(false);
  const [isDeleteCard, setDeleteCard] = useState(false);
  const [cardId, setCardId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserCards());
    return () => {};
  }, []);

  const deleteCardFunc = (id) => {
    setDeleteCard(true);
    setCardId(id);
  };

  const loadingArr = [undefined, undefined];
  const isLoading =
    loading && loadingArr.map((item, idx) => <CardContentLoader key={idx} />);
  return (
    <>
      {isModalOpen && (
        <AddCardPopup
          setVerifyOpen={setVerifyOpen}
          setModalOpen={setModalOpen}
        />
      )}
      {isVerifyOpen && (
        <VerifyBankCard
          setVerifyOpen={setVerifyOpen}
          setModalOpen={setModalOpen}
        />
      )}
      {isDeleteCard && (
        <DeleteModal cardId={cardId} setDeleteCard={setDeleteCard} />
      )}

      <div className="card-container">
        <div className="card-inside">
          <p>Mening kartalarim</p>
          <div className="cards my_cards">
            {isLoading}
            {cards?.map((item) => {
              const newStr =
                item.exp_date.slice(0, 2) + "/" + item.exp_date.slice(2);
              return (
                <div className="Cards_card" onClick={() => {}} key={item.id}>
                  <div className="Cards_firstSection">
                    <div className="Cards_cardLogo">
                      <img
                        width={65}
                        src="https://yemak.uz/static/media/Uzcard.cfe4ceab.png"
                        alt="uzcard"
                      />
                    </div>
                    <span
                      className="card-delete-btn"
                      onClick={() => deleteCardFunc(item.id)}
                    >
                      <AiFillDelete size={30} />
                    </span>
                  </div>
                  <div className="Cards_thirdSection">
                    <div>
                      <img
                        className="credit-card"
                        width={35}
                        src="https://yemak.uz/static/media/credit-card.436f7335.svg"
                        alt="creditCard"
                      />
                    </div>{" "}
                    <span className="Cards_cardNumber">{item.number}</span>
                    <span className="Cards_cardDate">{newStr}</span>
                  </div>
                </div>
              );
            })}
            <div className="card" onClick={() => setModalOpen(true)}>
              <span className="box_first_circle"></span>
              <span className="box_second_circle"></span>
              <AiOutlinePlusCircle size={72} style={{ color: "white" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
