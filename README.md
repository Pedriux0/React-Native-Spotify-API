# Music Discovery App 🎵

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Spotify API](https://img.shields.io/badge/Spotify_API-1DB954?style=for-the-badge&logo=spotify&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)

A React Native mobile application that allows users to discover music by searching for tracks, artists, and albums using the **Spotify Web API**. Users can view track details, play 30-second previews, and explore new music seamlessly.

---

## Features ✨

- **Search for Tracks**: Search for any song or artist using the Spotify API.
- **Play Previews**: Play 30-second previews of tracks (if available).
- **Neatly Formatted Results**: Display track details, including album art, track name, and artist.
- **Error Handling**: Gracefully handle errors like no previews or failed API requests.
- **Responsive Design**: Works seamlessly on both Android and iOS devices.

---

## Technologies Used 🛠️

- **React Native**: For building the mobile application.
- **Expo**: For easy development and testing.
- **Spotify Web API**: For fetching music data.
- **Axios**: For making HTTP requests to the Spotify API.
- **Expo AV**: For playing audio previews.

---

## Installation 🚀

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/music-discovery-app.git
   cd music-discovery-app

2. **Install Dependencies**
npm install
Set Up Spotify API Credentials:

Create a Spotify Developer account and register a new app here.

Replace the SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in App.js with your credentials.

Run the App:

bash
Copy
npx expo start
Scan the QR code with the Expo Go app on your phone or run it in a web browser.

How It Works 🧠
User Input: The user enters a song or artist name in the search bar.

API Request: The app sends a request to the Spotify API with the search query.

Display Results: The app displays a list of tracks with album art, track name, and artist.

Play Previews: Users can play 30-second previews of tracks (if available).
