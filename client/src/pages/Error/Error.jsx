import React from 'react'
import "./Error.scss";
import error from "../../assets/error.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Error = () => {
  return (
    <div className="Error-container">
      <div className="content">
        <div className="image">
          <img className="img-er" src={error} alt="alt" />
        </div>

        <div className="text">
          <h1>
            Sorry, this page could not be found!
          </h1>
          <p>
            The page you are looking for may have been removed, renamed, or temporarily unavailable.
          </p>
        </div>

        <div className="button">
          <button className="button-back" onClick={() => window.location.href = '/'}>
            <FontAwesomeIcon icon={faArrowLeft} className="icon-back" />
            Return to home page
          </button>
        </div>

      </div>
    </div>
  )
}

export default Error