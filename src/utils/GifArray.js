import coleman from '../assets/coleman.gif'
import schwarzenegger from '../assets/schwarzenegger.gif'



const images = [
    coleman, schwarzenegger
];


export const getRandomMemeGif = () => {
    const max = images.length
    const min = 0
    const random = Math.floor(Math.random() * (max - min) + min)

    console.log("RANDOM NUMBER IS: ", random)

    return images[random]
}