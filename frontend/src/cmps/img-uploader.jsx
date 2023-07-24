import { useState } from 'react'
import { uploadService } from '../services/upload.service'
import { uploadBgImg } from './icons';

export function ImgUploader({ onUploaded = null,story, user,}) {
 
  const [imgData, setImgData] = useState({
    imgUrl: null,
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
    <div className="img-uploader">
    <main className="img-file">
      {imgData.imgUrl && <img src={imgData.imgUrl} />}
      <section className='uploader-icon'>{uploadBgImg}</section>
          <p className="drag">Drag photos and videos here</p>
      <div className="uploader-btns">
        <label htmlFor="imgUpload" className="input-btn">
          <span>Select from computer</span>
        </label>
        <input className='img-input' type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
      </div>
    </main>
  </div>
  )
}
