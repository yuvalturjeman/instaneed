import { SuggestedPreview } from "./suggested-preview"
import { userService } from "../services/user.service";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";

export function Suggested({ users }) {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    console.log('users from suggested', users);


    return (

        <ul className="suggested">

            <section className="suggested-logged-user">
                {loggedUser &&
                    <Link to={`/users/:user/:${loggedUser._id}`} >
                        
                            {loggedUser.imgUrl && <span><img className="suggested-logged-img" src={loggedUser.imgUrl} /></span>}
                        
                        <p className="suggested-logged-name">{loggedUser.fullname}</p>
                        
                        
                    </Link>

                }
            </section>
            <span className="suggested-header">Suggested for you:</span>

            {users.map(user =>
                <SuggestedPreview
                    key={user._id}
                    user={user}
                />
            )}
            <div className="insta-about">
                <p>About . Help . Press . API . Jobs . Privacy . Terms .</p>
                <p className="more">Locations . Language . Meta Verified</p>
            </div>
            <div className="insta-footer">
                <p>© 2023 INSTANEED FROM U.V.T</p>
            </div>
        </ul>



    )
}






