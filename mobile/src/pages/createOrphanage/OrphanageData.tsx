import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

import api from '../../services/api'

interface mapSelectedParams{
  latitude: number
  longitude: number
}

export default function OrphanageData() {
  const route = useRoute()
  const params = route.params as mapSelectedParams
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<string[]>([])

  async function handleCreateOrphanage() {
    const { latitude, longitude } = params

    const formData = new FormData

    formData.append('name', name)
    formData.append('about', about)
    formData.append('latitude', String(latitude))
    formData.append('longitude', String(longitude))
    formData.append('instructions', instructions)
    formData.append('opening_hours', opening_hours)
    formData.append('open_on_weekends', String(open_on_weekends))

    images.forEach((image, index) => {
      formData.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image
      } as any )
    })

    await api.post('orphanages', formData)

    navigation.navigate('OrphanagesMap')
  }

  async function handleSelectImages() {
    // Requisitando permissão para acessar as fotos do dispositivo
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()

    if(status !== 'granted') {
      alert('Eita, precisamos de acesso às suas fotos...')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, //permite edição
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //tipo de média: imagens
    })

    if(result.cancelled){
      // Caso o usuário tenha cancelado
      return
    }

    // Estraindo o atributo uri de result e renomeando-o para image
    const { uri:image } = result

    // Devido ao conceito de imutabilidade de um estado, não podemos modificar o valor atribuito a ele
    // em vez disso, atribuimos outro valor. Nesse caso, um array contendo os valores do anterior mais
    // um novo valor.
    setImages([...images, image])
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={text => setAbout(text)}
      />
      {/*
        Colocar a propriedade multiline transforma o input em um campo de texto maior,
        parecedio com uma textarea.
      */}

      {/* 
      <Text style={styles.label}>Whatsapp</Text>
        <TextInput
        style={styles.input}
      />
      */}

      <Text style={styles.label}>Fotos</Text>
      
      <View style={styles.uploadImagesContainer}>
        {images.map(image => {
          return (
            <Image
              key={image}
              source={{ uri: image }}
              style={styles.uploadedImages}
            />
          )
        })}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={text => setInstructions(text)}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={text => setOpeningHours(text)}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={value => setOpenOnWeekends(value)}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  uploadImagesContainer: {
    flexDirection: 'row'
  },

  uploadedImages: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})