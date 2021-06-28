import TrackPlayer, {useTrackPlayerEvents} from 'react-native-track-player'

module.exports = async function () {
    TrackPlayer.addEventListener('remote-play', async () => {
        await TrackPlayer.play()
        // console.log('playing')
    })

    TrackPlayer.addEventListener('remote-pause', async () => {
        await TrackPlayer.pause()
        // console.log('paused')
    })

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop())

    TrackPlayer.addEventListener('remote-jump-forward', async ({interval}) => {
        const currPos = await TrackPlayer.getPosition()
        await TrackPlayer.seekTo(currPos + interval)
    })

    TrackPlayer.addEventListener('remote-jump-backward', async ({interval}) => {
        const currPos = await TrackPlayer.getPosition()
        await TrackPlayer.seekTo(currPos - interval)
    })
}
