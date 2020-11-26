import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface HeaderProps {
    title: string
    showCancel?: boolean //O '?' torna essa propriedade opcional
}

export default function Header({title, showCancel = true}: HeaderProps) {
    // Acima eu desestruturei a interface HeaderProps, extraindo a propriedade 'title'
    // outra forma de obter o mesmo resultado:
    // ... Header(props: HeaderProps)
    // ... <Text style={...}>{props.title}</Text>

    const navigation = useNavigation()

    function handleGoBackToHomepage(){
        navigation.navigate("OrphanagesMap")
    }

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#15b6d6" />
            </BorderlessButton>

            <Text style={styles.title}>{title}</Text>

            { showCancel ? (
                <BorderlessButton onPress={handleGoBackToHomepage}>
                    <Feather name="x" size={24} color="#ff6696" />
                </BorderlessButton>
            ): (
                <View />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#8fa7b3',
        fontSize: 16,
    }
})