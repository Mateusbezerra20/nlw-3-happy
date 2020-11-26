import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetails from './pages/OrphanageDetails'
import SelectMapPosition from './pages/createOrphanage/SelectMapPosition'
import OrphanageData from './pages/createOrphanage/OrphanageData'

import Header from './components/Header'

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5'} }}>
                {/* 
                Em screenOptions eu desabilitei os headers de todas as páginas. Para desabilitar
                o header apenas em uma ou algumas telas expecíficas, basta ir no componente Screen da página
                e atribuir o valor false no atributo 'headerShown' na propriedade 'Options'.
                */}
                <Screen
                    name="OrphanagesMap"
                    component={OrphanagesMap}
                />
                <Screen
                    name="OrphanageDetails"
                    component={OrphanageDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato" />
                    }}
                />
                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Marque no mapa" />
                    }}
                />
                <Screen
                    name="OrphanageData"
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />
                    }}
                />
            </Navigator>
        </NavigationContainer>
    )
}