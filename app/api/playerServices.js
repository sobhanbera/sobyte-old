import TrackPlayer from 'react-native-track-player'

module.exports = async function () {
    TrackPlayer.addEventListener('remote-play', async () => {
        await TrackPlayer.play()
    })

    TrackPlayer.addEventListener('remote-pause', async () => {
        await TrackPlayer.pause()
    })

    // TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop())

    TrackPlayer.addEventListener('remote-jump-forward', async ({interval}) => {
        const currPos = await TrackPlayer.getPosition()
        await TrackPlayer.seekTo(currPos + interval)
    })

    TrackPlayer.addEventListener('remote-jump-backward', async ({interval}) => {
        const currPos = await TrackPlayer.getPosition()
        await TrackPlayer.seekTo(currPos - interval)
    })
}
