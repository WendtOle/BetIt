import { MatchCardTemplate } from "./MatchCardTemplate"
import { Typography, CardActions, Button, CardContent } from '@mui/material';
import { ConfirmationDialog } from "./ConfirmationDialog";

interface SettingsPageProps {
    initData: () => void;
    resetTournament: () => void;
}

export const SettingsPage = ({initData, resetTournament}: SettingsPageProps) => {
    return (
        <>
            <MatchCardTemplate>
                <Typography style={{ margin: 'auto', marginBottom: 16 }} variant="h4">Reset Tournament</Typography>
                <CardContent>
                    <Typography style={{ margin: 'auto', marginBottom: 16 }}>Betters are kept without any Money in there accounts.</Typography>
                </CardContent>
                <CardActions >
                    <ConfirmationDialog buttonTitle="Reset" onSubmit={resetTournament}/>
                </CardActions>
            </MatchCardTemplate>
            <MatchCardTemplate>
                <Typography style={{ margin: 'auto', marginBottom: 16 }} variant="h4">Clear Data</Typography>
                <CardContent>
                    <Typography style={{ margin: 'auto', marginBottom: 16 }}>Everything will be deleted.</Typography>
                </CardContent>
                <CardActions >
                    <ConfirmationDialog buttonTitle="Clear" onSubmit={initData}/>
                </CardActions>
            </MatchCardTemplate>
        </>
    )
}

