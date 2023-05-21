import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ handleSubmit }) => {
  const [search, setSearch] = useState('');

  const onChangeInput = (e) => {
    const { value } = e.currentTarget;
    setSearch(value);
  };

  const resetForm = () => {
    setSearch('');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!search) {
      return toast.error('Enter text for search.');
    }

    handleSubmit(search);
    resetForm();
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={onSubmit} className={css.Form}>
        <button type="submit" className={css.Button}>
          <BiSearch size="20" />
        </button>

        <input
          value={search}
          onChange={onChangeInput}
          className={css.Input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
};