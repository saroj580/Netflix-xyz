import React, { useState, useRef, useEffect } from 'react';

function MovieCard({ movie }) {
  const [hovered, setHovered] = useState(false);
  console.log('Hovered:', hovered, 'Movie:', movie['#TITLE'] || movie.title || movie.name);
  
  const cardRef = useRef(null);

  // Handle mouse enter/leave events
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // Handle card click
  const handleCardClick = () => {
    // Toggle hover state on click for both desktop and mobile
    setHovered(!hovered);
  };

  // Handle play button click
  const handlePlayClick = (e) => {
    e.stopPropagation(); // Prevent triggering card click
    console.log("Play movie:", movie['#TITLE'] || movie.title || movie.name);
    // Here you would add code to play the movie
    // For example, navigate to a player page or open a modal
    alert(`Playing: ${movie['#TITLE'] || movie.title || movie.name}`);
  };

  // Handle add to list button click
  const handleAddToListClick = (e) => {
    e.stopPropagation(); // Prevent triggering card click
    console.log("Add to list:", movie['#TITLE'] || movie.title || movie.name);
    alert(`Added to list: ${movie['#TITLE'] || movie.title || movie.name}`);
  };

  // Handle share button click
  const handleShareClick = (e) => {
    e.stopPropagation(); // Prevent triggering card click
    console.log("Share movie:", movie['#TITLE'] || movie.title || movie.name);
    alert(`Sharing: ${movie['#TITLE'] || movie.title || movie.name}`);
  };

  // Add event listeners for touch devices
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // For touch devices
    const handleTouchStart = () => {
      setHovered(true);
    };

    // Add event listeners
    card.addEventListener('touchstart', handleTouchStart);

    // Clean up
    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  // Handle click outside to close hover state on touch devices
  useEffect(() => {
    if (!hovered) return;

    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setHovered(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [hovered]);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-lg shadow-lg w-64 flex-shrink-0 flex flex-col items-center transition-all duration-300 cursor-pointer overflow-hidden border border-gray-700 bg-gradient-to-b from-[#232526] via-[#1c1c1c] to-[#181818] ${
        hovered ? 'z-40 scale-110 shadow-2xl border-red-700' : 'z-10'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{ minHeight: '300px', maxHeight: '400px' }}
    >
      {/* Gradient background behind poster */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-t from-[#181818] via-[#232526] to-transparent z-0" />
      {/* Base card content */}
      {movie['#IMG_POSTER'] && (
        <img 
          src={movie['#IMG_POSTER']} 
          alt={movie['#TITLE']} 
          className="mb-3 w-full h-48 object-cover rounded-t-lg relative z-10" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
      )}
      <h2 className="text-lg font-bold text-white mb-1 text-center relative z-10">
        {movie['#TITLE'] || movie.title || movie.name}
      </h2>
      
      {/* Hover overlay with additional information */}
      {hovered && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-100 flex flex-col justify-between rounded-lg p-4 transition-all duration-300 shadow-2xl z-50 overflow-y-auto">
          {/* Top: Poster and Info */}
          <div>
            <img 
              src={movie['#IMG_POSTER']} 
              alt={movie['#TITLE']} 
              className="mb-2 w-full h-40 object-cover rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
              }}
            />
            <h2 className="text-xl font-bold text-white mb-1">{movie['#TITLE'] || movie.title || movie.name}</h2>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-yellow-400 font-bold">{movie['#IMDB_RATING'] || 'N/A'}</span>
              <span className="text-gray-400 text-xs">IMDB</span>
              <span className="text-white text-xs ml-2">{movie['#RUNTIME'] || 'N/A'}</span>
              <span className="text-white text-xs ml-2">{movie['#YEAR'] || 'N/A'}</span>
            </div>
            <p className="text-gray-400 text-xs mb-2">{movie['#ACTORS'] || 'Cast information not available'}</p>
          </div>
          {/* Bottom: Actions */}
          <div>
            <div className="flex gap-2 mb-2">
              <button 
                className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition-colors"
                onClick={handlePlayClick}
              >▶</button>
              <button 
                className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
                onClick={handleAddToListClick}
              >+</button>
              <button 
                className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
                onClick={handleShareClick}
              >⤴</button>
            </div>
            {movie['#IMDB_URL'] && (
              <a 
                href={movie['#IMDB_URL']} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 underline text-xs text-center hover:text-blue-300 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                View on IMDB
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
