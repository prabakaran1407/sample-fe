import { Modal, Box } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import { MyDocument } from './Document';

function PreviewPdf({ openPdf, handleClosePdf, data, totalCost, values }: any) {
  return (
    <div>
      <Modal
        open={openPdf}
        onClose={() => {
          handleClosePdf && handleClosePdf();
        }}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            bgcolor: 'background.paper',
            borderRadius: 1,
            border: '2px solid transparent',
          }}>
          <PDFViewer width='100%' height='500px'>
            <MyDocument
              data={data}
              totalCost={totalCost ? totalCost : 0}
              values={values}
            />
          </PDFViewer>
        </Box>
      </Modal>
    </div>
  );
}

export default PreviewPdf;
