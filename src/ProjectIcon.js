import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import ExtensionIcon from '@mui/icons-material/Extension';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import BuildIcon from '@mui/icons-material/Build';
import CloudIcon from '@mui/icons-material/Cloud';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ForestIcon from '@mui/icons-material/Forest';
import FortIcon from '@mui/icons-material/Fort';
import HubIcon from '@mui/icons-material/Hub';
import MosqueIcon from '@mui/icons-material/Mosque';
import PestControlIcon from '@mui/icons-material/PestControl';
import PixIcon from '@mui/icons-material/Pix';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import SatelliteIcon from '@mui/icons-material/Satellite';
import ScaleIcon from '@mui/icons-material/Scale';
import SpaIcon from '@mui/icons-material/Spa';
import SynagogueIcon from '@mui/icons-material/Synagogue';
import TelegramIcon from '@mui/icons-material/Telegram';
import TerrainIcon from '@mui/icons-material/Terrain';
import WebhookIcon from '@mui/icons-material/Webhook';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import YardIcon from '@mui/icons-material/Yard';

export default function ProjectIcon({ icon=0, color, size='32px' }){
  const myColors = {
    blue: 'primary',
    purple: 'secondary',
    green: 'success',
    orange: 'warning',
    red: 'error'
  };
  color = myColors[color];
  if(icon === 0) return <StarIcon color={color} style={{fontSize: size}} />
  if(icon === 1) return <FavoriteIcon color={color} style={{fontSize: size}} />
  if(icon === 2) return <ShapeLineIcon color={color} style={{fontSize: size}} />
  if(icon === 3) return <ExtensionIcon color={color} style={{fontSize: size}} />
  if(icon === 4) return <BeachAccessIcon color={color} style={{fontSize: size}} />
  if(icon === 5) return <BedtimeIcon color={color} style={{fontSize: size}} />
  if(icon === 6) return <BuildIcon color={color} style={{fontSize: size}} />
  if(icon === 7) return <CloudIcon color={color} style={{fontSize: size}} />
  if(icon === 8) return <FilterAltIcon color={color} style={{fontSize: size}} />
  if(icon === 9) return <FlashOnIcon color={color} style={{fontSize: size}} />
  if(icon === 10) return <ForestIcon color={color} style={{fontSize: size}} />
  if(icon === 11) return <FortIcon color={color} style={{fontSize: size}} />
  if(icon === 12) return <HubIcon color={color} style={{fontSize: size}} />
  if(icon === 13) return <MosqueIcon color={color} style={{fontSize: size}} />
  if(icon === 14) return <PestControlIcon color={color} style={{fontSize: size}} />
  if(icon === 15) return <PixIcon color={color} style={{fontSize: size}} />
  if(icon === 16) return <RocketLaunchIcon color={color} style={{fontSize: size}} />
  if(icon === 17) return <SatelliteAltIcon color={color} style={{fontSize: size}} />
  if(icon === 18) return <SatelliteIcon color={color} style={{fontSize: size}} />
  if(icon === 19) return <ScaleIcon color={color} style={{fontSize: size}} />
  if(icon === 20) return <SpaIcon color={color} style={{fontSize: size}} />
  if(icon === 21) return <SynagogueIcon color={color} style={{fontSize: size}} />
  if(icon === 22) return <TelegramIcon color={color} style={{fontSize: size}} />
  if(icon === 23) return <TerrainIcon color={color} style={{fontSize: size}} />
  if(icon === 24) return <WebhookIcon color={color} style={{fontSize: size}} />
  if(icon === 25) return <WhatshotIcon color={color} style={{fontSize: size}} />
  if(icon === 26) return <WorkspacesIcon color={color} style={{fontSize: size}} />
  if(icon === 27) return <YardIcon color={color} style={{fontSize: size}} />
  return <StarIcon color={color} style={{fontSize: size}} />
}