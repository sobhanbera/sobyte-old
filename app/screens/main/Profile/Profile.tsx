import React, {useEffect} from 'react'
import {useState} from 'react'
import {Text, View} from 'react-native'
import {Lrc} from 'react-native-lrc'

import {GradientBackground, HeaderProfile} from '../../../components'

const lrcString = `[ti: I still love you]
    [ar:Wang Leehom]
    [al: full firepower, new song + selection]
    [by:Ouyang Peng]
    [00:01.17]Twinkle and twinkling, leaving traces of time 
    [00:07.29]The center of gravity of my world is still you
    [00:13.37]Year after year, it flies by in a blink of an eye
    [00:20.29]The only thing that never changes is constant change
    [00:27.14]I don’t look like myself before, and you don’t look like you
    [00:33.36]But in my eyes your smile is still beautiful
    [00:39.53]This time I can only go forward one direction clockwise
    [00:46.12]I don’t know how long it will take, so I have to let you know
    [00:51.82]I still love you, is the only way out
    [00:57.36]I still cherish every moment of happiness
    [01:04.65]Every breath, every movement, every expression
    [01:11.43]I will still love you in the end
    [01:18.08]Still love you, still love you 
    [01:25.58]I don’t look like myself before, and you don’t look like you
    [01:31.52]But in my eyes your smile is still beautiful
    [01:37.61]This time I can only go forward one direction clockwise
    [01:44.42]I don’t know how long it will take, so I have to let you know
    [01:50.18]I still love you, is the only way out
    [01:55.65]I still cherish every moment of happiness
    [02:02.84]Every breath, every movement, every expression
    [02:09.77]I will still love you in the end`

interface ProfileProps {
    navigation?: any
}
const Profile: React.FC<ProfileProps> = props => {
    const [time, setTime] = useState(0)
    const onCurrentLineChange = (value: any) => {
        console.log(value)
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         setTime(time => time + 1000)
    //         console.log(time)
    //     }, 1000)
    // }, [time])

    return (
        <GradientBackground>
            <HeaderProfile navigation={props.navigation} />
            <View
                style={{
                    paddingVertical: 50,
                    backgroundColor: '#0000007F',
                }}></View>
            <Lrc
                lrc={lrcString}
                lineRenderer={({lrcLine}: any) => {
                    console.log('INSIDE--> ', lrcLine)
                    return (
                        <Text
                            style={{
                                textAlign: 'center',
                                color: 'white',
                                fontStyle: 100,
                            }}>
                            {lrcLine}
                        </Text>
                    )
                }}
                currentTime={time}
                autoScroll={true}
                autoScrollAfterUserScroll={1}
                style={{height: 500}}
                lineHeight={16}
                activeLineHeight={20}
                onCurrentLineChange={onCurrentLineChange}
            />
        </GradientBackground>
    )
}

export default Profile
