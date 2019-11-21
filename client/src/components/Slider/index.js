import React, { useState } from "react";
import { Slider } from "react-semantic-ui-range";

function ThemeSlider(props) {
    const [value, setValue] = useState(5);

    const settings = {
        start: 2,
        min: 0,
        max: 10,
        step: 1,
        onChange: value => {
            setValue(value);
        }
    };

    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <Slider value={value} color="blue" settings={settings} />
        </div>
    );
};

export default ThemeSlider;