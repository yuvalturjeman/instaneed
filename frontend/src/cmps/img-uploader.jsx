import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null, initialImgUrl ,story, user}) {
 
  const [imgData, setImgData] = useState({
    imgUrl: initialImgUrl,
    // height: 500,
    // width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState([]);
  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url} = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url})
    setIsUploading(false)
    setUploadedImage([...uploadedImage, secure_url]);
    onUploaded && onUploaded(secure_url)
    
  }

  function getUploadLabel() {
    if (imgData.imgUrl) return 
    return isUploading ? 'Uploading....' : 'Upload Image'
  }

  return (
    <div className="upload-preview">
      {imgData.imgUrl && <img  src={imgData.imgUrl} alt=''  />}
      <input className="download" type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
    </div>
  )
}
