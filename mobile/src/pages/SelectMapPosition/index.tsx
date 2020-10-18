import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { EventUserLocation, MapEvent, Marker, Region } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';

export const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation();
  const [position, setPosition] = useState({
    latitude: -27.2092052,
    longitude: -49.6401092,
  });

  function handleNextStep() {
    navigation.navigate('OrphanageData', position);
  }

  function handleSelectMapPosition(event: Region) {
    const position = {
      latitude: event.latitude,
      longitude: event.longitude
    }
    setPosition(position);
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onRegionChange={handleSelectMapPosition}
      >
        <Marker
          icon={mapMarkerImg}
          coordinate={position}
        />
      </MapView>

      <RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontSize: 16,
    color: '#FFF',
  }
})