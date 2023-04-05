import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../navigator/Navigator'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, "PokemonScreen">{};

export const PokemonScreen = ({route,navigation} : Props ) => {
  
  const {simplePokemon,color,} = route.params
  const { id, name, picture } = simplePokemon
  const { top } = useSafeAreaInsets()
  
  console.log(route.params)

  const { isLoading, pokemon } = usePokemon(id)

  return (
    <View style={{flex:1}}>

      {/* HeaderContainer */}
      <View style={{
            ...styles.headerContainer,
            backgroundColor:color
          }}>

        {/* {BackButton} */}
          <TouchableOpacity
            onPress={() => navigation.pop()}
            activeOpacity={0.8}
            style={{
              ...styles.backButton
            }}
          >
            <Icon
              name="arrow-back-outline"
              color="white"
              size={ 35}
            />
          </TouchableOpacity>

        {/* Nombre del Pokemon */}
         <Text style={{
            ...styles.pokemonName,
            top: top + 40
          }}>
              {name[0].toUpperCase() + name.substring(1) + "\n" }#{id}
         </Text>
        


        {/* Pokebola blanca*/}
          <Image
              source={require("../assets/pokebola-blanca.png")}
              style={styles.pokeball}
          />

        {/* Picture Pokemon */}
          <FadeInImage
              uri={picture}
              style={styles.pokemonImage}
          />
        
      </View>


        {/* Detalles y loading */}
        {
          isLoading
          ? (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator
                color={color}
                size={50}
              />
            </View>
          ) :  <PokemonDetails pokemon={pokemon}/>
        }


    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
      height: 370,
      zIndex: 999,
      alignItems: "center",
      borderBottomLeftRadius: 1000,
      borderBottomRightRadius: 1000
    },
    backButton: {
      position: "absolute",
      left:20
    },
    pokemonName: {
      color: "white",
      fontSize: 40,
      alignSelf: "flex-start",
      left: 20
    },
    pokeball: {
      width: 250,
      height: 250,
      bottom: -20,
      opacity: 0.7
    },
    pokemonImage:{
      height:250,
      width:250,
      position: "absolute",
      bottom: -15
    },
    loadingIndicator:{
      flex:1,
      justifyContent: 'center',
      alignItems: "center"
    }
});