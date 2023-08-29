import React from 'react'
import { Typography, Grid, Box } from "@mui/material";
import iconBP from "../../assets/IC.svg"
import graphBlue from "../../assets/graph-blue.svg"
import iconHeart from "../../assets/icon-heart.svg"
import graphRed from "../../assets/graph-red.svg"
import iconBMI from "../../assets/icon-bmi.svg"
import graphDarkGreen from "../../assets/graph-dark-green.svg"
import iconHeight from "../../assets/icon-heart.svg"
import graphGreen from "../../assets/graph-green.svg"
import iconWeight from "../../assets/icon-weight.svg"
import graphPurple from "../../assets/graph-purple.svg"
type props = {
    chartData?: any
 }
 
const CharComponent = ({ chartData } : props) => {
    return (
        <Grid container spacing={3} marginTop={"40px"}>
            <Grid item sx={{width :"20%"}}>
                <Box sx={{ background: "#E4F4FB", borderRadius: "10px" }} >
                    <Box sx={{ padding: "20px" }}>
                        <img src={iconBP} alt="img" style={{ marginBottom: "20px" }} />
                        <Typography variant="body1" color="common.black" sx={{ marginBottom: "12px" }}>
                        Blood Pressure
                        </Typography>
                        <Typography variant="h2" color="common.black" sx={{ color: "#60dbff", fontSize: "24px", fontWeight: "500" }}>
                        {chartData?.bloodPressure.mm}/{chartData?.bloodPressure.hg}
                            <Typography variant="body2" component="span" color="text.secondary"> mm/HG</Typography>
                        </Typography>
                    </Box>
                    <img src={graphBlue} alt="img" />
                </Box>
            </Grid>
            <Grid item sx={{width :"20%"}}>
                <Box sx={{ background: "#FFF2EF", borderRadius: "10px" }} >
                    <Box sx={{ padding: "20px" }}>
                        <img src={iconHeart} alt="img" style={{ marginBottom: "20px" }} />
                        <Typography variant="body1" color="common.black" sx={{ marginBottom: "12px" }}>
                        Heart Rate
                        </Typography>
                        <Typography variant="h2" color="common.black" sx={{ color: "#C53E4E", fontSize: "24px", fontWeight: "500" }}>
                        {chartData?.heartRate} 
                            <Typography variant="body2" component="span" color="text.secondary"> Beats/Minute</Typography>
                        </Typography>
                    </Box>
                    <img src={graphRed} alt="img" />
                </Box>
            </Grid>
            <Grid item sx={{width :"20%"}}>
                <Box sx={{ background: "#E4FAFA", borderRadius: "10px" }} >
                    <Box sx={{ padding: "20px" }}>
                        <img src={iconBMI} alt="img" style={{ marginBottom: "20px" }} />
                        <Typography variant="body1" color="common.black" sx={{ marginBottom: "12px" }}>
                        BMI
                        </Typography>
                        <Typography variant="h2" color="common.black" sx={{ color: "#5A8181", fontSize: "24px", fontWeight: "500" }}>
                        {chartData?.bmi}
                            <Typography variant="body2" component="span" color="text.secondary"> mm/HG</Typography>
                        </Typography>
                    </Box>
                    <img src={graphDarkGreen} alt="img" />
                </Box>
            </Grid>
            <Grid item sx={{width :"20%"}}>
                <Box sx={{ background: "#E6FDEF", borderRadius: "10px" }} >
                    <Box sx={{ padding: "20px" }}>
                        <img src={iconHeight} alt="img" style={{ marginBottom: "20px" }} />
                        <Typography variant="body1" color="common.black" sx={{ marginBottom: "12px" }}>
                        Height
                        </Typography>
                        <Typography variant="h2" color="common.black" sx={{ color: "#64E499", fontSize: "24px", fontWeight: "500" }}>
                        {chartData?.height?.value}
                            <Typography variant="body2" component="span" color="text.secondary">{chartData?.height?.measureType}</Typography>
                        </Typography>
                    </Box>
                    <img src={graphGreen} alt="img" />
                </Box>
            </Grid>
            <Grid item sx={{width :"20%"}}>
                <Box sx={{ background: "#FAEBFF", borderRadius: "10px" }} >
                    <Box sx={{ padding: "20px" }}>
                        <img src={iconWeight} alt="img" style={{ marginBottom: "20px" }} />
                        <Typography variant="body1" color="common.black" sx={{ marginBottom: "12px" }}>
                        Weight
                        </Typography>
                        <Typography variant="h2" color="common.black" sx={{ color: "#8735A5", fontSize: "24px", fontWeight: "500" }}>
                        {chartData?.weight.value}
                            <Typography variant="body2" component="span" color="text.secondary">{chartData?.weight.measureType}</Typography>
                            
                        </Typography>
                    </Box>
                    <img src={graphPurple} alt="img" />
                </Box>
            </Grid>
        </Grid>
    )
}

export default CharComponent