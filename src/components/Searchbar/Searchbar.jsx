import { useState } from "react";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import {
    SearchbarContainer,
    SearchForm,
    SearchFormBtn,
    SearchFormBtnLabel,
    SearchFormInput
} from "./Searchbar.styled";

export const Searchbar = ({ onSubmit }) => {
    const [imageName, setImageName] = useState('');

    const handleNameChange = e => {
        setImageName(e.target.value.toLowerCase());
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (imageName.trim() === '') {
            toast.error('Please enter the image name.')
            return;
        }

        onSubmit(imageName);
        setImageName('');
    }

    return (
        <SearchbarContainer>
            <SearchForm onSubmit={handleSubmit}>
                <SearchFormBtn type="submit">
                    <SearchFormBtnLabel>Search</SearchFormBtnLabel>
                </SearchFormBtn>

                <SearchFormInput
                    type="text"
                    autocomplete="off"
                    autoFocus
                    value={imageName}
                    placeholder="Search images and photos"
                    onChange={handleNameChange}
                />
            </SearchForm>
        </SearchbarContainer>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
}