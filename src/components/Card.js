import React from "react";

function Card(card) {
    function handleClick() {
        card.onCardClick(card);
    }
    return (
        <article className="element">
            <button className="element__trash" type="button"></button>
            <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
            <div className="element__container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__container-like">
                    <button className="element__smile" type="button"></button>
                    <p className="element__count-likes">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}
 export default Card;