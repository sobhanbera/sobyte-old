import React, {useEffect, useState} from 'react'

import Player, {usePlayer} from '../context'
import MusicApi from '../api'

import AuthenticationNavigation from './Authentication'
import AppNavigation from './AppInside'

import {FullScreenLoading} from '../components'

const AppStartingPoint = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(true) // initial value must be false... true only for development purpose
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        <>
            {!userLoggedIn ? (
                <AuthenticationNavigation />
            ) : (
                <Player>
                    <MusicApi>
                        <AppNavigation />
                    </MusicApi>
                </Player>
            )}

            <FullScreenLoading visible={loading} />
        </>
    )
}

export default AppStartingPoint
