import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    //закрытия всех попапов и открытых карточек
    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard({});
    }

    return (
        <div className="page">
            <Header />
            <Main
                handleEditProfileClick={setEditProfilePopupOpen}
                handleAddPlaceClick={setAddPlacePopupOpen}
                handleEditAvatarClick={setEditAvatarPopupOpen}
                onCardClick={setSelectedCard}
            />
            <PopupWithForm
                title="Редактировать профиль"
                name="profile"
                buttonText="Сохранить"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            >
                <fieldset className="popup__fieldset">
                    <label className="popup__label">
                        <input className="popup__input popup__input_type_name" id="inputName" name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" required />
                        <span className="popup__input-error inputName-error"></span>
                    </label>
                    <label className="popup__label">
                        <input className="popup__input popup__input_type_more" id="inputMore" name="about" type="text" placeholder="О себе" minLength="2" maxLength="200" required />
                        <span className="popup__input-error inputMore-error"></span>
                    </label>
                </fieldset>
            </PopupWithForm>
            <PopupWithForm
                title="Новое место"
                name="cards"
                buttonText="Создать"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            >
                <fieldset className="popup__fieldset">
                    <label className="popup__label">
                        <input className="popup__input popup__input_card-name" id="inputCardName" name="name" type="text" placeholder="Название" minLength="2" maxLength="30" required />
                        <span className="popup__input-error inputCardName-error"></span>
                    </label>
                    <label className="popup__label">
                        <input className="popup__input popup__input_card-url" id="inputCardUrl" name="link" type="url" placeholder="Ссылка на картинку" required />
                        <span className="popup__input-error inputCardUrl-error"></span>
                    </label>
                </fieldset>
            </PopupWithForm>
            <PopupWithForm
                title="Обновить аватар"
                name="update-avatar"
                buttonText="Сохранить"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            >
                <fieldset className="popup__fieldset">
                    <label className="popup__label">
                        <input className="popup__input popup__input_type_link-avatar" id="nameAvatarInput" name="avatar" type="url" placeholder="Введите URL" required />
                        <span className="popup__input-error nameAvatarInput-error"></span>
                    </label>
                </fieldset>
            </PopupWithForm>
            <PopupWithForm
                title="Вы уверены?"
                name="confirmation"
                buttonText="Да"
            >
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <Footer />
        </div>
    );
}
export default App;
