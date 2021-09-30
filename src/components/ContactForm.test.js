import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

describe("Contact Form", () => {
    beforeEach(() => {
        render(<ContactForm />)
    });

    it('renders without errors', ()=>{
        console.log(ContactForm)
    });

    it('renders the contact form header', ()=> {
        const header = screen.queryByText(/contact form/i)
        expect(header).toBeInTheDocument()
    });

    it('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
        const firstNameInput = screen.queryByLabelText(/First Name*/i)
        expect(firstNameInput).toBeInTheDocument()
        userEvent.type(firstNameInput, "kat")
        const errorMessages = screen.queryAllByTestId('error')
        expect(errorMessages).toHaveLength(1)
    });

   it('renders THREE error messages if user enters no values into any fields.', async () => {
        const submitButton = screen.queryByRole("button")
        expect(submitButton).toBeInTheDocument()
        userEvent.click(submitButton)
        const errorMessages = screen.queryAllByTestId('error')
        expect(errorMessages).toHaveLength(3)
    
    });    
})




test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});

// test('renders without errors', ()=>{
//     render(<ContactForm/>)
// });

// test('renders the contact form header', ()=> {
//     render(<ContactForm/>)
//     const header = screen.queryByText(/contact form/i)
//     expect(header).toBeInTheDocument()

// });

// test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
 
// });

// test('renders THREE error messages if user enters no values into any fields.', async () => {
    
// });

// test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
// });

// test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
// });

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
// });

// test('renders all fields text when all fields are submitted.', async () => {
    
// });