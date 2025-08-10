import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Box, Typography } from '@mui/material';
import { HealthReport } from '../../Utils/Constant/Constant';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 30,
        fontFamily: 'Helvetica',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 12,
        marginBottom: 10,
    },
});

const ReportDocument = ({ reportContent }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Mental Health Assessment Report</Text>
                 <Text style={styles.text}>{HealthReport?.ScoreLabel}</Text> <Text style={styles.text}>{reportContent.score}</Text>
                <Text style={styles.text}>{HealthReport?.LevelLabel}</Text> <Text style={styles.text}>{reportContent.level}</Text>
               <Text style={styles.text}>{HealthReport?.labelAnalysis}</Text>  <Text style={styles.text}>{reportContent.analysis}</Text>
                <Text style={styles.text}>{HealthReport?.RecommendationsLabel}</Text> <Text style={styles.text}>{reportContent.recommendation}</Text>
            </View>
        </Page>
    </Document>
)

export default ReportDocument;


