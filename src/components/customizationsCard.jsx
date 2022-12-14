import "../App.css";

import React from "react";

export default function customizationsCard({ customization }) {
  return (
    <div>
      {
        customization.cloudinary.slice(customization.cloudinary.length - 3)
          === "mp4" ? (
          <video alt={customization.whatsapp} className="Card" controls>
            <source src={customization.cloudinary} type="video/mp4">
            </source>
          </video>
        ) : (
          <img
            className="Card"
            data-testid={`customization__img-card-${customization.id}`}
            src={customization.cloudinary || customization.figurinha}
            alt={customization.whatsapp}
          />
        )
      }
    </div>
  );
}
