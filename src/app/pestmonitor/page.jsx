"use client";
import { BlobServiceClient } from "@azure/storage-blob";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const page = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerName = "esp32cam";

  const connectionString =
    "BlobEndpoint=https://tpkiot.blob.core.windows.net/;QueueEndpoint=https://tpkiot.queue.core.windows.net/;FileEndpoint=https://tpkiot.file.core.windows.net/;TableEndpoint=https://tpkiot.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-12-04T08:18:07Z&st=2023-11-06T00:18:07Z&spr=https,http&sig=CMO6xjDFC%2BK3WNMvsJ01iONDnNNrkTU8yW5AMBvnOIA%3D";
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  useEffect(() => {
    const fetchImages = async () => {
      const blobs = [];
      for await (const blob of containerClient.listBlobsFlat()) {
        blobs.push(blob.name);
      }
      setImages(blobs);
    };
    fetchImages();
    setIsLoading(false);
  }, []);

  const deleteImage = async (imageName) => {
    const blobClient = containerClient.getBlockBlobClient(imageName);
    try {
      await blobClient.delete();
      // Update the state to remove the deleted image
      setImages((prevImages) => prevImages.filter((img) => img !== imageName));
    } catch (error) {
      console.error("Error deleting image:", error.message);
    }
  };

  const formatDate = (datetime) => {
    if (datetime[0] == "n") {
      datetime = datetime.slice(1);
    }
    const year = datetime.substring(0, 4);
    const month = datetime.substring(4, 6);
    const day = datetime.substring(6, 8);
    const hour = datetime.substring(8, 10);
    const minute = datetime.substring(10, 12);
    const second = datetime.substring(12, 14);
    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  };

  return (
    <div className="container-fluid">
      {/* Navbar */}
      <Navbar />
      {/* End Navbar */}
      <h2 className="text-center mt-3 mb-4">ESP32-CAM Images:</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {images.map((image, index) => (
            <div key={index} className="col-lg-3 col-md-3 mb-4">
              <div className="card">
                <img
                  src={`https://tpkiot.blob.core.windows.net/${containerName}/${image}`}
                  className="card-img-top py-3 px-3"
                  alt={image.altText}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    Date Time : {formatDate(image)}
                  </h5>
                  {image[0] === "n" ? (
                    <p className="card-text text-success">Tidak Terdapat Wereng Batang Coklat</p>
                  ) : (
                    <p className="card-text text-danger">Terdapat Wereng Batang Coklat</p>
                  )}

                  <div className="d-flex justify-content-center">
                    <a
                      href={`https://tpkiot.blob.core.windows.net/${containerName}/${image}`}
                      className="btn btn-success mx-3"
                    >
                      Save
                    </a>
                    <button
                      className="btn btn-danger mx-3"
                      onClick={() => deleteImage(image)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default page