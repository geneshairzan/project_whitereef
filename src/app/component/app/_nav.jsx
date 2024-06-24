import ReceiptIcon from "@mui/icons-material/Receipt";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const nav = [
  // {
  //   name: "Dashboard",
  //   path: "/dashboard",
  // },

  {
    name: "Transaction",
    path: "/transaction",
    icon: FormatListBulletedIcon,
  },
  {
    name: "Budget",
    path: "/budget",
    icon: TrackChangesIcon,
  },
  {
    name: "Category",
    path: "/category",
    icon: CategoryIcon,
  },
  {
    name: "Assets",
    path: "/asset",
    icon: InventoryIcon,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: AccountCircleIcon,
  },
];

const extra = [
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Terms & Condition",
    path: "/tnc",
  },
  {
    name: "Privacy & Policy",
    path: "/privacypolicy",
  },
];

export { nav, extra };
