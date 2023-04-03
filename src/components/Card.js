import React from "react";
import {CurrentUserContext} from '../context/CurrentUserContext';

function Card({card, onCardLike, onCardClick, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        onCardClick(card);
    }
    function handleLikeClick () {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onCardDelete(card);
    }
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwner = card.owner._id === currentUser._id;
    const deleteButtonClassName = `element__trash ${isOwner ? "element__trash_active" : ""}`
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__smile ${isLiked ? 'element__smile_active' : ""}`;

    return (
        <article className="element">
            <button className={deleteButtonClassName} onClick={handleDeleteClick} type="button" />
            <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
            <div className="element__container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__container-like">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <p className="element__count-likes">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}
 export default Card;