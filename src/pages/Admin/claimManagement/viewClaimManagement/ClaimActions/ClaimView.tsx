/** @format */

import Typography from '@mui/material/Typography';

// ************** util
import { formatedDate } from '../../../../../utils/datetime';

const itemDiv = {
  display: 'flex',
  width: '100%',
  alignItems: 'start',
};

export default function ClaimView({ selectedRow, seletSelectedOption }: any) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'start',
        flexDirection: 'column',
        // justifyContent: "center",
        rowGap: '15px',
      }}>
      <div style={itemDiv}>
        <div style={{ ...itemDiv, width: '30%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: '600' }}>User</Typography>
        </div>
        <div style={{ ...itemDiv, width: '70%' }}>
          <Typography sx={{ fontSize: 14 }}>
            :&nbsp;{' '}
            {`${selectedRow?.user?.firstName} ${selectedRow?.user?.lastName}`}
          </Typography>
        </div>
      </div>
      <div style={itemDiv}>
        <div style={{ ...itemDiv, width: '30%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
            Applied Date
          </Typography>
        </div>
        <div style={{ ...itemDiv, width: '70%' }}>
          <Typography sx={{ fontSize: 14 }}>
            :&nbsp; {formatedDate(selectedRow?.createdAt, 'DD-MM-YYYY') || '--'}
          </Typography>
        </div>
      </div>
      <div style={itemDiv}>
        <div style={{ ...itemDiv, width: '30%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
            Claim type
          </Typography>
        </div>
        <div style={{ ...itemDiv, width: '70%' }}>
          <Typography sx={{ fontSize: 14 }}>
            :&nbsp; {selectedRow?.claimType?.typeOfClaim || '--'}
          </Typography>
        </div>
      </div>

      <div style={itemDiv}>
        <div style={{ ...itemDiv, width: '30%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
            Claim Mode
          </Typography>
        </div>
        <div style={{ ...itemDiv, width: '70%' }}>
          <Typography sx={{ fontSize: 14 }}>
            :&nbsp;{' '}
            {(selectedRow?.jointClaimed ? 'Join Claim' : 'Single Claim') ||
              '--'}
          </Typography>
        </div>
      </div>

      <div style={itemDiv}>
        <div style={{ ...itemDiv, width: '30%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
            Planned Expenses
          </Typography>
        </div>
        <div style={{ ...itemDiv, width: '70%' }}>
          <Typography sx={{ fontSize: 14 }}>
            :&nbsp;{' '}
            {selectedRow?.plannedAmount != undefined
              ? `₹ ${selectedRow?.plannedAmount}`
              : '--'}
          </Typography>
        </div>
      </div>

      <div style={itemDiv}>
        <div style={{ ...itemDiv, width: '30%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
            Total Expenses
          </Typography>
        </div>
        <div style={{ ...itemDiv, width: '70%' }}>
          <Typography sx={{ fontSize: 14 }}>
            :&nbsp;{' '}
            {selectedRow?.totalExpenses != undefined
              ? `₹ ${selectedRow?.totalExpenses}`
              : '--'}
          </Typography>
        </div>
      </div>
      <div style={itemDiv}>
        <div style={{ ...itemDiv, width: '30%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
            Claim Amount
          </Typography>
        </div>
        <div style={{ ...itemDiv, width: '70%' }}>
          <Typography sx={{ fontSize: 14 }}>
            :&nbsp; {selectedRow?.totalExpenses ? selectedRow?.totalExpenses : '--'}
          </Typography>
        </div>
      </div>
     
      <div style={itemDiv}>
        <div style={{ ...itemDiv, width: '30%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
            Approved Amount
          </Typography>
        </div>
        <div style={{ ...itemDiv, width: '70%' }}>
          <Typography sx={{ fontSize: 14 }}>
            :&nbsp;{' '}
            {selectedRow?.approvedAmount != undefined
              ? selectedRow?.approvedAmount
              : '--'}
          </Typography>
        </div>
      </div>

      <div style={itemDiv}>
        <div style={{ ...itemDiv, width: '30%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
            Approver Notes
          </Typography>
        </div>
        <div style={{ ...itemDiv, width: '70%' }}>
          <Typography sx={{ fontSize: 14 }}>
            :&nbsp;{' '}
            {selectedRow?.approverNotes != undefined
              ? selectedRow?.approverNotes
              : '--'}
          </Typography>
        </div>
      </div>
      {
        seletSelectedOption?.reviewed && (
          <>
            <div style={itemDiv}>
              <div style={{ ...itemDiv, width: '30%' }}>
                <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
                  Reviewed Amount
                </Typography>
              </div>

              <div style={{ ...itemDiv, width: '70%' }}>
                <Typography sx={{ fontSize: 14 }}>
                  :&nbsp;{' '}
                  {selectedRow?.reviewedAmount != undefined
                    ? selectedRow?.reviewedAmount
                    : '--'}
                </Typography>
              </div>
            </div>
            <div style={itemDiv}>
              <div style={{ ...itemDiv, width: '30%' }}>
                <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
                  Reviewed Notes
                </Typography>
              </div>

              <div style={{ ...itemDiv, width: '70%' }}>
                <Typography sx={{ fontSize: 14 }}>
                  :&nbsp;{' '}
                  {selectedRow?.reviewerNotes != undefined
                    ? selectedRow?.reviewerNotes
                    : '--'}
                </Typography>
              </div>
            </div>
          </>
        )
      }
      {
        seletSelectedOption?.rejected && (
          <div style={itemDiv}>
            <div style={{ ...itemDiv, width: '30%' }}>
              <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
                Rejected Notes
              </Typography>
            </div>
            <div style={{ ...itemDiv, width: '70%' }}>
              <Typography sx={{ fontSize: 14 }}>
                :&nbsp;{' '}
                {selectedRow?.rejectedNotes != undefined
                  ? selectedRow?.rejectedNotes
                  : '--'}
              </Typography>
            </div>
          </div>
        )
      }
      {
        seletSelectedOption?.paid && (
          <div style={itemDiv}>
        <div style={{ ...itemDiv, width: '30%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
              Paid Amount
          </Typography>
        </div>
        <div style={{ ...itemDiv, width: '70%' }}>
          <Typography sx={{ fontSize: 14 }}>
            :&nbsp;{' '}
            {selectedRow?.paidAmount != undefined
              ? selectedRow?.paidAmount
              : '--'}
          </Typography>
        </div>
      </div>
        )
      }  
       <div style={itemDiv}>
        <div style={{ ...itemDiv, width: '30%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
            Description
          </Typography>
        </div>
        <div style={{ ...itemDiv, width: '70%' }}>
          <Typography sx={{ fontSize: 14 }}>
            :&nbsp; {selectedRow?.notes ? selectedRow?.notes : '--'}
          </Typography>
        </div>
      </div>        
    </div>
  );
}
