import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import { useHistory } from 'react-router-dom'

import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import Sidebar from '../components/Sidebar'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

export default function CreateOrphanage() {
  const history = useHistory()

  // Estados do formulário
  const [position, setPosition] = useState({ latitude: 0, longitude: 0})
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [imagesPreview, setImagesPreview] = useState<string[]>([])

  function putMarker(event: LeafletMouseEvent){
    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files) {
      // files pode vim com um valor nulo, então temos que fazer um tratamento
      // que permita que essa função continue se houver arquivos selecionados
      return
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      // Ainda tenho que pesquisar melhor sobre o objeto abaixo
      return URL.createObjectURL(image)
    })

    setImagesPreview(selectedImagesPreview)
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault()


    const { latitude, longitude } = position

    if(latitude == 0){
      alert("Por favor, informe a localização no mapa.")
      return
    }

    const data = new FormData()

    // Tivemos que converter alguns dados para string porque o formData só aceita string
    // Apesar disso, o backend ira entender os campos de acordo
    data.append('name', name)
    data.append('about', about)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    // As imagens devem ser atribuidas uma por uma.
    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('orphanages', data)

    alert("Cadastro realizado com sucesso!")

    // Enviando o usuário para a tela do mapa
    history.push('/app')
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-4.2303183, -44.7822702]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={putMarker}
            >
              <TileLayer 
                //url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* {position.latitude !== 0 ? (
                <Marker interactive={false} icon={mapIcon} position={[position.latitude,position.longitude]} />
              ): null} */}
              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude,position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {imagesPreview.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}

                {/* O input com id 'image[]' será ativado quando o label abaixo for clicado */}
                <label htmlFor='image[]' className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              {/* A propriedade 'multiple' permite selecionar mais de um arquivo */}
              <input multiple onChange={handleSelectImages} type='file' id='image[]'/>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
              id="instructions"
              value={instructions}
              onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active': ''}
                  onClick={event => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active': ''}
                  onClick={event => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
