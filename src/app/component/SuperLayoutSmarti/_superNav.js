import ReceiptIcon from "@mui/icons-material/Receipt";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const nav = [
  {
    name: "Dashboard",
    path: "/super/dashboard",
    icon: FormatListBulletedIcon,
  },
  {
    name: "Users",
    path: "/super/user",
    icon: FormatListBulletedIcon,
  },
  {
    name: "Pending Parser",
    path: "/super/parser",
    icon: FormatListBulletedIcon,
  },
  {
    name: "Feedback",
    path: "/super/feedback",
    icon: TrackChangesIcon,
  },
];

export { nav };
