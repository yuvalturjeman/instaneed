import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

// import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { LoginSignup } from './cmps/login-signup'
import { StoryIndex } from './pages/story-index'
import { StoryDetails } from './pages/story-details'



export function RootCmp() {

    return (
        <div className='main-app main-layout'>
             
           
               {/* <AppHeader />      */}
            <main>
                <Routes>
                    {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}
                    <Route path="/" element={<LoginSignup />} />
                    

                    <Route path="/stories" element={<StoryIndex />} />
                    <Route path="/users/:user/:_id" element={<UserDetails />} />
                    <Route path="/stories/:story/:_id" element={<StoryDetails />} />
                   
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div>
    )
}


