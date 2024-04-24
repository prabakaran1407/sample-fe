import { useState } from 'react';
// *********** Icon
import { Box, Modal } from '@mui/material';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import ImageAvatar from '../../../assets/svg/image-file.svg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export function ImageViewer(props: any) {
  const { open, setOpen, title, imageArray } = props;
  const [imgNo, setImgNo] = useState<number>(0);
  const [selectedImg, setSelectedImg] = useState(imageArray[imgNo]);


  const swipeImg = (type: string) => {
    let imgIdx = type === 'FORWARD' ? imgNo + 1 : imgNo - 1;
    if (imgIdx < imageArray?.length && imgIdx > -1) {
      setImgNo(imgIdx);
      setSelectedImg(imageArray[imgIdx]);
    }
  };

  return (
    <>
      <Modal title={title} onClose={() => setOpen(false)} open={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            bgcolor: 'background.paper',
            borderRadius: 1,
            border: '2px solid transparent',
            height: '50%',
          }}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              flexShrink: 'inherit',
              flexWrap: 'wrap',
            }}>
            <LazyLoadImage
              src={selectedImg?.url || ImageAvatar}
              style={{
                padding: 5,
                width: '60%',
                height: '80%',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                width: '100%',
                height: 'auto',
                padding: '5px',
              }}>
              <ArrowBackIosIcon
                fontSize='small'
                color='primary'
                onClick={() => swipeImg('BACKWARD')}
              />
              <Box>{`${imgNo + 1}/${imageArray?.length}`}</Box>
              <ArrowForwardIosIcon
                fontSize='small'
                color='primary'
                onClick={() => swipeImg('FORWARD')}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
