import React from "react";
import Layout from "../../components/Layout/Layout";
import { useTheme } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading() {
    const theme = useTheme(); 
    return (
        <Layout>
            <div style={{backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23${theme.palette.primary.dark.slice(1)}' fill-opacity='1' d='M0,128L26.7,112C53.3,96,107,64,160,64C213.3,64,267,96,320,128C373.3,160,427,192,480,170.7C533.3,149,587,75,640,85.3C693.3,96,747,192,800,229.3C853.3,267,907,245,960,234.7C1013.3,224,1067,224,1120,234.7C1173.3,245,1227,267,1280,256C1333.3,245,1387,203,1413,181.3L1440,160L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,minHeight:"inherit"}} className="LoginWave">
                <div style={{margin:"auto"}}>
                <h3>Loading</h3> <CircularProgress color="primary" />
                </div>
            </div>
        </Layout>
    )
}