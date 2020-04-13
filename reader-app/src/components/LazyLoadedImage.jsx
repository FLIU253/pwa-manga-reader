import React, {useRef, useEffect, useState} from 'react';

const LazyLoadedImage =({placeholderHeight, rootRef, ...props}) => {

    const [showImage, setShowImage] = useState(false);
    const placeholderRef = useRef();

    useEffect(() => {
        if(!showImage && placeholderRef.current){

            const options = {
                root: rootRef?.current ?? null,
                rootMargin: '150px 0px',
                threshold: 0.01
            }

            const observer = new IntersectionObserver((entries) => {
                entries[0].isIntersecting && setShowImage(true);                
            }, options);

            observer.observe(placeholderRef.current); 

            return () => observer.disconnect();

        }
    }, [showImage])

    if(!showImage) return <div ref = {placeholderRef} style = {{height: `${placeholderHeight}px`}}/>;

    return <img {...props} />
};

export default LazyLoadedImage;
