import React, { Fragment, useState } from 'react';
import { observer } from 'mobx-react-lite';
import CustomBox from '../Atoms/CustomBox';
import CustomButton from '../Atoms/CustomButton';
import GroupedRadioButton from '../Molecules/GroupedRadioButton';
import allStore from '../../Utils/stores/allStore';
import { Box, Paper } from '@mui/material';
import { questionarrieApi } from '../../Utils/Services/api';

const Questionnarie = observer(() => {
    const questionsList = [
        "How often do you feel sad or hopeless?",
        "Do you frequently feel anxious or overwhelmed?",
        "Have you lost interest in activities you used to enjoy?",
        "Do you experience frequent mood swings or irritability?",
        "Do you feel excessive guilt or worthlessness?",
        "Do you have trouble falling or staying asleep?",
        "Do you sleep too much or too little?",
        "Do you wake up feeling tired even after a full night’s sleep?",
        "Do you have difficulty focusing or making decisions?",
        "Do you frequently forget things or struggle to complete tasks?",
        "Do you experience intrusive or repetitive negative thoughts?",
        "Do you feel exhausted most of the time, even without physical exertion?",
        "Have you noticed a significant change in your motivation levels?",
        "Do you avoid social interactions or feel isolated?",
        "Have your relationships with family and friends deteriorated?",
        "Do you feel disconnected from people around you?",
        "How well do you handle stress in daily life?",
        "Do you resort to unhealthy coping mechanisms (substance use, self-harm, etc.)?",
        "Have you ever thought about harming yourself or ending your life?",
        "Do you feel like life is not worth living?",
    ];

    const { questionnarieValues = [], setQuestionnarieValues = () => { }, setSubmitQuestionarrie =()=>{}, submitQuestionarrie=false, setRecommedations = () => {}} = allStore;
    const [isSubmitShow, setIsSubmitShow] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questionsList[currentQuestionIndex];

    const handleOnClick = () => {
        if (!(currentQuestionIndex + 1 === questionsList.length)) {
            if (currentQuestionIndex < questionsList.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            }
        }
        else {
             questionarrieApi("/checkup",questionnarieValues)
             .then((response)=>{
                debugger
               const { data, status} = response;
               if(status==200)
               {
                 setRecommedations(data);
                 setSubmitQuestionarrie(true)
               }
             })
           
        }
    };

    const handleChange = (options) => {
        let updatedQuestionarries = [];
        const selectedOptionsIndex = questionnarieValues.findIndex(
            (items) => currentQuestion === items?.currentQuestion
        );
        if (selectedOptionsIndex !== -1) {
            updatedQuestionarries = [...questionnarieValues];
            updatedQuestionarries[selectedOptionsIndex] = {
                currentQuestion,
                optionSelected: options?.value,
            };
        } else {
            const newAnswer = { currentQuestion, optionSelected: options?.value };
            updatedQuestionarries = [...questionnarieValues, newAnswer];
        }
        setQuestionnarieValues(updatedQuestionarries);
    };


    const currentAnswer = allStore.questionnarieValues.find(
        (item) => item.currentQuestion === currentQuestion
    );
    const selectedValue = currentAnswer ? currentAnswer.optionSelected : null;

    return (
        <Fragment>
            {currentQuestion ? (

                <CustomBox
                    questionIndex={currentQuestionIndex}
                    eachQuestions={currentQuestion}
                >
                    <GroupedRadioButton
                        handleChange={handleChange}
                        selectedValue={selectedValue}
                    />
                    <CustomButton
                        variant="contained"
                        value={(currentQuestionIndex + 1 === (questionsList.length)) ? "Submit" : "Next"}
                        handleOnClick={handleOnClick}
                        sx={{ mt: 2 }} // Added margin-top for spacing
                        color='#19d2a4ff'
                    />
                </CustomBox>
            ) : (
                <Box>
                    <p>Thank you for completing the questionnaire!</p>
                </Box>
            )}
        </Fragment>
    );
});

export default Questionnarie;