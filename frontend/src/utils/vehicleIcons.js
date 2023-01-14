import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TramIcon from '@mui/icons-material/Tram';
import SubwayIcon from '@mui/icons-material/Subway';

export function getVehicleIcon(type) {
    switch (type) {
        case 'bus':
            return <DirectionsBusIcon />
        case 'trolleybus':
            return <DirectionsBusIcon />
        case 'tram':
            return <TramIcon />
        case 'subway':
            return <SubwayIcon />
        default:
            return <></>
    }
}