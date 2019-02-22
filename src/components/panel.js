import React from 'react';

const Panel = (props) => 
    <section className="section">
        <div className="container">
            {props.children}
        </div>
    </section>;

export default Panel;
