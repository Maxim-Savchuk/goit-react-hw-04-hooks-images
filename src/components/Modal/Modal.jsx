import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ModalEl } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends PureComponent {
    static propTypes = {
        src: PropTypes.string,
        alt: PropTypes.string,
        onClose: PropTypes.func,
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillMount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = evt => {
        if (evt.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdropClick = evt => {
        if (evt.currentTarget === evt.target) {
            this.props.onClose();
        }
    }

    render() {
        const { src, alt } = this.props;
        return createPortal(
            <Overlay onClick={this.handleBackdropClick}>
                <ModalEl>
                    <img src={src} alt={alt} />
                </ModalEl>
            </Overlay>,
            modalRoot
        )
    }
}