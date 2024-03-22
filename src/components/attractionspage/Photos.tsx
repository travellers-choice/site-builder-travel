import React, { useState, useRef, useEffect, MouseEvent } from "react";

interface Data{
  images:[]
}

export default function Photos({data}:{data:Data}) {
  const imageArray: string[] = [
    "https://sandbox.bookingcore.co/uploads/demo/tour/gallery-1.jpg",
    "https://sandbox.bookingcore.co/uploads/demo/tour/gallery-2.jpg",
    "https://sandbox.bookingcore.co/uploads/demo/tour/gallery-3.jpg",
    "https://sandbox.bookingcore.co/uploads/demo/tour/gallery-4.jpg",
    "https://sandbox.bookingcore.co/uploads/demo/tour/gallery-5.jpg",
    "https://sandbox.bookingcore.co/uploads/demo/tour/gallery-6.jpg",
    "https://sandbox.bookingcore.co/uploads/demo/tour/gallery-7.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState<string>(
    imageArray[0] // Select the first image by default
  );
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  const useDragScroll = () => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [startY, setStartY] = useState<number>(0);

    const handleMouseDown = (event: MouseEvent<HTMLElement>) => {
      setIsDragging(true);
      setStartY(event.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
      if (!isDragging) return;

      const deltaY = event.clientY - startY;
      const container = thumbnailsContainerRef.current;
      if (!container) return;

      const scrollTopMax = container.scrollHeight - container.clientHeight;
      const newScrollTop = Math.min(
        Math.max(container.scrollTop + deltaY, 0),
        scrollTopMax
      );

      container.scrollTop = newScrollTop;
    };

    useEffect(() => {
      const handleWindowMouseUp = () => setIsDragging(false);
      window.addEventListener("mouseup", handleWindowMouseUp);

      return () => window.removeEventListener("mouseup", handleWindowMouseUp);
    }, []);

    return { isDragging, handleMouseDown, handleMouseUp, handleMouseMove };
  };

  const { isDragging, handleMouseDown, handleMouseUp, handleMouseMove } =
    useDragScroll();

  return (
    <div className="container mt-6 flex h-[300px] box-border">
      <div className="w-5/6 h-full">
        <img
          className="w-[100%] h-full object-cover"
          src={selectedImage}
          alt="image"
        />
      </div>

      <div
        className="flex flex-col overflow-hidden h-full w-1/6  "
        ref={thumbnailsContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {imageArray.map((image: string, key: number) => (
          <img
            key={key}
            src={image}
            alt="Thumbnail"
            onClick={() => handleThumbnailClick(image)}
            className="h-full w-[100%] object-cover cursor-pointer m-1 md:shrink-0"
            style={{ width: "160px", height: "90px" }}
          />
        ))}
      </div>
    </div>
  );
}
