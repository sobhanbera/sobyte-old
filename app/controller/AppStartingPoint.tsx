import React, {useEffect, useState} from 'react'

import {createStackNavigator} from '@react-navigation/stack'

import AuthenticationNavigation from './Authentication'
import AppNavigation from './AppInside'

import {FullScreenLoading} from '../components'

const AppStartingPoint = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        <>
            {!userLoggedIn ? <AuthenticationNavigation /> : <AppNavigation />}

            <FullScreenLoading visible={loading} />
        </>
    )
}

export default AppStartingPoint
