import React from 'react';
import profilePen from '../image/VectorPen.svg';
import api from '../utils/Api';
import Card from './Card';

function Main({ handleEditProfileClick, handleAddPlaceClick, handleEditAvatarClick, onCardClick }) {
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setInitialCards] = React.useState([])

    React.useEffect(() => {
        api.getAboutUserInfo().then((propsUserInfo) => {
            setUserName(propsUserInfo.name)
            setUserDescription(propsUserInfo.about)
            setUserAvatar(propsUserInfo.avatar)
        })
            .catch((err) => console.log(`Ошибка: ${err}`))
        api.getInitialCards().then((cardData) => {
            setInitialCards(
                cardData.map((data) => ({
                    likes: data.likes,
                    name: data.name,
                    link: data.link,
                    cardId: data._id
                }))
            )
        })
            .catch((err) => console.log(`Ошибка:${err}`));
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__wrapper">
                        <img className="profile__avatar" src={userAvatar} alt="Изображение профиля, пользователя" />
                        <button className="profile__edit-avatar" type="button" onClick={() => handleEditAvatarClick(true)}>
                            <img className="profile__edit-pen" src={profilePen} alt="Письменная ручка" />
                        </button>
                    </div>
                    <div className="profile__info">
                        <div className="profile__container-title">
                            <h1 className="profile__name">{userName}</h1>
                            <button className="profile__edit-button" onClick={() => handleEditProfileClick(true)} type="button"></button>
                        </div>
                        <p className="profile__more">{userDescription}</p>
                    </div>
                </div>
                <button className="profile__add-button" onClick={() => handleAddPlaceClick(true)} type="button"></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card.cardId}
                        likes={card.likes}
                        name={card.name}
                        link={card.link}
                        onCardClick={onCardClick}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;