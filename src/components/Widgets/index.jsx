import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Widget, Header, DivIcon, DivContent, TrendingContainer, TrendingItem, Premium } from "./styled";
import { Button } from 'style-components';

export const Widgets = () => {

  const [trendingTopics] = useState([
    
    { category: 'Trending in Colombia', topic: 'Milton', posts: '1.05M posts' },
    { category: 'Politics · Trending', topic: 'Chilpancingo', posts: '269K posts' },
    { category: 'Trending in Colombia', topic: 'Tengo 19', posts: '1,509 posts' },
    { category: 'Trending in Colombia', topic: '#NosEstanMatando', posts: '2,107 posts' },
    { category: 'Music · Trending', topic: 'Jennie', posts: '210K posts' }
  ]);

  return (
    <Widget>
      <Header>
        <DivIcon>
          <SearchIcon className="searchIcon"></SearchIcon>
          <input placeholder='Buscar en X'></input>
        </DivIcon>
        
      </Header>
      
      <Premium>
        <h2>Subscribe to Premium</h2>
        <p>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
        <br></br>
        <Button>
        Subscribe
        </Button>
      </Premium>

      <DivContent>
        <h2>What's happening</h2>

        {/* Sección de tendencias */}
        <TrendingContainer>
          {trendingTopics.map((trend, index) => (
            <TrendingItem key={index}>
              <strong>{trend.category}</strong>
              <p>{trend.topic}</p>
              <span>{trend.posts}</span>
            </TrendingItem>
          ))}
        </TrendingContainer>

        {/* Componentes de Twitter */}
      </DivContent>
    </Widget>
  );
};
