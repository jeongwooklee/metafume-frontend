import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useSWR from 'swr';

import api from '../utils/api';

import Logo from './Logo';
import SearchBar from './SearchBar';
import VerticalProductList from './VerticalProductList';
import HorizontalProductList from './HorizontalProductList';
import Loading from './Loading';
import ErrorBox from './ErrorBox';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  width: 500px;
  height: 20vh;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchWrapper = styled.div`
  width: 500px;
  height: 100px;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 42px;
`;

const ResultWrapper = styled.div`
  height: 600px;
  height: 70vh;
  overflow: auto;
`;

const RecentViewWrapper = styled.div`
  position: relative;
  left: 0;
  bottom: 0;
  width: 100vw;

  h3 {
    font-size: 21px;
    margin-left: 36px;
    margin-bottom: 24px;
    width: 400px;
  }
`;

const SearchListWrapper = styled.div`
  position: relative;
  width: 100vw;
`;

const Main = ({ searchList, onSearch, onResetSearch, loading, error }) => {
  const { data: recentViewList } = useSWR('/products/recent', api.getRecentViewList);

  useEffect(() => {
    return () => onResetSearch();
  }, []);

  return (
    <Container>
      <LogoWrapper>
        <Logo size={42}/>
      </LogoWrapper>
      <SearchWrapper>
        <SearchBar onSearch={onSearch} onResetSearch={onResetSearch}/>
      </SearchWrapper>
      <ResultWrapper>
        {loading && <Loading />}
        {error && <ErrorBox message={error}/>}
        {
          searchList ?
          <SearchListWrapper>
            <VerticalProductList list={searchList}/>
          </SearchListWrapper>
          :
          <RecentViewWrapper>
            {!loading && recentViewList &&
              <>
                <h3>Latest views</h3>
                <HorizontalProductList list={recentViewList}/>
              </>
            }
          </RecentViewWrapper>
        }
      </ResultWrapper>
    </Container>
  );
};

Main.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onResetSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  searchList: PropTypes.arrayOf(PropTypes.shape({
    brand: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
  }).isRequired),
  error: PropTypes.string,
};

export default Main;