import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Box, Modal, Button, Container, Stack, Typography, IconButton } from "@mui/material";
import { getCroppedImg, readFile } from "./utils";
import NoImg from "./noimg.svg";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

export default function App({ result, isHiddenIOutput }) {
  const inputRef = React.useRef(null);

  const [imageSrc, setImageSrc] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [croppedImage, setCroppedImage] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    // --FINALEreturn
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
      result(croppedImage);
      setModalOpen(false);
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc, croppedAreaPixels]);

  const onFileChange = async (e) => {
    await setCroppedImage(null);
    if (e.target.files && e.target.files.length > 0) {
      // --GET FROM INPUT return
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
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
            <ChangeCircleIcon />
          </IconButton>
        </Stack>
      )}
      {!croppedImage && (
        <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => inputRef.current.click()}>
          Add img
        </Button>
      )}

      {/* //-- CROPER IN MODAL */}
      <Modal open={modalOpen}>
        <Stack width="100vw" height="100dvh" className="center" position="relative" bgcolor={"#000000"}>
          <Box width="calc(100vw - 24px)" position="relative" height="56.25vw">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={16 / 9}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              objectFit="horizontal-cover"
            />
          </Box>

          <Stack position={"absolute"} bottom="10vh" width={"100%"} px={2}>
            <Button onClick={showCroppedImage} variant="contained" fullWidth>
              Crop
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
}
