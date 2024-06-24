import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Box, Modal, Button, Stack, IconButton } from "@mui/material";
import { getCroppedImg, readFile } from "./utils";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

export default function App({ result, btnText, refimg }) {
  const inputRef = React.useRef(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(refimg);
  const [modalOpen, setModalOpen] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  async function showCroppedImage(params) {
    try {
      const buffer = await getCroppedImg(croppedImage, croppedAreaPixels);
      setCroppedImage(buffer.path);
      result(buffer.file);
      setModalOpen(false);
    } catch (e) {
      setModalOpen(false);
    }
  }

  const onFileChange = async (e) => {
    await setCroppedImage(null);
    if (e.target.files && e.target.files.length > 0) {
      // --GET FROM INPUT return
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setCroppedImage(imageDataUrl);
      setModalOpen(true);
    }
    e.target.value = null;
  };

  return (
    <Stack>
      <Stack display={"none"}>
        <input type="file" onChange={onFileChange} accept="image/*" ref={inputRef} />
      </Stack>

      {/* //-- OUTPUT RENDER*/}
      {croppedImage && (
        <Stack width="100%" maxWidth={300} position="relative">
          {croppedImage && <img src={croppedImage} className="img-contain" />}
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            color="primary"
            onClick={() => inputRef.current.click()}
          >
            <RotateLeftIcon color="secondary" />
          </IconButton>
        </Stack>
      )}
      {!croppedImage && (
        <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={() => inputRef.current.click()}>
          {btnText || "Add img"}
        </Button>
      )}

      {/* //-- CROPER IN MODAL */}
      <Modal open={modalOpen}>
        <Stack
          width="100vw"
          height="100dvh"
          position="relative"
          alignItems={"center"}
          justifyContent={"center"}
          bgcolor={"#000000"}
        >
          <Box width="100%" position="relative" height="100dvh" maxWidth={1280}>
            <Cropper
              zoomSpeed={0.1}
              minZoom={0.5}
              restrictPosition={false}
              image={croppedImage}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              objectFit="contain"
              style={{
                backgroundColor: "none",
              }}
            />
            <Stack position={"absolute"} direction={"row"} spacing={2} bottom="10vh" width={"100%"} px={2}>
              <Button onClick={() => setModalOpen(false)} variant="outlined" fullWidth color="error">
                Cancel
              </Button>
              <Button onClick={showCroppedImage} variant="contained" fullWidth>
                Crop
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Modal>
    </Stack>
  );
}
