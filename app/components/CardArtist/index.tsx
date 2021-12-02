import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'

import {useSetting} from '../../context'
import {
    getHighQualityImageFromLinkWithHeight,
    firstLetterCap,
} from '../../utils/Objects'
import {
    DEFAULT_IMAGE_QUALITY,
    DEFAULT_IMAGE_SIZE,
    IMAGE_TINY_SIZE_TO_SHOW,
} from '../../constants'
import {ArtistObject, CasualDemoList} from '../../interfaces'
import Shimmer from 'react-native-shimmer'

interface Props {
    textColor: string
    subColor: string
    shimmerDirection: 'up' | 'down' | 'left' | 'right'
    onPress: Function
    artists: Array<ArtistObject>
    loading: boolean
}

const CardSong = ({
    artists,
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
                              animationOpacity={0.1}
                          >
                              <TouchableOpacity>
                                  <View
                                      style={{
                                          marginHorizontal: 25,
                                          marginVertical: 10,
                                          flexDirection: 'row',
                                          justifyContent: 'flex-start',
                                          alignItems: 'center',
                                      }}
                                  >
                                      <View
                                          style={[
                                              styles.imageDummy,
                                              styles.contentWrapper,
                                          ]}
                                      />
                                      <View
                                          style={[
                                              styles.textDummy,
                                              styles.contentWrapper,
                                          ]}
                                      />
                                  </View>
                              </TouchableOpacity>
                          </Shimmer>
                      )
                  })
                : artists[0].browseId.length > 0
                ? artists.map(artist => {
                      const songImage = getHighQualityImageFromLinkWithHeight(
                          artist.thumbnails[0].url,
                          artist.thumbnails[0].height,
                          imageQuality || DEFAULT_IMAGE_SIZE,
                          DEFAULT_IMAGE_QUALITY,
                      )
                      const highQualityImage =
                          getHighQualityImageFromLinkWithHeight(
                              artist.thumbnails[0].url,
                              artist.thumbnails[0].height,
                              '450',
                              DEFAULT_IMAGE_QUALITY,
                          )

                      if (artist.browseId.length <= 0) return null

                      return (
                          <TouchableOpacity
                              key={artist.browseId}
                              onPress={() =>
                                  onPress({
                                      ...artist,
                                      image: highQualityImage,
                                  })
                              }
                              activeOpacity={0.75}
                          >
                              <View style={styles.card}>
                                  <View style={styles.cardMain}>
                                      <Image
                                          source={{uri: songImage}}
                                          style={{
                                              width: IMAGE_TINY_SIZE_TO_SHOW,
                                              height: IMAGE_TINY_SIZE_TO_SHOW,
                                              borderRadius: 100,

                                              borderWidth: 0.2,
                                              borderColor: subColor,
                                          }}
                                      />

                                      <Text
                                          numberOfLines={1}
                                          style={[
                                              styles.artistName,
                                              {
                                                  color: textColor,
                                              },
                                          ]}
                                      >
                                          {firstLetterCap(artist.name)}
                                      </Text>
                                  </View>
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
    artistName: {
        fontSize: 17,
        maxWidth: 225,
        marginVertical: 2,
        paddingHorizontal: 15,
    },

    contentWrapper: {
        backgroundColor: '#0000007f',
    },
    imageDummy: {
        width: IMAGE_TINY_SIZE_TO_SHOW,
        height: IMAGE_TINY_SIZE_TO_SHOW,
        borderRadius: 100,
    },
    textDummy: {
        width: 200,
        height: 7,
        borderRadius: 2,
        marginTop: 5,
        marginBottom: 6,
        marginHorizontal: 15,
    },
})

export default CardSong
