import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { loadUsers } from '../store/user.actions'
import { loadStories } from '../store/story.actions'
import { userService } from '../services/user.service'
import { ImgUploader } from '../cmps/img-uploader'

export function UserDetails() {
    const user = useSelector(storeState => storeState.userModule.user)
    const users = useSelector(storeState => storeState.userModule.users)
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const [uploadedImage, setUploadedImage] = useState('');
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



    }

    function onUploaded(imgUrl) {
        setUploadedImage([...uploadedImage, imgUrl]);
    }

    const handleUpdateUser = () => {
        const updatedUser = { ...user, imgUrl: uploadedImage ? [uploadedImage, ...user.imgUrl] : user.imgUrl };
        onUpdateUser(updatedUser);
        
    
      };
    

    return (
        <div className="profile-container">
            <section className='user-details'>
                {user.imgUrl && (
                    <section className="profile-photo">
                        <img src={user.imgUrl} />
                        <ImgUploader user={user} onUploaded={onUploaded} initialImgUrl='' />
                    </section>
                )}
                <button onClick={onUpdateUser}>do</button>
                <section className="profile-info">
                    <div className="profile-info-header">
                        <a>{user.username}</a>
                        <div>
                        <button className="profile-edit-btn">Edit profile</button>
                        </div>
                    </div>
                    
                    <div className="user-name">{user.fullname}</div>
                </section>
                <button onClick={onBack}>return</button>
            </section>
        </div>
    )
}

