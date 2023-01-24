import Box from '@mui/material/Box';
import { IForm } from '../../types/types';
import { FC } from "react";

const FormBody: FC<IForm> = ({ children, onSubmit }) => {

    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                width: "355px",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                padding: "20px",
                margin: "50px 0",
                flexWrap: "wrap",
                borderRadius: "10px",
                boxShadow: "0 0 20px rgba(108, 94, 57, 0.6),0 0 30px rgba(108, 94, 57, 0.6)",
                boxSizing: "border-box",
                minHeight: "120px",
                bgcolor: '#B4C7E7',
                position: "relative"
            }}
            onSubmit={onSubmit}
            autoComplete="off"
        >
            {children}
        </Box >
    )
}

export default FormBody;