import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import logo from '../../../../../src/assets/png/logo.png';
import { dateDiff } from '../../../../utils/datetime';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  section: {
    flexGrow: 1,
  },
  table: {
    marginTop: 20,
    border: 1,
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: 1,
    borderColor: '#000',
    backgroundColor: '#C0C0C0',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    padding: 5,
    textAlign: 'center',
    borderRight: 1,
  },
});

export const MyDocument = (props: any) => {
  const { data, totalCost, values } = props;

  const daysCount = dateDiff(values?.startDate, values?.endDate);

  function calculateCost(cost: any, noOfUser: any) {
    const totalCost =
      parseFloat(cost || 0) * daysCount * parseInt(noOfUser || 1);
    return totalCost;
  }

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.section}>
            <Image style={{ width: '40%' }} src={logo} />
          </View>
          <View>
            <Text>PROFORMA INVOICE</Text>
            <View
              style={{
                display: 'flex',
                marginTop: 10,
                alignItems: 'flex-end',
              }}>
              <Text style={{ fontSize: 12, marginTop: 3 }}>
                KPR Info Solutions
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3 }}>
                1020, 2nd floor, Avinashi Rd
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3 }}>
                Near Nehru Stadium
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3 }}>
                Police Quarters, Gopalapuram
              </Text>
              <Text style={{ fontSize: 12, marginTop: 3 }}>
                Coimbatore, Tamil Nadu 641018
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                marginTop: 10,
                alignItems: 'flex-end',
              }}>
              <Text style={{ fontSize: 12 }}>+91 95661 78883</Text>
              <Text style={{ fontSize: 12, marginTop: 3 }}>
                sales@kprinfo.com
              </Text>
            </View>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Modules</Text>
            <Text style={styles.tableCell}>User Access</Text>
            <Text style={styles.tableCell}>Price</Text>
            <Text style={styles.tableCell}>Total</Text>
          </View>
          {/* Add more rows as needed */}
          {data?.map((rowData: any) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>
                {rowData?.parentModule?.details?.moduleName}
              </Text>
              <Text style={styles.tableCell}>{rowData?.cost}</Text>
              <Text style={styles.tableCell}>{rowData?.numberOfUser}</Text>
              <Text style={styles.tableCell}>
                {calculateCost(rowData?.cost, rowData?.numberOfUser)}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            padding: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            border: 1,
          }}>
          <Text style={{ fontSize: 14 }}>Total Cost</Text>
          <Text style={{ fontSize: 14, paddingRight: 45 }}>
            {totalCost.toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
