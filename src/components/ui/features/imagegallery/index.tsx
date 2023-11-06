import React, { useState, useEffect } from "react";
import { Styled } from "./imagegallery.styled";
import { Data } from "../../../utils/data";
import { Image } from "antd";
import FileUploadIcon from "@mui/icons-material/FileUpload";

interface ImageData {
  src: string;
  name: string;
}

const Imagegallery = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  const handleImageSelect = (index: number) => {
    const updatedSelection = [...selectedImages];
    if (updatedSelection.includes(index)) {
      updatedSelection.splice(updatedSelection.indexOf(index), 1);
    } else {
      updatedSelection.push(index);
    }
    setSelectedImages(updatedSelection);
  };

  const handleDeleteImages = () => {
    const updatedData = images.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setImages(updatedData);
    setSelectedImages([]);
  };

  useEffect(() => {
    if (Data) {
      setImages(Data);
    }
  }, []);

  if (!Data) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: ImageData[] = Array.from(files).map((file, index) => ({
        src: URL.createObjectURL(file),
        name: file.name,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const newImages: ImageData[] = Array.from(files).map((file, index) => ({
        src: URL.createObjectURL(file),
        name: file.name,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  if (!Data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Styled.Title>Image Gallery</Styled.Title>
      <div className="flex justify-between px-5 py-4">
        <div>Selected Files: {selectedImages.length}</div>
        <button
          title="Delete files"
          type="button"
          className="text-red-500 py-4 px-5 rounded-lg border border-gray-600 hover:bg-red-700 hover:text-white"
          onClick={handleDeleteImages}
        >
          Delete Files
        </button>
      </div>
      <div className="p-3 md:p-5 lg:p-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
          {images.map((item: ImageData, index: number) => (
            <div key={index}>
              <label>
                <Image
                  src={item.src}
                  alt={item.name}
                  width={200}
                  height={200}
                />
                <input
                  title="checkbox"
                  type="checkbox"
                  checked={selectedImages.includes(index)}
                  onChange={() => handleImageSelect(index)}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="dropzone"
                />
              </label>
            </div>
          ))}

          <input
            title="image upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            id="file-input"
            className="hidden"
          />
          <label
            htmlFor="file-input"
            className="p-4 flex justify-center items-center cursor-pointer rounded-lg border border-gray-600 hover:bg-gray-400 hover:text-white"
          >
            <FileUploadIcon className="text-5xl" />
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="dropzone"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Imagegallery;
