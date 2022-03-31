import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import { Alert } from './';

describe('Alert', () => {
    test('should use `text` prop', () => {
        render(<Alert text="text" />);
        const alertElem = screen.queryByTestId(/alert/i);;
        expect(alertElem).toBeInTheDocument();
    });

    test('should use `type` prop', () => {
        render(<Alert text="text" type="success" />);
        const alertElem = screen.queryByTestId(/alert/i);;
        expect(alertElem).toHaveClass('alert-success');
    });

    test('should use default value of `type` prop', () => {
        render(<Alert text="text" />);
        const alertElem = screen.queryByTestId(/alert/i);;
        expect(alertElem).toHaveClass('alert-danger');
    });
});