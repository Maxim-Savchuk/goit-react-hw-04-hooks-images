import PropTypes from 'prop-types';

import { Button } from "./Button.styled"

export const LoadMoreButton = ({ onClick, title }) => {
    return (
        <Button type="button" onClick={onClick}>
            {title}
        </Button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string,
}