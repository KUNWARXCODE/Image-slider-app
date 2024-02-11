import React, { useState, useEffect } from 'react';
import './style.css';

function ImageSlider({ url, page, limit }) {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${url}?page=${page}&limit=${limit}`);
                const data = await response.json();
                setImages(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching images:', error);
                setLoading(false);
            }
        };

        fetchImages();
    }, [url]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="image-slider">
            <button className="arrow left-arrow" onClick={prevSlide}>&#10094;</button>
            <div className="image-container">
                {loading ? <div>Loading...</div> : (
                    <img src={images.length > 0 && images[currentIndex].download_url} alt={`Slide ${currentIndex}`} />
                )}
            </div>
            <button className="arrow right-arrow" onClick={nextSlide}>&#10095;</button>
        </div>
    );
}

export default ImageSlider;
