import styles from "./styles/main.css"
import Scene from "./js/Scene"
import backgroundMusic from "./assets/sound/pallet-town.mp3"
import UserInterface from "./js/UserInterface"

// scene
const scene = new Scene(false, false)
const UI = new UserInterface(backgroundMusic)
