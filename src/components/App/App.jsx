import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from "components/Searchbar";
import { ImageGallery } from "components/ImageGallery";
import { LoaderSpinner } from "components/Loader";
import { LoadMoreButton } from "components/Button";
import { Modal } from "components/Modal";

import { fetchImages } from "service/ApiService";

import { Container } from "./App.styled";

export class App extends Component {
  state = {
    imageName: '',
    images: [],
    page: 1,
    isLoading: false,
    selectedImage: '',
    selectedImageName: '',
  }

  componentDidUpdate(prevProps, prevState) {
    const prevImageName = prevState.imageName;
    const prevPage = prevState.page;
    const { imageName, page } = this.state;

    if (prevImageName !== imageName || prevPage !== page) {
      this.fetchSearchingImages();
    }
  }

  fetchSearchingImages = () => {
    const { imageName, page } = this.state;

    if (imageName !== undefined) {
      this.setState({ isLoading: true });

      fetchImages(imageName, page)
        .then(data => {
          if (data.hits.length === 0) {
            toast.error('Ooops, no images found.');
            return;
          }
          this.setState(prevState =>
            ({ images: [...prevState.images, ...data.hits] })
          )
        })
        .catch(error => console.log(error.message))
        .finally(() => {
          this.setState({ isLoading: false });
          this.handleScroll();
        });
    }
  }

  handleFormSubmit = imageName => {
    this.setState({ imageName, images: [], page: 1 });
  }

  handleScroll = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  handleLoadMoreBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  handleSelectedImage = (imageUrl, alt) => {
    this.setState({ selectedImage: imageUrl, selectedImageName: alt });
  }

  handleCloseModal = () => {
    this.setState({ selectedImage: '', selectedImageName: '' });
  }

  render() {
    const { images, isLoading, selectedImage, selectedImageName } = this.state;
    const showBtn = images.length > 0;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading &&
          <LoaderSpinner />
        }
        <ImageGallery images={images} onSelect={this.handleSelectedImage} />
        {selectedImage &&
          <Modal src={selectedImage} alt={selectedImageName} onClose={this.handleCloseModal} />
        }
        {showBtn &&
          <LoadMoreButton title="Load more" onClick={this.handleLoadMoreBtnClick} />
        }

        <ToastContainer autoClose={3000} />
      </Container>
    )
  }
}