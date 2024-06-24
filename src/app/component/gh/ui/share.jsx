import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import ShareIcon from "@mui/icons-material/Share";
import ReactDOMServer from "react-dom/server";
import Drawer from "@mui/material/Drawer";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Context from "@context/app";

import {
  // EmailShareButton,
  // HatenaShareButton,
  // InstapaperShareButton,
  // LineShareButton,
  // LinkedinShareButton,
  // LivejournalShareButton,
  // MailruShareButton,
  // OKShareButton,
  // PinterestShareButton,
  // PocketShareButton,
  // RedditShareButton,
  // TelegramShareButton,
  // TumblrShareButton,
  // ViberShareButton,
  // VKShareButton,
  // WorkplaceShareButton,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

export default function App(props) {
  const [isOpen, setisOpen] = useState();
  return (
    <UI.Stack>
      <UI.Button
        variant="text"
        onClick={() => setisOpen(1)}
        sx={{
          fontSize: 10,
        }}
        endIcon={
          <ShareIcon
            sx={{
              color: "primary.main",
              fontSize: 22,
              fontWeight: "bold",
            }}
          />
        }
      >
        Share
      </UI.Button>
      <Drawer anchor={"bottom"} open={isOpen} onClose={() => setisOpen(false)}>
        <Share />
      </Drawer>
    </UI.Stack>
  );
}

function Share({ url = window.location.href, title = "compoundcoffe.com" }) {
  const { setapp } = React.useContext(Context);
  const [muiIconContent, setMuiIconContent] = React.useState();

  useEffect(() => {
    const iconSvg = ReactDOMServer.renderToStaticMarkup(<InsertLinkIcon />);
    const svgIconWithXlmns = iconSvg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
    const resultUrl = "url('data:image/svg+xml," + svgIconWithXlmns + "')";
    setMuiIconContent(resultUrl);
  }, []);

  function copyClipboard(params) {
    navigator.clipboard.writeText(url);
    setapp("callback", { type: "success", message: "link copied !" });
  }

  return (
    <UI.Col minHeight={"30vh"} center>
      <UI.Col
        spacing={3}
        maxWidth={500}
        width="100%"
        p={2}
        sx={{
          "div[class*=container]": {
            display: "flex",
            flexGrow: 1,
            width: "100%",
            padding: 0,
          },
          "div[class*=makeStyles-iconContainer]": {
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          },
          "div[class*=copyUrl]": {
            color: "black",
            display: "flex",
            alignItems: "center",

            "&::before": {
              content: muiIconContent,
              width: 24,
              display: "block",
              marginRight: 1,
              paddingTop: 1,
            },
          },
          "div[class*=copyContainer]": {
            display: "none",
            width: 0,
            background: "unset",
            padding: "4px 16px",
            border: "1px solid grey",
            borderRadius: 2,
          },
          "div[class*=copyIcon]": {
            color: "black",
          },
        }}
      >
        <UI.Text variant="h4" bold color="primary">
          Share this information.
        </UI.Text>
        <UI.Row justifyContent="space-between">
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <WhatsappShareButton url={url} title={title} separator=":: ">
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <UI.IconButton
            sx={{
              width: 40,
              height: 40,
              bgcolor: "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
            onClick={copyClipboard}
          >
            <InsertLinkIcon />
          </UI.IconButton>
        </UI.Row>
      </UI.Col>
    </UI.Col>
  );
}
