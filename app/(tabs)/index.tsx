import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

interface PuebloMagico {
  id: string;
  nombre: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  imagen: string;
}

// 📌 Lista de Pueblos Mágicos con coordenadas
const PUEBLOS_MAGICOS: PuebloMagico[] = [
  {
    id: "1",
    nombre: "Izamal",
    descripcion: "La ciudad amarilla y colonial de Yucatán.",
    latitud: 20.935,
    longitud: -89.016,
    imagen: "https://cdn.forbes.com.mx/2021/06/Izamal-Yucatan.jpg",
  },
  {
    id: "2",
    nombre: "Valladolid",
    descripcion: "Cercano a Chichén Itzá, con una gran historia y gastronomía.",
    latitud: 20.688,
    longitud: -88.201,
    imagen: "https://th.bing.com/th/id/OIP.28njduzTzpMxl_7a0GSJ3AHaEg?rs=1&pid=ImgDetMain",
  },
  {
    id: "3",
    nombre: "Maní",
    descripcion: "Pueblo histórico con gran tradición yucateca.",
    latitud: 20.3932321031475, 
    longitud: -89.39149800656826,
    imagen: "https://th.bing.com/th/id/OIP.7Nusfv_xuMPpNj04-lkMXAHaE8?rs=1&pid=ImgDetMain",
  },
];


const UT_CANCUN = {
  latitud: 21.04967690638674, 
  longitud: -86.84649464656047,
};

const MapScreen: React.FC = () => {
  const [region, setRegion] = useState<Region>({
    latitude: UT_CANCUN.latitud,
    longitude: UT_CANCUN.longitud,
    latitudeDelta: 1.0,
    longitudeDelta: 1.0,
  });

  const handleNavigateToLocation = (latitud: number, longitud: number) => {
    setRegion({
      latitude: latitud,
      longitude: longitud,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        
        <Marker
          coordinate={{
            latitude: UT_CANCUN.latitud,
            longitude: UT_CANCUN.longitud,
          }}
          title="UT Cancún"
          description="Universidad Tecnológica de Cancún"
          pinColor="blue" 
        />

        
        {PUEBLOS_MAGICOS.map((pueblo) => (
          <Marker
            key={pueblo.id}
            coordinate={{ latitude: pueblo.latitud, longitude: pueblo.longitud }}
            title={pueblo.nombre}
            description={pueblo.descripcion}
          />
        ))}
      </MapView>

    
      <FlatList
        data={PUEBLOS_MAGICOS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagen }} style={styles.image} />
            <Text style={styles.title}>{item.nombre}</Text>
            <Text style={styles.description}>{item.descripcion}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleNavigateToLocation(item.latitud, item.longitud)}>
              <Text style={styles.buttonText}>📍 Ver en el Mapa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "70%",
  },
  flatList: {
    position: "absolute",
    bottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    width: 200,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  description: {
    fontSize: 12,
    color: "gray",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
