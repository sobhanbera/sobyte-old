import React, {createContext, useContext, useState} from 'react'
import {StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'

import AppStartingPoint from './controller/AppStartingPoint'
import ThemeProvider from './themes/ThemeProvider'
import {Loader, SobyteAlert} from './components'
import {SobyteAlertProps} from './components/SobyteAlert'

const AppContext = createContext({
    showLoading: null,
    setShowLoading: (value: boolean) => null,
    toggleLoader: () => null,

    setAlertVisibility: (visible: boolean) => null,
    setAlertTitle: (title: string) => null,
    setAlertDescription: (description: string) => null,
    setAlertCofirmText: (confirmText: string) => null,
    setAlertCancelText: (confirmText: string) => null,

    Alert: (
        onConfirm: Function,
        title: string = 'Alert Title',
        description: string = 'Alert Description',
        confirmText: string = 'OK',
        cancelText: string = 'CANCEL',
    ) => ({
        dismiss: () => {},
        show: () => {},
    }),
})
const MainApp = () => {
    const [showLoading, setShowLoading] = useState(false)

    const [alertVisibility, setAlertVisibility] = useState(false)
    const [alertTitle, setAlertTitle] = useState('')
    const [alertDescription, setAlertDescription] = useState('')
    const [alertConfirmText, setAlertCofirmText] = useState('')
    const [alertCancelText, setAlertCancelText] = useState('')
    const [alertOnConfirm, setAlertOnConfirm] = useState<Function>(() => {})

    const toggleLoader = () => setShowLoading(show => !show)

    function Alert(
        onConfirm: Function,
        title: string = 'Alert Box Title',
        description: string = 'Alert Box Description',
        confirmText: string = 'OK',
        cancelText: string = 'CANCEL',
    ) {
        return {
            show: () => {
                setAlertTitle(title)
                setAlertDescription(description)
                setAlertCofirmText(confirmText)
                setAlertCancelText(cancelText)
                setAlertVisibility(true)
                setAlertOnConfirm(onConfirm)
            },
            dismiss: () => {
                setAlertVisibility(false)
            },
        }
    }

    const loaderValues = {
        showLoading,
        setShowLoading,
        toggleLoader,

        setAlertVisibility,
        setAlertTitle,
        setAlertDescription,
        setAlertCofirmText,
        setAlertCancelText,
        Alert,
    }

    return (
        <AppContext.Provider value={loaderValues}>
            <ThemeProvider>
                <NavigationContainer>
                    <StatusBar
                        backgroundColor="black"
                        barStyle="light-content"
                    />

                    {!alertVisibility && <LoaderRendererHelper />}

                    {!showLoading && (
                        <AlertRendererHelper
                            visible={alertVisibility}
                            title={alertTitle}
                            description={alertDescription}
                            confirmText={alertConfirmText}
                            cancelText={alertCancelText}
                            setVisibility={setAlertVisibility}
                            onConfirm={() => alertOnConfirm()}
                        />
                    )}

                    <AppStartingPoint />
                </NavigationContainer>
            </ThemeProvider>
        </AppContext.Provider>
    )
}

const LoaderRendererHelper = () => {
    const {showLoading} = useApp()
    return showLoading ? <Loader /> : null
}

const AlertRendererHelper = (props: SobyteAlertProps) => {
    return <SobyteAlert {...props} />
}

export default MainApp
export const useApp = () => useContext(AppContext)
