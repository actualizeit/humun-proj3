import React from "react";
import { Grid } from 'semantic-ui-react';
const { Row, Column } = Grid;

function ReviewCard(props) {
    return (
        <Grid stackable columns={2} centered color='blue'>
            <Row>
                <Column>
                    {props.children}
                </Column>
            </Row>
        </Grid>
    )
}

export default ReviewCard;