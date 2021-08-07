import getMusicDetails from 'react-native-ytdl'

import {AudioQualityType} from '../interfaces'

interface AudioQualityLimit {
    min: number
    max: number
}
/**
 * @param quality the audio quality saved in the local settings of the android
 * @returns a range of bitrate {min, max} values
 * this value will be used to filter the results and find a songs data within this range...
 */
export function getAudioBitrateLimitsFromQuality(
    quality: AudioQualityType,
): AudioQualityLimit {
    console.log('AUQOIU', quality)
    switch (quality) {
        case 'extreme':
            return {min: 150, max: 1000}
        case 'auto':
            return {min: 100, max: 149}
        case 'good':
            return {min: 55, max: 99}
        case 'poor':
            return {min: 0, max: 54}
        default:
            return {min: 150, max: 1000}
    }
}

/**
 * @param musicID is the actual video id of the video
 * @returns the actual link or the endpoint for the audio file to play the song/track
 */
export function getBaseURL(musicID: string) {
    return `https://www.youtube.com/watch?v=${musicID.trim()}`
}

/**
 * @param musicID the music ID
 * @param options other specific details that need to be checked before providing the actual final data
 */
export async function getTrackURL(
    musicID: string,
    options: MusicDataFetchOptions = {},
): Promise<string> {
    /**
     * the actual option the outer code may provide some arttributes
     * we are setting some default attribute and then we are ovveriding some of them which are provided through
     * the argument of this function
     */
    const finalOptions: MusicDataFetchOptions = {
        hasAudio: true,
        hasVideo: false,
        audioQuality: 'extreme',
        ...options,
    }

    return new Promise(async (resolve, reject) => {
        /**
         * this is a huge data and contains many formats of the same track data
         * we are filtering some of them is the basis of the options provided
         * and default settings...
         */
        const trackResultData: MusicFormats = await getMusicDetails(
            getBaseURL(musicID),
        )
        // extracting the formats from whole data...
        const {formats} = trackResultData
        // this is the default range between which the songs data's bitrate should exist...
        const {min, max} = getAudioBitrateLimitsFromQuality(
            finalOptions.audioQuality || 'auto',
        )
        /**
         * filtering (this is the actual work we need to do and then after provide it to the frontend)
         * this filter depends on the properties/options given through the parameter
         * as well as the default values
         */
        const finalDatas = formats.filter(data => {
            console.log(data.contentLength, data.approxDurationMs)
            if (
                data.hasAudio == finalOptions.hasAudio &&
                data.hasVideo === finalOptions.hasVideo &&
                data.audioBitrate >= 1 &&
                data.audioBitrate >= min &&
                data.audioBitrate <= max
            ) {
                return true
            }
            return false
        })
        // if (!finalDatas[0]) {
        // }
        // returning the final url or the data...
        resolve(finalDatas[0].url)
    })
}

interface MusicDataFetchOptions {
    approxDurationMs?: string
    audioBitrate?: number
    audioQuality?: AudioQualityType
    contentLength?: string
    hasAudio?: boolean
    hasVideo?: boolean
}

interface MusicFormats {
    formats: Array<{
        approxDurationMs: string
        audioBitrate: number
        audioChannels: number
        audioCodec: string
        audioQuality: string
        audioSampleRate: string
        averageBitrate: number
        bitrate: number
        codecs: string
        container: string
        contentLength: string
        hasAudio: boolean
        hasVideo: boolean
        indexRange: Array<Object>
        initRange: Array<Object>
        isDashMPD: boolean
        isHLS: boolean
        isLive: boolean
        itag: number
        lastModified: string
        loudnessDb: number
        mimeType: string
        projectionType: string
        quality: string
        qualityLabel: null | string
        s: string
        sp: string
        url: string
        videoCodec: null | string
    }>
    full: boolean
    html5player: string
    page: string
    player_response: {
        adPlacements: Array<Array<Object>>
        annotations: Array<Array<Object>>
        attestation: {playerAttestationRenderer: Array<Object>}
        captions: {
            playerCaptionsRenderer: Array<Object>
            playerCaptionsTracklistRenderer: Array<Object>
        }
        cards: {cardCollectionRenderer: Array<Object>}
        endscreen: {endscreenRenderer: Array<Object>}
        frameworkUpdates: {entityBatchUpdate: Array<Object>}
        microformat: {playerMicroformatRenderer: Array<Object>}
        playabilityStatus: {
            contextParams: string
            miniplayer: Array<Object>
            playableInEmbed: boolean
            status: 'OK' | ''
        }
        playbackTracking: {
            atrUrl: Array<Object>
            googleRemarketingUrl: Array<Object>
            ptrackingUrl: Array<Object>
            qoeUrl: Array<Object>
            videostatsDefaultFlushIntervalSeconds: number
            videostatsDelayplayUrl: Array<Object>
            videostatsPlaybackUrl: Array<Object>
            videostatsScheduledFlushWalltimeSeconds: []
            videostatsWatchtimeUrl: Array<Object>
            youtubeRemarketingUrl: Array<Object>
        }
        playerAds: Array<Array<Object>>
        playerConfig: {
            audioConfig: Array<Object>
            mediaCommonConfig: Array<Object>
            streamSelectionConfig: Array<Object>
            webPlayerConfig: Array<Object>
        }
        responseContext: {
            mainAppWebResponseContext: Array<Object>
            serviceTrackingParams: []
            webResponseContextExtensionData: Array<Object>
        }
        storyboards: {playerStoryboardSpecRenderer: Array<Object>}
        streamingData: {
            adaptiveFormats: []
            expiresInSeconds: string
            formats: []
        }
        trackingParams: string
        videoDetails: {
            allowRatings: boolean
            author: string
            averageRating: number
            channelId: string
            isCrawlable: boolean
            isLiveContent: boolean
            isOwnerViewing: boolean
            isPrivate: boolean
            isUnpluggedCorpus: boolean
            keywords: []
            lengthSeconds: string
            shortDescription: string
        }
    }
}
