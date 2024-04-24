/**
 * /* eslint-disable jsx-a11y/anchor-is-valid
 *
 * @format
 */

import { useState } from 'react';
// var reactWeblibrary = require("react-weblibrary");
// import { loadGapiInsideDOM } from "gapi-script";
import { gapi } from 'gapi-script';
import AdvanceSnackbars from '../../../components/com_components/advanceSnackBar';
import { KTSVG } from '../../../pages/Admin/claim/helpers';
import { Modal } from '@mui/material';
type Props = {
  show: boolean;
  handleClose: (refreshFlag: boolean) => void;
  playStoreToken: string;
  id: any;
  devicePermission: any;
};

const PlaystoreModal: React.FC<Props> = ({
  show,
  handleClose,
  playStoreToken,
  devicePermission,
}) => {
  const [snackbarState, setSnackBar] = useState({
    open: false,
    messege: '',
    severity: 'info',
    autoHideDuriation: 2000,
  });

  return (
    <>
      <Modal
        open={show}
        onClose={() => handleClose(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        // style={{ overflow: "hidden" }}
      >
        <div className='card mb-5 mt-5 mb-xl-8 p-5 px-10'>
          <div className='modal-header py-2 d-flex  justify-content-end border-0'>
            {/* begin::Close */}
            <div
              className='btn btn-icon btn-sm btn-light-primary'
              onClick={(_e) => {
                handleClose(true);
              }}
            >
              <KTSVG
                className='svg-icon-2'
                path='/media/icons/duotune/arrows/arr061.svg'
              />
            </div>
            {/* end::Close */}
          </div>
          <div>
            {playStoreToken ? (
              <div id='container'>
                {/* <iframe
                  src={`https://play.google.com/work/embedded/search?token=WAEvp1jFehBkQAaO9Gss0qZFYFIrZVGaH6I8kK3iwsJlUnHLXEdIVRnqJ6oHxL1ViqYVQj3BBwy30AeiYShYWFP5GA40FIHUwagqBr6RmeiiYDc9HWifZqotacb2frXgVqh990uOcSXrB2hqjdJSltjcryjhZBv5BYA&mode=SELECT`}
                  style={{ width: "100%", minHeight: "60vh" }}
                /> */}

                {gapi?.load('gapi.iframes', function () {
                  // console.log("pulling from playstore", playStoreToken);

                  var options = {
                    url: `https://play.google.com/work/embedded/search?token=${playStoreToken}&mode=SELECT`,
                    where: document.getElementById('container'),
                    attributes: {
                      style: 'width: 100%; height:70vh',
                      scrolling: 'yes',
                    },
                  };
                  try {
                    let iframe = gapi.iframes.getContext().openChild(options);
                    iframe.register(
                      'onproductselect',
                      (event: any) => {
                        devicePermission('packageName', event.packageName);
                        handleClose(true);
                      },
                      gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
                    );
                  } catch (error) {
                    console.log('');
                  }
                })}
              </div>
            ) : (
              <div>Loading....</div>
            )}
          </div>
        </div>
      </Modal>
      <AdvanceSnackbars
        open={snackbarState.open}
        severity={snackbarState.severity}
        messege={snackbarState.messege}
        autoHideDuration={snackbarState.autoHideDuriation}
        handleClose={() => {
          setSnackBar((prev) => ({
            ...prev,
            open: false,
            messege: '',
            severity: '',
          }));
        }}
      />
    </>
  );
};

export { PlaystoreModal };
