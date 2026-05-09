import React, { useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ProductImage = ({images}) => {
  const [mainImage,setMainImage] = useState(images[0].url)
  return (
    <div className='flex gap-5 w-max'>
      <div className='flex flex-col gap-5'>
        {
          images.map((img, index)=> {
          return  <img key={index} onClick={() => setMainImage(img.url)} src={img.url} className='cursor-pointer w-20 h-20' />
          })
        }
      </div> 
      <Zoom><img src={mainImage} className='w-[500px] border shadow-lg' /></Zoom>
    </div>
  )
}

export default ProductImage
