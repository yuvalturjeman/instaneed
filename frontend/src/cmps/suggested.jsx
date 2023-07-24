import { SuggestedPreview } from "./suggested-preview"
import { userService } from "../services/user.service";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/user.actions";

export function Suggested({ users }) {
    const loggedUser = useSelector(storeState => storeState.userModule.user)
    console.log('users from suggested', users);
    const navigate = useNavigate()
    
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

        <ul className="suggested">

            <section className="suggested-logged-user">
                {loggedUser &&
                
                        
                    <Link to={`/users/:user/:${loggedUser._id}`} >
                        <div className="logged-user-info">
                            {loggedUser.imgUrl && <span><img className="suggested-logged-img" src={loggedUser.imgUrl} /></span>}
                        <p className="suggested-logged-name">{loggedUser.fullname}</p>
                        </div>
                    </Link>
                
                
            }
            <a className="suggested-logged-switch" onClick={onLogout}>Switch</a>
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






