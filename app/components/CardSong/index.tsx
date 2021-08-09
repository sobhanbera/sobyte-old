import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Shimmer from 'react-native-shimmer'

import {useSetting} from '../../context'
import {
    getHightQualityImageFromLinkWithHeight,
    formatArtists,
    trimLargeString,
} from '../../utils/Objects'
import {
    DEFAULT_IMAGE_QUALITY,
    DEFAULT_IMAGE_SIZE,
    DEFAULT_TINY_ICON_SIZE,
    IMAGE_SMALL_SIZE_TO_SHOW,
} from '../../constants'
import {CasualDemoList, SongObject} from '../../interfaces'

interface Props {
    textColor: string
    subColor: string
    shimmerDirection: 'up' | 'down' | 'left' | 'right'
    onPress: Function
    songs: Array<SongObject>
    loading: boolean
}

const CardSong = ({
    songs,
    onPress,
    textColor,
    subColor,
    shimmerDirection,
    loading,
}: Props) => {
    const {imageQuality} = useSetting()

    return (
        <View>
            {loading
                ? CasualDemoList.map(demo => {
                      return (
                          <Shimmer
                              key={demo.id}
                              opacity={1}
                              animating
                              direction={shimmerDirection}
                              animationOpacity={0.1}>
                              <TouchableOpacity
                                  activeOpacity={0.75}
                                  onPress={() => {}}>
                                  <View style={styles.card}>
                                      <View style={styles.cardMain}>
                                          <View
                                              style={[
                                                  styles.imageDummy,
                                                  styles.contentWrapper,
                                                  {
                                                      borderRadius: 5,
                                                  },
                                              ]}></View>

                                          <View style={styles.songDetails}>
                                              <View
                                                  style={[
                                                      styles.textDummy,
                                                      styles.contentWrapper,
                                                  ]}
                                              />
                                              <View
                                                  style={[
                                                      styles.textDummy,
                                                      styles.largeTextDummy,
                                                      styles.contentWrapper,
                                                  ]}
                                              />
                                          </View>
                                      </View>

                                      <View
                                          style={[
                                              styles.dummyIcon,
                                              styles.contentWrapper,
                                          ]}
                                      />
                                  </View>
                              </TouchableOpacity>
                          </Shimmer>
                      )
                  })
                : songs[0].musicId.length > 0
                ? songs.map(song => {
                      const songImage = getHightQualityImageFromLinkWithHeight(
                          song.thumbnails[0].url,
                          song.thumbnails[0].height,
                          imageQuality || DEFAULT_IMAGE_SIZE,
                          DEFAULT_IMAGE_QUALITY,
                      )
                      const highQualityImage =
                          getHightQualityImageFromLinkWithHeight(
                              song.thumbnails[0].url,
                              song.thumbnails[0].height,
                              '450',
                              DEFAULT_IMAGE_QUALITY,
                          )
                      const artist = formatArtists(song.artist)

                      return (
                          <TouchableOpacity
                              key={song.musicId}
                              onPress={() =>
                                  onPress({
                                      id: song.musicId,
                                      duration: song.duration,
                                      title: song.name,
                                      artist: artist,
                                      artwork: highQualityImage,
                                  })
                              }
                              activeOpacity={0.75}>
                              <View style={styles.card}>
                                  <View style={styles.cardMain}>
                                      <Image
                                          source={{uri: songImage}}
                                          style={{
                                              width: IMAGE_SMALL_SIZE_TO_SHOW,
                                              height: IMAGE_SMALL_SIZE_TO_SHOW,
                                              borderRadius: 5,

                                              borderWidth: 0.2,
                                              borderColor: subColor,
                                          }}
                                      />

                                      <View style={styles.songDetails}>
                                          <Text
                                              numberOfLines={1}
                                              style={[
                                                  styles.songName,
                                                  {
                                                      color: textColor,
                                                  },
                                              ]}>
                                              {trimLargeString(song.name)}
                                          </Text>
                                          <Text
                                              numberOfLines={1}
                                              style={[
                                                  styles.songDetailsText,
                                                  {
                                                      color: subColor,
                                                  },
                                              ]}>
                                              {artist}
                                          </Text>
                                      </View>
                                  </View>

                                  <Entypo
                                      size={DEFAULT_TINY_ICON_SIZE}
                                      name="dots-three-vertical"
                                      color={subColor}
                                  />
                              </View>
                          </TouchableOpacity>
                      )
                  })
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 20,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardMain: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    songDetails: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
    },
    songName: {
        fontSize: 17,
        maxWidth: 225,
        width: 225,
        marginVertical: 2,
    },
    songDetailsText: {
        fontSize: 15,
        maxWidth: 225,
        width: 225,
    },

    contentWrapper: {
        backgroundColor: '#0000007f',
    },
    imageDummy: {
        width: IMAGE_SMALL_SIZE_TO_SHOW,
        height: IMAGE_SMALL_SIZE_TO_SHOW,
    },
    textDummy: {
        width: 200,
        height: 7,
        borderRadius: 2,
        marginTop: 5,
        marginBottom: 6,
    },
    largeTextDummy: {
        height: 12,
        borderRadius: 3,
    },
    dummyIcon: {
        width: DEFAULT_TINY_ICON_SIZE,
        height: DEFAULT_TINY_ICON_SIZE,
        paddingVertical: 12,
    },
})

export default CardSong
