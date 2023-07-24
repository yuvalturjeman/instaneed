import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { loadUsers } from '../store/user.actions'
import { loadStories } from '../store/story.actions'
import { userService } from '../services/user.service'
import { ImgUploader } from '../cmps/img-uploader'
import { SideBar } from '../cmps/side-bar'
import { postsIcon,savedPostsIcon, settingsIcon, taggedIcon, userPlusIcon } from '../cmps/icons'

export function UserDetails() {
    const user = useSelector(storeState => storeState.userModule.user)
    const users = useSelector(storeState => storeState.userModule.users)
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const [uploadedImage, setUploadedImage] = useState("");
    const navigate = useNavigate()
    console.log('user from userdetails', user);
    useEffect(() => {
        loadStories()
        loadUsers()
    }, [])


   

    function onBack() {
        navigate('/stories')
    }

    async function onUpdateUser() {

        
        
        user.imgUrl = [...uploadedImage]
        navigate('/stories')
        
       

    }

    const handleUpdateUser = () => {
        const updatedUser = { ...user, imgUrl: uploadedImage ? [uploadedImage, ...user.imgUrl] : user.imgUrl };
        onUpdateUser(updatedUser);
        
    
      };

    function onUploaded(imgUrl) {
        setUploadedImage([...uploadedImage, imgUrl]);
    }

    
      
    return (
        <div className="profile-container">
            <div className="side-bar">
            <SideBar 
            stories={stories}
            users={users}
            />
            </div>
            <div className="profile-container-page">

            <head className='user-details'>
                {user.imgUrl && (
                    <section className="profile-photo">
                        <img src={user.imgUrl} />
                    </section>
                )}
                
                <section className="profile-info">
                    <div className="profile-info-header">
                        <p>{user.username}</p>
                        <div>
                        <button onClick={onUpdateUser} className="profile-edit-btn">Edit profile</button>
                
                        </div>
                        <div>
                        <button className="profile-view-btn">View Archive </button>
                        </div>
                        <div>
                        <span className="settings-icon">{settingsIcon} </span>
                        </div>
                    </div>
                    <div className="user-information">
                        <p>Posts</p>
                        <p>Followers</p>
                        <p>Following</p>
                    </div>
                    
                    <div className="user-name">
                        <p>{user.fullname}</p>
                        </div>
                </section>
                
            </head>
            <div className="profile-head">
                
                <p>{postsIcon}<span> POSTS</span></p>
                
                
                <p>{savedPostsIcon}<span> SAVED</span></p>
                <p>{taggedIcon}<span> TAGGED</span></p>
            </div>
            </div>

            <div className="profile-stories">

            </div>


               
        </div>
    )
}

