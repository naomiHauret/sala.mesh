import styles from "./styles/main.css"
import backgroundMusic from "./assets/sound/pallet-town.mp3"
import Scene from './js/Scene'

// scene
const scene = new Scene(false, false)

// music
const music = new Audio(backgroundMusic)
music.loop = true
music.play()

console.log(process.env.NODE_ENV);