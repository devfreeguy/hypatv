import React from 'react'
import nothingImage from '/images/nothing.png'

const EmptyState = () => {
  return (
    <div className='nothing-bg'>
      <img src={nothingImage} alt='Nothing' />
      <span className="nothing-text sub-text small-text">Nothing found</span>
    </div>
  )
}

export default EmptyState