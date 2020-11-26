import React from 'react';
import { useFonts } from 'expo-font'
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito'
// O que acabamos de fazer acima foi importar a fonte em diferentes tamanhos

import Routes from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  })
  // fontsLoaded terá um valor true ou false dependendo se as fontes carregaram ou não
  if(!fontsLoaded){
    // Se as fontes ainda não estiverem carregadas, podemos mostrar alguma coisa ao usuário
    // ou apenas deixar a tela em branco mesmo, retornando o null. Como isso é muito rápido,
    // não fará muita diferença ao usuário.
    return null
  }

  return (
    <Routes />
  )
}
