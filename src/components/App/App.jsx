import { useState, useEffect } from "react";
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

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedImageName, setSelectedImageName] = useState('');

  useEffect(() => {
    if (!imageName) {
      return;
    }
    setIsLoading(true);

    fetchImages(imageName, page)
      .then(data => {
        if (data.hits.length === 0) {
          toast.error('Ooops, no images found.');
          return;
        }
        setImages(prevState => [...prevState, ...data.hits])
      })
      .catch(error => console.log(error.message))
      .finally(() => {
        setIsLoading(false);
        handleScroll();
      });
  }, [imageName, page])

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setImages([]);
    setPage(1);
  }

  const handleScroll = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  const handleLoadMoreBtnClick = () => {
    setPage(prevState => prevState + 1)
  }

  const handleSelectedImage = (imageUrl, alt) => {
    setSelectedImage(imageUrl);
    setSelectedImageName(alt);
  }

  const handleCloseModal = () => {
    setSelectedImage('');
    setSelectedImageName('');
  }

  const showBtn = images.length > 0;

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading &&
        <LoaderSpinner />
      }
      <ImageGallery images={images} onSelect={handleSelectedImage} />
      {selectedImage &&
        <Modal src={selectedImage} alt={selectedImageName} onClose={handleCloseModal} />
      }
      {showBtn &&
        <LoadMoreButton title="Load more" onClick={handleLoadMoreBtnClick} />
      }
      <ToastContainer autoClose={3000} />
    </Container>
  )
}