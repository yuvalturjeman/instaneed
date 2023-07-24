import { Link, useNavigate } from 'react-router-dom'
import { CommentAdd } from './comment-add'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { removeStory, updateStory } from '../store/story.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { sendIcon, notificationsIcon, commentIcon, moreIcon, bookmarkIcon, dotsIcon } from './icons'
import { ImgUploader } from './img-uploader'



export function StoryPreview({ story, onRemoveStory, onUpdateStory }) {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  console.log('story', story);
  const navigate = useNavigate()
  const [showAllComments, setShowAllComments] = useState(false);

  const [newText, setNewText] = useState('');



  const [uploadedImage, setUploadedImage] = useState(story.imgUrls[0]);

  const [showModal, setShowModal] = useState(false);
  const [showEditor, setShowEditor] = useState(false)



  function closeEditor() {
    setShowEditor(false)
  }
  function openModal() {
    setShowModal(true);
  };

  function closeModal() {
    setShowModal(false);
  };

  function openEditor() {
    setShowEditor(true)
    closeModal()
  }

  const handleUpdateStory = () => {
    const updatedStory = { ...story, txt: newText, imgUrls: uploadedImage ? [uploadedImage, ...story.imgUrls] : story.imgUrls };
    onUpdateStory(updatedStory);
    closeModal();

  };

  async function onUpdateStory() {

    closeEditor()
    if (!newText) return


    const updatedStory = { ...story }
    if (uploadedImage) {
      updatedStory.imgUrls = [uploadedImage]
    }
    if (newText) {
      updatedStory.txt = [newText]
    }

    try {
      const savedStory = await updateStory(updatedStory)
      showSuccessMsg(`Story updated, new txt: ${savedStory.txt}`)
    } catch (err) {
      showErrorMsg('Cannot update story')
    }

  }

  async function onRemoveStory(storyId) {
    try {
      await removeStory(storyId)
      closeModal()
      showSuccessMsg('Story removed')
    } catch (err) {
      showErrorMsg('Cannot remove story')
    }
  }

  function onUploaded(imgUrl) {
    setUploadedImage(imgUrl);
  }




  const firstComment = story.comments[0];


  return (

    <div
      className="story-preview"
      key={story._id}

    >
      <div className="story-preview header">
        <div className="user-info">
          <img className="user-img" src={`${story.by.imgUrl}`} alt="" />
          <span className="user-name">{`${story.by.fullname}`}</span>
          <a className="dots" onClick={openModal}>{dotsIcon}</a>

        </div>
        <div  className="options">
          {showModal && (
            <ul  className="modal">
              <p className="option">Report</p>
              <p className="option">Unfollow</p>
              <p className="option">Add to favorites</p>
              <p className="option">Go to post</p>
              <p className="option">Share to</p>
              <p className="option">Copy link</p>
              <p className="option" onClick={openEditor}>Edit</p>
              <p className="option" onClick={() => onRemoveStory(story._id)}>Delete</p>
              <p className="option" onClick={closeModal}>Cancel</p>

            </ul>
          )}


          {showEditor && (
            <div className="modal editor">
              <div className="editor">
                <header>
                  <a onClick={closeEditor}>Cancel</a>
                  <span>Edit info</span>
                  <a onClick={() => { onUpdateStory(story._id) }}>Done</a>
                </header>
                <div className="editor-main">
                  <div className="img-editor">

                    <ImgUploader story={story} onUploaded={onUploaded} initialImgUrl={story.imgUrls} />
                  </div>


                  <div className="text-editor">

                    <label htmlFor="text">

                      <textarea
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        onSubmit={() => handleUpdateStory(story._id)}
                        placeholder="Write a caption"
                      />
                    </label>

                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="story-preview main">
        <div className="img-preview">
          <img src={story.imgUrls} alt="#" />
        </div>
        <div className="icons">
          <div className="icons-left">
            <span>{notificationsIcon}</span>
            <span>{commentIcon}</span>
            <span>{sendIcon}</span>
          </div>

          <div className="icons-right">
            <span>{bookmarkIcon}</span>
          </div>
        </div>

        <div className="likes">likes</div>



        <div className="story-preview comments">

          <h5>{`${story.by.username}`} <span>{`${story.txt}`}</span></h5>


          {firstComment && (
            <div className="story-preview comment" key={firstComment._id}>

              {firstComment.by.username} <span>{firstComment.txt}</span>
            </div>

          )}
          {story.comments.length > 1 && !showAllComments && (
            <span onClick={() => setShowAllComments(true)}>view all comments</span>
          )}
          {showAllComments &&
            story.comments.slice(1).map((comment) => (
              <div className="story-preview comment" key={comment._id}>

                {comment.by.username} <span>{comment.txt}</span>
              </div>
            ))}
        </div>

        <div className="comment-add">
          <CommentAdd story={story} />
        </div>
      </div>
      {/* <div className="actions">


      </div> */}
    </div>
  );
} 