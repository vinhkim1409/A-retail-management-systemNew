import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "./AddButton.scss"

const AddButton = () => {
  return (
    <button className="AddButton-container">
      <FontAwesomeIcon icon={faPlus} color="white" size="lg" />
      <div>Thêm địa chỉ</div>
    </button>
  )
}

export default AddButton