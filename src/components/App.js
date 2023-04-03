import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../context/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
function App() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState({});
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [cards, setCards] = React.useState([])
    //закрытия всех попапов и открытых карточек
    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard({});
    }

    function handleUpdateUser(dataUser) {
        setIsLoading(true)
        api
            .editProfileUserInfo(dataUser)
            .then((data) => {
                setCurrentUser(data)
                closeAllPopups()
            })
            .catch(err => console.log(`Ошибка ${err}`))
            .finally(() => setIsLoading(false))
    }
    // Сохранение данных при создании карточки
    function handleAddPlaceSubmit(data) {
        setIsLoading(true)
        api
            .addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => console.log(`Ошибка: ${err}`))
            .finally(() => setIsLoading(false))
    }

    function handleCardLike(card) {
        // Проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(user => user._id === currentUser._id);
        if (!isLiked) {
            api.addLike(card._id)
                .then((newCard) => {
                    setCards(state => state.map((item) => item._id === card._id ? newCard : item))
                })
                .catch(err => console.log(`Ошибка ${err}`));
        }
        else {
            api.deleteLike(card._id)
                .then((newCard) => {
                    setCards(state => state.map((item) => item._id === card._id ? newCard : item))
                })
                .catch(err => console.log(`Ошибка ${err}`));
        }
    }

    function handleCardDelete(card) {
        api
            .deleteCard(card._id)
            .then(() =>
                setCards((state) => state.filter((item) => item._id !== card._id))
            )
            .catch(err => console.log(`Ошибка: ${err}`))
    }

    React.useEffect(() => {
        api.getAboutUserInfo()
            .then((userData) => setCurrentUser(userData))
            .catch((err) => console.log(`Ошибка: ${err}`))

        api.getInitialCards().then((cardData) => {
            setCards(
                cardData.map((card) => ({
                    _id: card._id,
                    likes: card.likes,
                    name: card.name,
                    link: card.link,
                    owner: card.owner,
                }))
            )
        })
            .catch((err) => console.log(`Ошибка: ${err}`));
    }, [])

    return (
        <CurrentUserContext.Provider value={currentUser} >
            <div className="page">
                <Header />
                <Main
                    handleEditProfileClick={setEditProfilePopupOpen}
                    handleAddPlaceClick={setAddPlacePopupOpen}
                    handleEditAvatarClick={setEditAvatarPopupOpen}
                    onCardClick={setSelectedCard}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onUpdateUser={handleUpdateUser}
                    onLoading={isLoading}
                    onClose={closeAllPopups}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    onLoading={isLoading}
                />
                <PopupWithForm
                    title="Вы уверены?"
                    name="confirmation"
                    buttonText="Да"
                >
                </PopupWithForm>
                <ImagePopup 
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <Footer />
            </div>
        </CurrentUserContext.Provider>
    );
}
export default App;
