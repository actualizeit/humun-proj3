import React, { useState } from "react";
import { Slider } from "react-semantic-ui-range";

function ThemeSlider() {
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
            <Slider value={value} color="blue" settings={settings} />
        </div>
    );
};

export default ThemeSlider;