import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Box, Modal, Button, Container } from "@mui/material";
import { getCroppedImg, readFile } from "./utils";
import NoImg from "./noimg.jpg";

export default function App(props) {
  const [imageSrc, setImageSrc] = useState();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(props.defImg ? props.defImg : NoImg);
  const [modalOpen, setModalOpen] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    // --FINALEreturn
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
      props.onImgCroped(croppedImage);
      setModalOpen(false);
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc, croppedAreaPixels]);

  const onFileChange = async (e) => {
    setCroppedImage(null);
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
    <div className="flex-col">
      {/* //--INPUT */}
      <div className={props.isHidden ? "dnone" : ""}>
        <input type="file" onChange={onFileChange} accept="image/*" ref={props.isClicked} />
      </div>

      {/* //-- OUTPUT */}

      <Container component="main" maxWidth="sm">
        <Box width="100%" className={props.hiddenResult ? "dnone" : ""}>
          {croppedImage !== NoImg && (
            <img src={croppedImage} alt="noimg" onClick={() => props.isClicked.current.click()} className="w100" />
          )}
        </Box>
      </Container>

      {/* //-- CROPER IN MODAL */}
      <Modal open={modalOpen}>
        <Box width="100%" height="100dvh" className="center flex-col bg-grey">
          <Box width="90vw" height="calc(90vw / 16 * 9 )" className="">
            <Box width="100%" height="100%" className="pos-rel ">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                cropShape="round"
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </Box>
          </Box>
          <Button onClick={showCroppedImage} variant="contained" className="reset mt-2">
            Crop
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
