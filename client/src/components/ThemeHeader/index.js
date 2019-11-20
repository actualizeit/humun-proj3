import React from "react";
import { StyleSheet, css } from 'aphrodite';
import { Grid, Header } from 'semantic-ui-react';
const { Row, Column } = Grid;

function ThemeHeader(props) {
    return (
        <Grid textAlign='center'>
            <Row>
                <Column color='blue' className={css(styles.pt)}>
                    <Header as='h1' className={css(styles.white)}>
                        {props.text}
                    </Header>
                </Column>
            </Row>
        </Grid>
    )
}

const styles = StyleSheet.create({
    white: {
        color: 'white'
    },
    pt: {
        paddingTop: '2em'
    }
});

export default ThemeHeader;