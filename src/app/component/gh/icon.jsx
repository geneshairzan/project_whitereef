import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ShareIcon from "@mui/icons-material/Share";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ImageIcon from "@mui/icons-material/Image";
import HomeIcon from "@mui/icons-material/Home";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
function IconRender(props) {
  return <img src={props.path} style={{ width: 18, height: 18, ...props.sx }} />;
}

const icon = {
  Google: (props) => <IconRender path={"/assets/img/app/google.svg"} {...props} />,
  Plus: AddCircleIcon,
  Back: ArrowBackIcon,
  Close: CloseIcon,
  Check: CheckCircleOutlineIcon,
  Share: ShareIcon,
  Cloud: CloudQueueIcon,
  Person: PersonIcon,
  Cart: ShoppingCartIcon,
  Logout: LogoutIcon,
  Menu: MenuIcon,
  Refresh: RefreshIcon,
  Qrcode: QrCodeIcon,
  Qrscan: QrCodeScannerIcon,
  Img: ImageIcon,
  Home: HomeIcon,
  Open: OpenInNewIcon,
  Edit: EditIcon,
  View: VisibilityIcon,
  Light: WbSunnyIcon,
  Power: PowerSettingsNewIcon,
  ArrowRight: ArrowForwardIcon,
  More: MoreVertIcon,
  MoreH: MoreHorizIcon,
  Filter: FilterListIcon,
  Send: SendIcon,
  Loader: (props) => <CircularProgress size={20} {...props} />,
};

export default icon;
