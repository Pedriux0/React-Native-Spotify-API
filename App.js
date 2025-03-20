//StAuth10244: I Juan Naranjo , 000895164 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { Audio } from 'expo-av';
import { encode as btoa } from 'base-64'; // Base64 encoding for authentication

const SPOTIFY_CLIENT_ID = ''; // Replace with your Id
const SPOTIFY_CLIENT_SECRET = '';  // Replace with your secret 

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to get Spotify access token
  const getAccessToken = async () => {
    try {
      const authString = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;
      const base64AuthString = btoa(authString); // Use base-64 encoding

      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${base64AuthString}`,
          },
        }
      );

      return response.data.access_token;
    } catch (err) {
      console.error('Error getting access token:', err.response ? err.response.data : err.message);
      setError('Failed to authenticate with Spotify');
      return null;
    }
  };

  // Function to search for tracks
  const searchTracks = async () => {
    if (!searchQuery) {
      setError('Please search something');
      return;
    }

    setIsLoading(true);
    setError('');

    const accessToken = await getAccessToken();
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTracks(response.data.tracks.items);
    } catch (err) {
      console.error('There is not tracks', err);
      setError('Failed to recover the tracks');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to play a track preview
  const playPreview = async (previewUrl) => {
    if (!previewUrl) {
      setError('No preview');
      return;
    }

    const { sound } = await Audio.Sound.createAsync({ uri: previewUrl });
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discoveries for U</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for a song..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchTracks} // Trigger search on "Enter"
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchTracks}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#1DB954" style={styles.loader} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.trackItem}>
              {item.album && item.album.images && item.album.images.length > 0 ? (
                <Image
                  source={{ uri: item.album.images[0].url }}
                  style={styles.albumArt}
                />
              ) : (
                <View style={[styles.albumArt, styles.albumArtPlaceholder]} />
              )}
              <View style={styles.trackInfo}>
                <Text style={styles.trackName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.artistName} numberOfLines={1}>
                  {item.artists[0].name}
                </Text>
                {item.preview_url ? (
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => playPreview(item.preview_url)}
                  >
                    <Text style={styles.playButtonText}>Play Preview</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.noPreviewText}>No preview available</Text>
                )}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Dark background 
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1DB954',
    paddingTop: 33 // Spotify green
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: '#1E1E1E', // Dark input background
    color: '#FFF', // White text
    borderWidth: 0, // Remove border
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1DB954',
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 50,
  },
  searchButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#1E1E1E', // Dark card background
    borderRadius: 10,
    padding: 10,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  albumArtPlaceholder: {
    backgroundColor: '#333', // Placeholder color
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF', // White text
  },
  artistName: {
    fontSize: 14,
    color: '#888', // Gray text
  },
  playButton: {
    marginTop: 5,
    backgroundColor: '#1DB954',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  noPreviewText: {
    color: '#888',
    marginTop: 5,
  },
});