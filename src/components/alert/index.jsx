import React from 'react';

export const Alert = ({ text, type = 'danger' }) => (
    <div data-testid="alert" className={ `alert alert-${type}` } role="alert">
        { text }
    </div>
)