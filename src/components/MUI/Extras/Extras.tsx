/* eslint-disable no-empty-pattern */
import { Divider } from '@mui/material'
import { styled } from '@mui/system'

// *************** Colors
import { ALLCOLORS } from '../../../theme/AppTheme'

export const Divider_v1 = styled(Divider)(({}) => ({
    width: '100%',
    height: "2px",
    background: ALLCOLORS.lime['900'],
    opacity: '0.2'
}))


