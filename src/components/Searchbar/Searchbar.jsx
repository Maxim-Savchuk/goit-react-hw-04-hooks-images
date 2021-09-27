import { Component } from "react";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import {
    SearchbarContainer,
    SearchForm,
    SearchFormBtn,
    SearchFormBtnLabel,
    SearchFormInput
} from "./Searchbar.styled";

export class Searchbar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
    }

    state = {
        imageName: '',
    }

    handleNameChange = evt => {
        this.setState({ imageName: evt.currentTarget.value.toLowerCase() })
    }

    handleSubmit = evt => {
        evt.preventDefault();
        const { onSubmit } = this.props;
        const { imageName } = this.state;

        if (imageName.trim() === '') {
            toast.error('Please enter the image name.')
            return;
        }

        onSubmit(imageName);

        this.setState({ imageName: '' })
    }

    render() {
        const { imageName } = this.state;

        return (
            <SearchbarContainer>
                <SearchForm onSubmit={this.handleSubmit}>
                    <SearchFormBtn type="submit">
                        <SearchFormBtnLabel>Search</SearchFormBtnLabel>
                    </SearchFormBtn>

                    <SearchFormInput
                        type="text"
                        autocomplete="off"
                        autoFocus
                        value={imageName}
                        placeholder="Search images and photos"
                        onChange={this.handleNameChange}
                    />
                </SearchForm>
            </SearchbarContainer>
        )
    }
}