import React from "react";
import { Grid, Image, Header } from 'semantic-ui-react';
const { Row, Column } = Grid;

function ThemeCard(props) {
    return (
        <Grid celled>
            <Row>
                <Column width={4} style={{ padding: 0 }}>
                    <Image src={props.image} fluid />
                </Column>
                <Column width={12}>
                    <Header as='h4' dividing>{props.title}</Header>
                    <p>{props.children}</p>
                </Column>
            </Row>
        </Grid>
    )
}

export default ThemeCard;