import type { Components } from "@mui/material/styles";

const MuiDivider: Components['MuiDivider'] = {
    styleOverrides: {
        root: {
            borderColor: 'white'
        }
    }
}

export default {MuiDivider} as Components;