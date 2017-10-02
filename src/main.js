import styles from "./styles/main.css"
import backgroundMusic from "./assets/sound/pallet-town.mp3"
import Scene from "./js/Scene"
import React from 'react'
import ReactDOM from 'react-dom'
import UserInterface from "./js/components/UserInterface"

// scene
const scene = new Scene(false, false)

// UI
ReactDOM.render(<UserInterface />, document.querySelector("#ui"));

// music
const music = new Audio(backgroundMusic)
music.loop = true
music.play()

console.log(process.env.NODE_ENV);