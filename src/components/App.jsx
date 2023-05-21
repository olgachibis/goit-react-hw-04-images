import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast'; 
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getSearch } from 'Api/getSearch'; 
import { Searchbar } from './Searchbar/Searchbar'; 
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const resp = await getSearch(search, page);
        const data = await resp.json();

        if (data.hits.length === 0) {
          setEmpty(true);
        }

        setImages((prevImages) => [...prevImages, ...data.hits]);
        setTotal(data.total);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (search !== '' || page !== 1) {
      fetchData();
    }}, [search, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = (largeImageURL, alt) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setAlt(alt);
  };

  const handleSubmit = (search) => {
    setSearch(search);
    setImages([]);
    setPage(1);
    setTotal(1);
    setLoading(false);
    setError(null);
    setEmpty(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          duration: 1500,
        }}
      />

      <Searchbar handleSubmit={handleSubmit} />

      {error && (
        <h2 style={{ textAlign: 'center' }}>Something went wrong: ({error})!</h2>
      )}

      <ImageGallery toggleModal={handleOpenModal} images={images} />

      {loading && <Loader />}

      {empty && (
        <h2 style={{ textAlign: 'center' }}>Sorry. There are no images ... 😭</h2>
      )}

      {total / 12 > page && <Button clickLoad={handleLoadMore} />}

      {showModal && (
        <Modal closeModal={handleCloseModal}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}
    </div>
  );
};



