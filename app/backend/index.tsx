import React from 'react'

const AppMainBackendApiContext = React.createContext({})
interface Props {
    children: React.ReactNode
}
const AppMainBackendApi = (props: Props) => {
    const appMainBackendApiContextValues = {}
    return (
        <AppMainBackendApiContext.Provider
            value={appMainBackendApiContextValues}>
            {props.children}
        </AppMainBackendApiContext.Provider>
    )
}

export default AppMainBackendApi
export const useBackendApi = () => React.useContext(AppMainBackendApiContext)
export {AppMainBackendApiContext}
