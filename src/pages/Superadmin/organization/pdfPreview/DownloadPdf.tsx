import { PDFDownloadLink } from '@react-pdf/renderer';
import { MyDocument } from './Document';
import { COLORS } from '../../../../utils/globals';

function DownloadPdf(props: any) {
  const { data, totalCost } = props;
  return (
    <div>
      <PDFDownloadLink
        document={<MyDocument data={data} totalCost={totalCost} />}
        fileName='proforma.pdf'
        style={{
          background: COLORS.primary,
          color: '#FFFFFF',
          textDecorationLine: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '20%',
          height: 38,
          borderRadius: '8px',
          fontSize: 14,
        }}>
        {({ loading }) => (loading ? 'Loading...' : 'Download')}
      </PDFDownloadLink>
    </div>
  );
}

export default DownloadPdf;
