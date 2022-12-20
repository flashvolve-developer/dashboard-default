import "../App.css";
import { FiDownload } from 'react-icons/fi'
import React, { useState, useContext } from "react";
import AppContext from '../context/AppContext';

export default function customizationsCard({ customization }) {
  const [hidden, setHidden] = useState(true);
  const { selectedCards, setSelectedCards } = useContext(AppContext);

  const download = (e, url) => {
    e.preventDefault();

    fetch(url, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function (buffer) {
          const Url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = Url;
          link.setAttribute("download", "image.png");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {
        customization.cloudinary.slice(customization.cloudinary.length - 3)
          === "mp4" ? (
          <div>
            <div className="DataVisible">
              <button
                onClick={() => setHidden(!hidden)}
              >
                {
                  hidden ?
                    <span className="material-symbols-outlined">
                      visibility_off
                    </span> :
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                }
              </button>
              <span hidden={hidden}>
                id: {customization.id}/  whatsapp: {customization.whatsapp}
              </span>
            </div>
            <video alt={customization.whatsapp} className="Card" controls>
              <source src={customization.cloudinary} type="video/mp4">
              </source>
            </video>
            <div className="button-download-box">
              <div className="btn-download">
                <label htmlFor={customization.id}>
                  <input
                    type="checkbox"
                    id={customization.id}
                    onChange={() => setSelectedCards(selectedCards.push(customization.id))}
                  />
                  selecionar
                </label>
              </div>
              <div className="btn-download">
                {/* <button id="btn-image-download">-V-</button> */}
                <label htmlFor="btn-image-download">
                  <button
                    id="url-btn"
                    download
                    onClick={(e) => download(e, customization.cloudinary)}
                  >
                    download
                  </button>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="DataVisible">
              <button className='button'
                onClick={() => setHidden(!hidden)}
              >
                {
                  hidden ?
                    <span className="material-symbols-outlined">
                      visibility_off
                    </span> :
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                }
              </button>
              <span hidden={hidden}>
                id:{customization.id}/   whatsapp:{customization.whatsapp}
              </span>
            </div>
            <img
              className="Card"
              data-testid={`customization__img-card-${customization.id}`}
              src={customization.cloudinary}
              alt={customization.whatsapp}
            />
            <div className="button-download-box">
              <div className="btn-download">
                <label htmlFor={customization.id}>
                  <input
                    type="checkbox"
                    id={customization.id}
                    onChange={() => setSelectedCards(selectedCards.push(customization.id))}
                  />
                  selecionar
                </label>
              </div>
              <div className="btn-download">
                <label htmlFor="btn-image-download">
                  <div className="button"
                    id="url-btn"
                    download
                    onClick={(e) => download(e, customization.cloudinary)}
                  >
                    <FiDownload/>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}
