/**
 * © 2021 Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - many types of interface/datatypes/types etc
 */

import {
    DominatingColors,
    AudioQualityType,
    ImageQualityType,
    LanguageType,
    ThemeType,
    ColorGradientCodeName,
    AllApiPostBodyArttributes,
    AppUserData,
    MusicTrack,
    LrcLine,
} from './Modals'
export type {
    DominatingColors,
    AudioQualityType,
    ImageQualityType,
    LanguageType,
    ThemeType,
    ColorGradientCodeName,
    AllApiPostBodyArttributes,
    AppUserData,
    MusicTrack,
    LrcLine,
}

import SongCategory from './SongCategory'
export type {SongCategory}

import FetchedArtistObject, {ArtistObject} from './ArtistObject'
export type {FetchedArtistObject, ArtistObject}

import FetchedSongObject, {
    BareSongObjectInstance,
    SongArtistObject,
    SongObject,
    SongObjectWithArtistAsString,
    ThumbnailObject,
    ContinuationObject,
    ContinuationObjectItself,
} from './SongObject'
export type {
    FetchedSongObject,
    SongArtistObject,
    SongObject,
    SongObjectWithArtistAsString,
    ThumbnailObject,
    ContinuationObject,
    ContinuationObjectItself,
}

/**
 * object's instance of the variables for demo purpose or initial values
 */

import {BareFetchedArtistObjectInstance, BareArtistObject} from './ArtistObject'
export {BareFetchedArtistObjectInstance, BareArtistObject}

import {BareFetchedSongObjectInstance, CasualDemoList} from './SongObject'
export {BareFetchedSongObjectInstance, BareSongObjectInstance, CasualDemoList}

import {MoodCategories, GenresCategories} from './Data'
export {MoodCategories, GenresCategories}

/**
 * player controller interfaces and modals
 */
import {Track} from '../api/PlayerControls'
export type {Track}
