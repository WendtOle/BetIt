import { FC, ReactNode } from "react"
import { Button, TextField, Typography, Grid, Card, CardContent, CardActions, CardHeader } from "@mui/material"

interface MatchCardTemplateProps {
    children: ReactNode
}

export const MatchCardTemplate = ({children}: MatchCardTemplateProps ) => {
    return (
        <Grid item xs={12} sm={4} md={3}>
            <Card style={{maxWidth: 300, padding: 16, margin: 'auto'}}>{children}</Card>
        </Grid>
    )
}