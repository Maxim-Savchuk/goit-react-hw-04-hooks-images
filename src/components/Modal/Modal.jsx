import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ModalEl } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, src, alt }) => {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    })

    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            onClose();
        }
    }

    const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    }

    return createPortal(
        <Overlay onClick={handleBackdropClick}>
            <ModalEl>
                <img src={src} alt={alt} />
            </ModalEl>
        </Overlay>,
        modalRoot
    )
}

Modal.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    onClose: PropTypes.func,
}