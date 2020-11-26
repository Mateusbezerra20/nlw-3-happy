import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
// Callout é o que chamamos de popup no ReactJS
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons' //Essa biblioteca já vem junto com o expo
import mapMarker from '../images/map-marker.png'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import api from '../services/api'

interface Orphanage {
  id: number
  name: string
  latitude: number
  longitude: number
}

export default function OrphanageMap(){
    const navigation = useNavigation()

    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    //useFocusEffect recarrega a página sempre que ela 'recebe foco'. então
    //sempre que o usuário é redirecionado para ela, ela será renderizada.
    useFocusEffect(() => {
      api.get('orphanages').then(response => {
        setOrphanages(response.data)
      })
    })

    // Navegar para a página de detalhes
    function handleNatigateToOrphanageDetails(id: number){
        navigation.navigate('OrphanageDetails', { id })
    }

    function handleNatigateToCreateOrphanage(){
        navigation.navigate('SelectMapPosition')
    }

    return (
        <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -4.2239984,
            longitude: -44.7841574,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
          }}
        >
          {
            orphanages.map(orphanage => {
              return (
                <Marker
                  key={orphanage.id}
                  icon={mapMarker}
                  calloutAnchor={{
                    x: 2.7,
                    y: 0.8
                  }}
                  coordinate={{
                    latitude: orphanage.latitude,
                    longitude: orphanage.longitude
                  }}
                >
                  <Callout tooltip={true} onPress={() => handleNatigateToOrphanageDetails(orphanage.id)}>
                    {/* tooltipe true para que o Callout tenha a minha estilização em vez da padrão */}
                    <View style={styles.calloutContainer}>
                      <Text style={styles.calloutText}>{orphanage.name}</Text>
                    </View>
                  </Callout>
                </Marker>
              )
            })
          }
        </MapView>
  
        <View style={styles.footer}>
            <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
  
            <RectButton style={styles.createOrphanageButton} onPress={handleNatigateToCreateOrphanage}>
              <Feather name='plus' size={20} color='#FFF' />
            </RectButton>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width, // Largura da tela do dispositivo (width: 100%)
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center'
    },
  
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold'
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3, //Sombra (simula elevação)
    },
  
    footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3'
    },
  
    createOrphanageButton: {
      height: 56,
      width: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center'
    }
  });