import PropTypes from 'prop-types';
import { ImageGalleryItem } from "components/ImageGalleryItem";

import { ImageGalleryList } from "./ImageGallery.styled";

export const ImageGallery = ({ images, onSelect }) => {
    return (
        <ImageGalleryList>
            {images &&
                images.map(({ id, webformatURL, largeImageURL, tags }) => {
                    const selectImage = () => onSelect(largeImageURL, tags);
                    return (
                        <ImageGalleryItem
                            key={id}
                            webformatURL={webformatURL}
                            alt={tags}
                            onSelect={selectImage}
                        />
                    )
                })}
        </ImageGalleryList>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    onSelect: PropTypes.func,
}