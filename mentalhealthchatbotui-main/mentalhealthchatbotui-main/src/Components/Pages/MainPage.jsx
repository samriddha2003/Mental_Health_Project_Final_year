import React, { Fragment, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Paper } from '@mui/material'; // Import Box and Paper from MUI

import NavBar from '../Organisms/NavBar';
import Questionnarie from '../Organisms/Questionnarie';
import DoctorDetails from '../Organisms/DoctorDetails';
import HealthReportAndSuggestions from '../Organisms/HealthReportAndSuggestions';
import ChatBot from './ChatBot';
import allStore from '../../Utils/stores/allStore';
import { doctorListApi } from '../../Utils/Services/api';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import CustomButton from '../Atoms/CustomButton';
import ReportDocument from '../Organisms/ReportDocument';


const MainPage = observer(() => {

    const { submitQuestionarrie=false, setDocorList =()=> {}, recommedations ={}} = allStore;
    const [isSelectedMentalHealth,setIselectedMentalHealth]=useState(false);
    const [isSelectedChatBoat,setIsSelectedChatBoat]=useState(false);

    const handleMentalHealthOnclick=()=>{
        doctorListApi("/doclist").then((response)=>{
            const {data} =response;
            setDocorList(data?.doctors);
        })
    setIselectedMentalHealth(true);
    setIsSelectedChatBoat(false)
      }
    
      const handleChatBotOnclick=()=>{
        setIsSelectedChatBoat(true)
        setIselectedMentalHealth(false)
      }
    return (
        <Fragment>
            <NavBar handleMentalHealthOnclick={handleMentalHealthOnclick}
                    handleChatBotOnclick={handleChatBotOnclick} />
            
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 3,
                    p: 3,
                    backgroundColor: '#f0f2f5',
                    minHeight: 'calc(100vh - 64px)', // Adjust based on your NavBar height
                }}
            >
                {/* Left Column for Questionnaire and Health Report */}
                <Box
                    sx={{
                        flex: 2, // This column takes up 2/3 of the space
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                 { isSelectedMentalHealth?
                 <>
                    <Questionnarie 
                     />
                     {submitQuestionarrie?
                     <>
                    <HealthReportAndSuggestions />
                      <PDFDownloadLink
                                        document={<ReportDocument reportContent={recommedations} />}
                                        fileName="mental-health-assessment.pdf"
                                    >
                                        {({ loading }) => (
                                            <CustomButton
                                                variant="contained"
                                                value={loading ? 'Loading document...' : 'Download PDF'}
                                                sx={{ mt: 2, alignSelf: 'flex-start' }}
                                                color='#d21972ff'
                                                disabled={loading}
                                            />
                                        )}
                                    </PDFDownloadLink>
                                    </>
                    :null}
                    </>: null}

                    {isSelectedChatBoat?
                    <ChatBot/>
                    : null
                    }

                </Box>

                {/* Right Column for Doctor Details and ChatBot */}
                { isSelectedMentalHealth?
                <Box
                    sx={{
                        flex: 1, // This column takes up 1/3 of the space
                    }}
                >
                    <DoctorDetails />
                </Box>:null}
            </Box>
        </Fragment>
    );
});

export default MainPage;