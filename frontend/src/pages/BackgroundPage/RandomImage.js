//Background images
import busImage from './bg-img/bus.jpg';
import subwayImage from './bg-img/subway.jpg';
import tramImage from './bg-img/tram.jpg';


export default function getRandomImage() {
    const images = [busImage, subwayImage, tramImage];
    const randomIndex = Math.floor(Math.random() * images.length);

    return images[randomIndex];
}