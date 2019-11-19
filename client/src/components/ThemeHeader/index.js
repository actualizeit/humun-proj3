import React from "react";
import { Grid, Header, Button } from 'semantic-ui-react';
const { Row, Column } = Grid;

function ThemeHeader(props) {
    return (
        <Grid textAlign='center' color='blue'>
            <Row>
                <Column>
                    {props.text}
                </Column>
            </Row>
        </Grid>
    )
}

export default ThemeHeader;