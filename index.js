let playlist = [
  {
    id: 0,
    name: "Shape Of You",
    artist: "Ed Sheeran",
    img: "/images/shapeOfYou.jpg",
    genre: "pop",
    source: "/songs/shape-of-you.mp3",
  },
  {
    id: 1,
    name: "All Of Me",
    artist: "Adele",
    genre: "pop",
    img: "/images/allOfMe.jpeg",
    source: "/songs/all-of-me.mp3",
  },
  {
    id: 2,
    name: "Somelike Like You",
    artist: "Adele",
    genre: "pop",
    img: "/images/someoneLikeYou.jpg",
    source: "/songs/someone-like-you.mp3",
  },
  {
    id: 3,
    name: "Wonderwall",
    artist: "Oasis",
    genre: "rock",
    img: "/images/wonderwall.jpg",
    source: "/songs/wonderwall.mp3",
  },
  {
    id: 4,
    name: "Sugar",
    artist: "Maroon",
    genre: "hip-hop",
    img: "/images/sugar.jpeg",
    source: "/songs/sugar.mp3",
  },
  {
    id: 5,
    name: "Locked Away",
    artist: "R. City",
    genre: "hip-hop",
    img: "/images/lockedAway.jpg",
    source: "/songs/locked-away.mp3",
  },
];

let isLight = true;
let currentSongIndex = 0;
let allPlaylistArray = [];
let currentPlaylistIndex;

const themeCheckbox = document.getElementById("theme-checkbox");
const genreSelect = document.getElementById("genre-select");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const playButton = document.getElementById("play-button");
const cardContent = document.getElementById("card-content");
const createButton = document.getElementById("create-playlist-button");
const playlistInput = document.getElementById("playlist-input");
const allPlaylists = document.getElementById("all-playlists");
const currentPlaylist = document.getElementById("current-playlist");

renderCurrentSong();
showSongs(playlist);

themeCheckbox.addEventListener("click", () => {
  toggleTheme();
});

function toggleTheme() {
  document.documentElement.setAttribute(
    "data-theme",
    isLight ? "dark" : "light"
  );
  isLight = !isLight;
}

genreSelect.addEventListener("change", () => {
  showSongs(playlist);
});

function showSongs(playlist) {
  const allSongs = document.getElementById("all-songs");
  allSongs.innerHTML = "";
  let filteredSongs;
  if (genreSelect.value !== "") {
    filteredSongs = playlist.filter((item) => item.genre === genreSelect.value);
  } else {
    filteredSongs = playlist;
  }

  filteredSongs.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.artist}`;
    li.addEventListener("click", () => {
      currentSongIndex = item.id;
      renderCurrentSong();
    });
    allSongs.appendChild(li);
  });
}

function playSong(url) {
  const audioPlayer = document.getElementById("audioPlayer");
  const audioSource = document.getElementById("audioSource");
  audioSource.src = url;
  audioPlayer.load();
  audioPlayer.play();
}

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  renderCurrentSong();
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  renderCurrentSong();
});

function renderCurrentSong() {
  const currentSong = playlist[currentSongIndex];
  document.getElementById("song_image").src = currentSong.img;
  cardContent.querySelector("h2").textContent = currentSong.name;
  cardContent.querySelector("p").textContent = currentSong.artist;
  playSong(currentSong.source);
}

createButton.addEventListener("click", () => {
  if (playlistInput.value !== "") {
    const newPlaylist = {
      name: playlistInput.value,
      songs: [],
    };
    allPlaylistArray.push(newPlaylist);
    renderPlaylist();
  }
  playlistInput.value = "";
});

function renderPlaylist() {
  allPlaylists.innerHTML = "";
  allPlaylistArray.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name}`;
    li.addEventListener("click", () => {
      renderPlaylistSongs(item.songs);
      currentPlaylistIndex = index;
    });
    allPlaylists.appendChild(li);
  });
}

function renderPlaylistSongs(songArray) {
  currentPlaylist.innerHTML = "";
  songArray.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.artist}`;
    currentPlaylist.appendChild(li);
  });
}

function addtoPlaylist() {
  const selectedPlaylist = allPlaylistArray[currentPlaylistIndex];
  const currentSong = playlist[currentSongIndex];
  if (selectedPlaylist.songs.indexOf(currentSong) === -1) {
    selectedPlaylist.songs.push(currentSong);
  }
  renderPlaylistSongs(selectedPlaylist.songs);
}
