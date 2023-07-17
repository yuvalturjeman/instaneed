import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from "react"
import { ImgUploader } from '../cmps/img-uploader'
import { searchIcon, exploreIcon, homeIcon, reelsIcon, messagesIcon, notificationsIcon, createIcon, instaIcon } from './icons'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { storyService } from '../services/story.service.local';
import { addStory } from '../store/story.actions';
import { logout } from '../store/user.actions.js'
import { useSelector } from 'react-redux'

export function SideBar({ users }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const [showModal, setShowModal] = useState(false);
    const [showEditor, setShowEditor] = useState(false)
    const [text, setText] = useState('');
    const [uploadedImage, setUploadedImage] = useState([]);
    const navigate = useNavigate()


    function closeEditor() {
        setShowEditor(false)
    }
    function openModal() {
        setShowModal(true);
        openEditor(true)

    };

    function closeModal() {
        setShowModal(false);
    };

    function openEditor() {
        setShowEditor(true)
        closeModal()
    }


    // function onLogout() {
       
    // }

    async function handleAddStory() {

        const story = storyService.getEmptyStory()
        story.txt = text
        if (!story.txt) return
        story.imgUrls = [...uploadedImage]



        closeEditor()

        try {
            const savedStory = await addStory(story)
            showSuccessMsg(`Story added (id: ${savedStory._id})`)
        } catch (err) {
            showErrorMsg('Cannot add story')
        }
    }


    function onUploaded(imgUrl) {
        setUploadedImage([...uploadedImage, imgUrl]);
    }


    async function onLogout() {
        try {
            await logout()
            navigate('/')
            console.log('USER FROM LOGOUT')

        } catch (err) {
            console.log(err)
        }
    }
    



    return (

        <div className="main-side-bar ">

            <div className="side-bar-logo">

                <NavLink to="/stories"><h1 className="desc-logo" >InstaNeed</h1><span className="inst-logo">{instaIcon}</span></NavLink>
            </div>

            <div className="side-bar-icons">
                <div className="section">
                    <div className="side-bar-icon">
                        <NavLink to="/stories"><span>{homeIcon}</span>
                            <span className="desc">Home</span>
                        </NavLink>
                    </div>
                </div>


                <div className="section">
                    <div className="side-bar-icon">
                        <span>{searchIcon}</span>
                        <span className="desc">Search</span>
                    </div>
                </div>

                <div className="section">
                    <div className="side-bar-icon">
                        <span>{exploreIcon}</span>
                        <span className="desc">Explore</span>
                    </div>
                </div>

                <div className="section">
                    <div className="side-bar-icon">
                        <span>{reelsIcon}</span>
                        <span className="desc">Reels</span>
                    </div>
                </div>

                <div className="section">
                    <div className="side-bar-icon">
                        <NavLink to="chat"><span>{messagesIcon}</span>
                            <span className="desc">Messages</span></NavLink>
                    </div>
                </div>

                <div className="section">
                    <div className="side-bar-icon">
                        <span>{notificationsIcon}</span>
                        <span className="desc">Notifications</span>
                    </div>
                </div>

                <div className="section">
                    <div className="side-bar-icon">

                        <span>{createIcon}</span>
                        <span onClick={openModal} className="desc">Create</span>
                    </div>
                </div>


                <div className="create-story">
                    {showModal && (
                        <ul className="modal">
                            <p onClick={closeModal}>cancel</p>
                        </ul>
                    )}
                    {showEditor && (
                        <div className="modal editor">
                            <div className="editor">
                                <header>
                                    <a onClick={closeEditor}>Cancel</a>
                                    <span>Edit info</span>
                                    <a onClick={handleAddStory} >Done</a>
                                </header>
                                <div className="editor-main">
                                    <div className="img-editor">

                                        <ImgUploader onUploaded={onUploaded} initialImgUrl='' />
                                    </div>

                                    <div className="text-editor">

                                        <label htmlFor="text">

                                            <textarea
                                                type="text"
                                                value={text}
                                                onChange={(e) => setText(e.target.value)}
                                                onSubmit={handleAddStory}
                                                placeholder="Write a caption"
                                            />
                                        </label>

                                    </div>


                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* <div className="section">
                    <div className="side-bar-icon">

                        <NavLink to={"/user/:_id"}>
                            {user.username}
                            <img src={user.imgUrl} alt="" />
                            </NavLink>
                        
                    </div>
                </div> */}


                <div className="section" >
                    <div className="side-bar-icon" >
                        <a onClick={onLogout} >Logout</a>
                    </div>
                </div>


            </div>
        </div>



    )
}


