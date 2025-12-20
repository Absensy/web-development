import type { Components } from "@mui/material/styles";

const MuiAppBar: Components['MuiDivider'] = {
    styleOverrides: {
        root: {
            backgroundColor: '#FFFFFF'
        }
    }
}

export default {MuiAppBar} as Components;