import React, { useEffect, useState, useRef } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SimplePokemon } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage'
import ImageColors from 'react-native-image-colors'
import { useNavigation } from '@react-navigation/native'


interface Props {
    pokemon: SimplePokemon
}

const windowWith = Dimensions.get("window").width

export const PokemonCard = ({pokemon} : Props) => {

    const navigation = useNavigation()

    const [bgColor, setBgColor] = useState("grey")
    const isMounted = useRef(true)

    useEffect(() => {
        ImageColors.getColors(pokemon.picture, {fallback: "grey"})
        .then( colors => {
            
            if( !isMounted.current) return;
            
            if (colors.platform === "android"){
                setBgColor (colors.dominant || "grey" )
            } else if(colors.platform === "ios"){
                setBgColor (colors.background || "grey" )
            }

        })
            return () => {
                isMounted.current = false
            }
    }, [])
    

  return (
    <TouchableOpacity
        activeOpacity={ 0.8 }
        onPress={() => navigation.navigate("PokemonScreen",{simplePokemon: pokemon, color: bgColor})}
    >
        <View style={{
            ...styles.cardContainer,
            width: windowWith * 0.4,
            backgroundColor: bgColor
            }}>

            <View>
                <Text style={styles.name}>
                    {pokemon.name}
                    {`${"\n#"} ${pokemon.id}`}
                </Text>
            </View>

            <View style={ styles.pokebolaContainer}>
                <Image
                    source={ require("../assets/pokebola.png")}
                    style={ styles.pokebola}
                />
            </View>

            <FadeInImage 
                uri={ pokemon.picture }
                style={ styles.pokeImagen}
            />

        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 20,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        top: 20,
        left: 10
    },
    pokebolaContainer: {
        position: 'absolute',
        width: 100,
        height: 100,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        opacity: 0.5
    },
    pokebola: {
        width: 100,
        height: 100,
        position: "absolute",
        bottom: -20,
        right: -20,
    },
    pokeImagen:{
        height: 120,
        width: 120,
        position: "absolute",
        bottom: -8,
        right: -5
    }
});