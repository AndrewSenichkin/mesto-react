import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, onAddPlace, onLoading, isOpen, }) {
    const [placeName, setPlaceName] = React.useState("");
    const [placeLink, setPlaceLink] = React.useState("");

    React.useEffect(() => {
        setPlaceName("");
        setPlaceLink("");
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: placeName,
            link: placeLink,
        });
    }

    function handleChangePlaceName(e) {
        setPlaceName(e.target.value);
    }

    function handleChangePlaceLink(e) {
        setPlaceLink(e.target.value);
    }
    return (
        <PopupWithForm
            title="Новое место"
            name="cards"
            buttonText={onLoading ? "Сохранение" : "Создать"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__fieldset">
                <label className="popup__label">
                    <input className="popup__input popup__input_card-name" 
                    id="inputCardName" 
                    name="name" 
                    type="text" 
                    placeholder="Название" 
                    minLength="2" 
                    maxLength="30"
                    valye={placeName}
                    onChange={handleChangePlaceName} 
                    required 
                    />
                    <span className="popup__input-error inputCardName-error"></span>
                </label>
                <label className="popup__label">
                    <input className="popup__input popup__input_card-url" 
                    id="inputCardUrl" 
                    name="link" 
                    type="url"
                    value={placeLink}
                    onChange={handleChangePlaceLink} 
                    placeholder="Ссылка на картинку" 
                    required 
                    />
                    <span className="popup__input-error inputCardUrl-error"></span>
                </label>
            </fieldset>
        </PopupWithForm>);
}

export default AddPlacePopup;