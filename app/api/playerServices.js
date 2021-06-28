import TrackPlayer from 'react-native-track-player'

module.exports = async function () {
    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play())

    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause())

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
