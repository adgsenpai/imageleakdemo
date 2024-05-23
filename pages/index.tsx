import Image from 'next/image';
import React from 'react';

const HomePage = () => {
  const imageUrls = Array.from({ length: 10 }, (_, index) => 
    `https://cdnanimeflix.adgstudios.co.za/static/AnimeflixGirls/${index + 1}-min.png`
  );

  return (
    <div>
      <h1>Animeflix Girls</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {imageUrls.map((url, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <Image
              src={url}
              alt={`Animeflix Girl ${index + 1}`}
              width={500}
              height={500}
              className='rounded'              
              unoptimized={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
