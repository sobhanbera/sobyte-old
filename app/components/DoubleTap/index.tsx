import React, {useState} from 'react'
import {TouchableWithoutFeedback, ViewStyle} from 'react-native'
import {DOUBLE_TAP_DELAY} from '../../constants'

interface DoubleTapProps {
    onDoubleTap: Function
    style?: ViewStyle
}
const DoubleTap: React.FC<DoubleTapProps> = props => {
    // initial value is 1 in case for the if condition it will always show truthy or else we have to use this condition ```if(lastTapTime && time - lastTapTime <= DOUBLE_TAP_DELAY)``` all the time
    const [lastTapTime, setLastTapTime] = useState<number>(1)

    function handleDoubleTap() {
        /** first it will check that the previous time when the user press
         * the component and if it is less than or equal to the delay of double
         * tap then it will call callback function for double tap */
        const time = Date.now()
        if (lastTapTime && time - lastTapTime <= DOUBLE_TAP_DELAY)
            props.onDoubleTap()
        else setLastTapTime(time)
    }

    return (
        <TouchableWithoutFeedback
            style={props.style}
            onPress={() => handleDoubleTap()}>
            {props.children}
        </TouchableWithoutFeedback>
    )
}

export default DoubleTap
