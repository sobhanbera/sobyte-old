import React from 'react'
import { Text } from 'react-native'

interface Props {
    title: string 
}
const Caption = (props: Props) => {
    return (
        <Text style={{}}>{props.title}</Text>
    )
}

export default Caption
