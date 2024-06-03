import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import "./AddButton.scss"
import { useNavigate, useParams } from 'react-router-dom'

const AddButton = () => {
  const {tenantURL}=useParams()
  const navigate=useNavigate()

  return (
    <button className="AddButton-container" onClick={()=>{
      navigate(`/${tenantURL}/customer/address-addnew`)
    }}>
      <FontAwesomeIcon icon={faPlus} color="white" size="lg" className='icon' />
      <div>{"Add new address"}</div>
    </button>
  )
}

export default AddButton