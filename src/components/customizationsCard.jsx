import "../App.css";

import React, { useState } from "react";

export default function customizationsCard({ customization }) {
  const [hidden, setHidden] = useState(true);

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
          </div>
        ) : (
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
                id:{customization.id}/   whatsapp:{customization.whatsapp}
              </span>
            </div>
            <img
              className="Card"
              data-testid={`customization__img-card-${customization.id}`}
              src={customization.cloudinary || customization.figurinha}
              alt={customization.whatsapp}
            />
          </div>
        )
      }
    </>
  );
}
