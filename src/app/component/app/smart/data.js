import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoModeIcon from "@mui/icons-material/AutoMode";
export const pages = [
  {
    label: "Home",
    Icon: HomeIcon,
  },

  {
    label: "Notes",
    Icon: DescriptionIcon,
  },
  {
    label: "Map",
    Icon: MapIcon,
  },
  {
    label: "Automation",
    Icon: AutoModeIcon,
  },
];

export const rooms = [
  {
    id: 1,
    label: "Living Room",
    img: "demo-living-room.jpg",
    devices: [
      { id: 1, state: "on", type: "switch", name: "Main Light", type_id: 1 },
      { id: 2, state: "off", type: "switch", name: "Ambiance Light", type_id: 1 },
      { id: 6, state: "off", type: "switch", name: "linked switch 1", roomLinked: true, type_id: 1 },
      { id: 7, state: "on", type: "switch", name: "linked switch 2", roomLinked: true, type_id: 1 },
      { id: 3, state: "on", type: "switch", name: "Floor Light", type_id: 1 },
      { id: 4, state: "off", type: "switch", name: "Bathroom Light", type_id: 1 },
      { id: 5, state: "on", type: "switch", name: "Some long text named device", type_id: 1 },
      { id: 8, state: "off", type: "switch" },
    ],
  },
  {
    id: 2,
    label: "Bed Room",
    img: "demo-bed-room.jpg",
  },
  {
    id: 3,
    label: "Kitchen",
    img: "demo-kitchen.jpg",
  },
  {
    id: 4,
    label: "Kitchen",
    img: "demo-kitchen.jpg",
  },
  {
    id: 5,
    label: "Kitchen",
    img: "demo-kitchen.jpg",
  },
];

export const glass = {
  // background: "rgba(255, 255, 255, 0.2)",
  background: "rgba(40, 40, 40, 0.6)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
};

export const grad = {
  background: "rgb(17,7,5)",
  background: "linear-gradient(0deg, rgba(17,7,5,1) 0%,rgba(62,44,36,1) 70%, rgba(62,44,36,1) 100%)",
};
