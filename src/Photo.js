import React, { useState, useEffect } from "react";
function Photo({
  data: {
    urls: { regular: src },
  },
}) {
  return <img src={src} className="photo" />;
}
export default Photo;
