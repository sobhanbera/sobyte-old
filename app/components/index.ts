/**
 * © 2010 Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - all the components are exported from here
 */

import Scaler from './Scaler'
import AuthButton from './AuthButton'
import ScalerAuthButton from './ScalerAuthButton'
import SobyteTextInput from './SobyteTextInput'
import PaddingView from './HighPaddingView'

import Loader from './GlobalLoading'

import Header from './Header'
import HeaderProfile from './HeaderProfile'
import HeaderMain from './HeaderMain'
import HeaderSearch from './HeaderSearch'
import HeaderCollapsible from './HeaderCollapsible'

import Area from './Area'
import Block from './Block'
import Prompt from './Prompt'

import TopicTitle from './TopicTitle'
import Caption from './Caption'

import HeartBeatView from './HeartBeatView'
import T_C_PrivacyPolicy from './T_C_PrivacyPolicy'
import {AnimatedGradient} from './AnimatedGradient'
import SobyteAlert from './SobyteAlert'
import DoubleTap from './DoubleTap'
import CenterButtonView from './CenterButtonView'

import FullScreenLoading from './FullScreenLoading'

import GradientBackground from './GradientBackground'
import BottomSheet from './BottomSheet'

import GridCategory from './GridCategory'
import CardSong from './CardSong'
import CardArtist from './CardArtist'
import SingleBlockSongs from './SingleBlockSongs'
import SingleBlockArtists from './SingleBlockArtists'

import AnimatedHeader from './AnimatedHeader'

import CommonSongList from './CommonSongList'
import CommonSongItem from './CommonSongItem'

import CommonArtistList from './CommonArtistList'
import CommonArtistItem from './CommonArtistItem'

import KeywordResultsRenderer_Songs from './KeywordResultsRenderer/Songs'
import KeywordResultsRenderer_Artists from './KeywordResultsRenderer/Artists'

export {
    Scaler,
    AuthButton,
    CenterButtonView,
    ScalerAuthButton,
    Loader,
    PaddingView,
    SobyteTextInput,
    Header,
    HeaderProfile,
    HeartBeatView,
    HeaderMain,
    HeaderSearch,
    SobyteAlert,
    HeaderCollapsible,
    AnimatedGradient,
    T_C_PrivacyPolicy,
    SobyteAlert as SobyteAlertBox,
    FullScreenLoading,
    DoubleTap,
    GradientBackground,
    Area,
    Block,
    Area as Section,
    Prompt,
    BottomSheet,
    BottomSheet as SimpleBottomSheet,
    GridCategory,
    CardSong,
    CardArtist,
    AnimatedHeader,
    AnimatedHeader as AnimatedHeaderView,
    SingleBlockSongs,
    SingleBlockSongs as BlockCardSongsList,
    SingleBlockArtists,
    SingleBlockArtists as BlockCardArtistList,
    TopicTitle,
    Caption,
    KeywordResultsRenderer_Songs,
    KeywordResultsRenderer_Artists,
}

export {CommonSongList, CommonSongItem, CommonArtistList, CommonArtistItem}

/** music player components */
import TrackProgress from './MusicPlayer/TrackProgress'
export {TrackProgress}
import TrackButtonControls from './MusicPlayer/TrackButtonControls'
export {TrackButtonControls}

/** many others */
import GridSongList from './GridSongList'
export {GridSongList}

import GridArtistList from './GridArtistList'
export {GridArtistList}

import MusicPlayerSongView from './MusicPlayerSongView'
import BackgroundBluredImage from './MusicPlayerSongView/BackgroundBluredImage'
export {MusicPlayerSongView, BackgroundBluredImage}
