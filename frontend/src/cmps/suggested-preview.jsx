import { useState } from 'react';

export function SuggestedPreview({ user }) {
    const [isFollowing, setIsFollowing] = useState(false);

    function handleFollowClick() {
        setIsFollowing(!isFollowing);
      };

    return (
    <section className="suggested-option" key={user._id}>
        <div className="suggested-user-info">
        <span><img className="suggested-user-img" src={`${user.imgUrl}`} alt="" /> </span>
        <p className="suggested-user-name">{user.fullname}</p>
        </div>
        <a onClick={handleFollowClick} className="suggested-profile-follow">{isFollowing ? 'Following' : 'Follow'}</a>
         
        
    </section>

)

}






