import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { useEffect, useRef, useState } from 'react'
import { storyService } from '../services/story.service.local.js'
import { CarouselComponent } from './img-preview-carousel'
import routes from '../routes'
// import { CarouselComponent } from "./img-preview-carousel"
// {/* <div>
//  <CarouselComponent stories={stories} />   
//          </div> */}
export function AppHeader() {
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const users = useSelector(storeState => storeState.userModule.users)
    const user = useSelector(storeState => storeState.userModule.user)
    console.log('appheader', user);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const modalRef = useRef(null)

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function onToggleUserModal() {
        console.log(isModalOpen)
        setIsModalOpen(!isModalOpen)
        if (!isModalOpen) setIsModalOpen(!isModalOpen)
    }
    function onSetFilter() {
        console.log('hi')
    }
    return (
        <header className="app-header">
            <nav>


                {user &&
                    <span className="user-info">
                        <Link to={`/users/:user/:${user._id}`} >
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                    </span>
                }

            </nav>
        </header>

    )
}




