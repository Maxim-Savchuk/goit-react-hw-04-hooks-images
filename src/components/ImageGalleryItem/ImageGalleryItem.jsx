import PropTypes from 'prop-types';

import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({ webformatURL, tag, onSelect }) => {
    return (
        <GalleryItem >
            <GalleryItemImage src={webformatURL} alt={tag} onClick={onSelect} />
        </GalleryItem>
    )
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string,
    tag: PropTypes.string,
    onSelect: PropTypes.func,
}