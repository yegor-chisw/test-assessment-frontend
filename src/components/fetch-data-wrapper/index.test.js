import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import { FetchDataWrapper } from './';

describe('FetchDataWrapper', () => {
    test('should use `text` prop', async () => {
        render(
            <FetchDataWrapper data={ null } isLoading={ true } error={ null }>
                <h1 data-test-id="header">Header</h1>
            </FetchDataWrapper>
        );
        const spinnerElem = await screen.findByTestId(/spinner/i);
        expect(spinnerElem).toBeInTheDocument();
    });
});
