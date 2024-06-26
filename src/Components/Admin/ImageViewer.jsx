import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const photos = [
    { src: 'https://res.cloudinary.com/def8v05xk/image/upload/v1683829803/mxesl1c9tfjovw0fh6xe.jpg', width: 4, height: 3 },
    { src: 'https://res.cloudinary.com/def8v05xk/image/upload/v1683829803/mxesl1c9tfjovw0fh6xe.jpg', width: 1, height: 1 },
    { src: 'https://res.cloudinary.com/def8v05xk/image/upload/v1683829803/mxesl1c9tfjovw0fh6xe.jpg', width: 3, height: 4 },
  ];
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
function ImageViewer() {
    const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  const classes = useStyles();
  return (
    <>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(photo => ({
                ...photo,
                srcset: photo.srcSet,
                caption: photo.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  )
}

export default ImageViewer
