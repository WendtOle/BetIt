import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import React from 'react';
import { Page } from "./types";

interface NavigationProps {
    page: Page,
    setPage: (page: Page) => void;
    hasEndedMatches: boolean;
}

export const Navigation = ({ page, setPage, hasEndedMatches }: NavigationProps) => {
    return (
    
    <Paper style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
            <BottomNavigation  showLabels value={page} onChange={(e, newValue) => setPage(newValue)}>
            <BottomNavigationAction value={Page.active} label="Active" />
            {hasEndedMatches && <BottomNavigationAction value={Page.ended} label="Ended" />}
            <BottomNavigationAction value={Page.betters} label="Betters" />
            <BottomNavigationAction value={Page.settings} label="Settings" />
        </BottomNavigation>        
    </Paper>)
}