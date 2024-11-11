import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";

export default function ImageDisplay({ images }) {
  const ModalRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);

  const openModal = (item) => {
    setActiveItem(item);
    if (ModalRef.current) {
      ModalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (ModalRef.current) {
      ModalRef.current.close();
      setActiveItem(null);
    }
  };

  return (
    <>
      <ul className="grid grid-cols-5 gap-12">
        {images.map((image) => (
          <li key={image.id}>
            <div
              className="w-[15vw] min-h-[35vh] bg-white bg-opacity-80 rounded-lg pb-3"
              id="card-section"
              onClick={() => openModal(image)}
            >
              {/* Card Section */}
              <div className="w-full h-[50vh]" id="image-section">
                <img
                  src={image.largeImageURL}
                  alt=""
                  className="rounded-t-lg hover:scale-105 transition-all duration-200"
                />
              </div>
              <div className="flex flex-col items-start justify-start w-full min-h-[10vh]">
                <h1>
                  User:{" "}
                  <span className="font-bold truncate-multiline">
                    {image.user}
                  </span>
                </h1>
                <h1>
                  Likes: <span className="font-bold">{image.likes}</span>
                </h1>
                <h1>
                  Comments: <span className="font-bold">{image.comments}</span>
                </h1>
              </div>
            </div>
          </li>
        ))}

        {activeItem && (
          <Modal ref={ModalRef} closeModal={closeModal} image={activeItem} />
        )}
      </ul>
    </>
  );
}

const Modal = React.forwardRef(({ closeModal, image }, ref) => {
  return createPortal(
    <dialog
      ref={ref}
      className="w-[30vw] h-[85vh] bg-white bg-opacity-90 rounded-lg"
    >
      <div className="flex flex-col items-center justify-center">
        <img src={image.largeImageURL} alt="" className="rounded-lg" />
        <button
          className="mt-4 p-2 bg-red-500 text-white rounded-md"
          onClick={closeModal}
        >
          Close
        </button>
        <button className="mt-[5px] py-[10px] px-[8px] rounded-xl bg-green-500 hover:scale-105 transition-all duration-300 active:scale-95">
          <a href={image.previewURL}>Dowload image</a>
        </button>
      </div>
    </dialog>,
    document.body
  );
});
