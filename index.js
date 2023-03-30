// Import React and Next.js components
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";

// Import Axios and Bootstrap
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// Define the API URL
const API_URL = "https://stablehorde.net/api/";

// Define the main component
export default function Home() {
  // Define the state variables for the prompt and the images
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);

  // Define the handler function for the prompt input change
  const handlePromptChange = (event) => {
    // Set the prompt state to the input value
    setPrompt(event.target.value);
  };

  // Define the handler function for the button click
  const handleButtonClick = async () => {
    // Make a POST request to the API with the prompt as data
    try {
      const response = await axios.post(API_URL, { prompt: prompt });
      // Set the images state to the output array from the response
      setImages(response.data.output);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  // Return the JSX code for rendering the page
  return (
    <div className="container">
      <Head>
        <title>Web App</title>
        <meta name="description" content="A web app that uses an API to generate images" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="my-4">
        <h1 className="text-center">Web App</h1>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter a prompt"
                value={prompt}
                onChange={handlePromptChange}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleButtonClick}
              >
                Generate Images
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {images.map((image, index) => (
            <div key={index} className="col-md-4">
              <Image src={image} alt={`Image ${index + 1}`} width={300} height={300} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
