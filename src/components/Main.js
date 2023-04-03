import React from 'react';
import profilePen from '../image/VectorPen.svg';
import Card from './Card';
import {CurrentUserContext} from '../context/CurrentUserContext';

function Main({cards, handleEditProfileClick, handleAddPlaceClick, handleEditAvatarClick, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (  
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__wrapper">
                        <img className="profile__avatar" src={currentUser.avatar} alt={`Изображение профиля, ${currentUser.name}`} />
                        <button className="profile__edit-avatar" type="button" onClick={() => handleEditAvatarClick(true)}>
                            <img className="profile__edit-pen" src={profilePen} alt="Письменная ручка" />
                        </button>
                    </div>
                    <div className="profile__info">
                        <div className="profile__container-title">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__edit-button" onClick={() => handleEditProfileClick(true)} type="button"></button>
                        </div>
                        <p className="profile__more">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" onClick={() => handleAddPlaceClick(true)} type="button"></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;