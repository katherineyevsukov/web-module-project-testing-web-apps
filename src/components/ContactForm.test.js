import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

describe("Contact Form", () => {
    beforeEach(() => {
        render(<ContactForm />)
    });

    it('renders without errors', ()=>{
        render(<ContactForm />)
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

    it('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
        const firstNameInput = screen.queryByLabelText(/First Name*/i)
        expect(firstNameInput).toBeInTheDocument()
        userEvent.type(firstNameInput, "katherine")
        const lastNameInput = screen.queryByLabelText(/last Name*/i)
        expect(lastNameInput).toBeInTheDocument()
        userEvent.type(lastNameInput, "yevsukov")
        const submitButton = screen.queryByRole("button")
        expect(submitButton).toBeInTheDocument()
        userEvent.click(submitButton)
        const errorMessages = screen.queryAllByTestId('error')
        expect(errorMessages).toHaveLength(1)
    
    });
    
    it('renders "email must be a valid email address" if an invalid email is entered', async () => {

        const emailInput = screen.queryByLabelText(/email/i)
        expect(emailInput).toBeInTheDocument()
        userEvent.type(emailInput, 'hello')
        const errorMessage = screen.queryByText(/email must be a valid email address/i)
        expect(errorMessage).toBeInTheDocument()
        
    });
    
    it('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
        const firstNameInput = screen.getByLabelText(/first name*/i)
        expect(firstNameInput).toBeInTheDocument()
        userEvent.type(firstNameInput, "katherine")
        const emailInput = screen.getByLabelText(/email/i)
        expect(emailInput).toBeInTheDocument()
        userEvent.type(emailInput,'kat@kat.com')
        const submitButton = screen.getByRole("button")
        userEvent.click(submitButton)
        const errorMessage = await screen.findByText(/lastName is a required field/i)
        expect(errorMessage).toBeInTheDocument()
    });
    
    it('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
        const firstNameInput = screen.getByLabelText(/first name*/i)
        expect(firstNameInput).toBeInTheDocument()
        userEvent.type(firstNameInput, "katherine")
        const lastNameInput = screen.queryByLabelText(/last Name*/i)
        expect(lastNameInput).toBeInTheDocument()
        userEvent.type(lastNameInput, "yevsukov")
        const emailInput = screen.getByLabelText(/email/i)
        expect(emailInput).toBeInTheDocument()
        userEvent.type(emailInput,'kat@kat.com')
        const submitButton = screen.getByRole("button")
        userEvent.click(submitButton)
        await waitFor(() => {
            expect(screen.getByTestId("firstnameDisplay")).toBeInTheDocument()
            expect(screen.getByTestId("lastnameDisplay")).toBeInTheDocument()
            expect(screen.getByTestId("emailDisplay")).toBeInTheDocument()
            expect(screen.queryByTestId("messageDisplay")).toBeNull()
        })
        
    });
    
    it('renders all fields text when all fields are submitted.', async () => {
        const firstNameInput = screen.getByLabelText(/first name*/i)
        const lastNameInput = screen.getByLabelText(/last Name*/i)
        const emailInput = screen.getByLabelText(/email/i)
        const messageInput = screen.getByLabelText(/message/i)
        const submitButton = screen.getByRole("button")

        userEvent.type(firstNameInput, "Katherine")
        userEvent.type(lastNameInput, "Yevsukov")
        userEvent.type(emailInput, "kat@kat.com")
        userEvent.type(messageInput, "hello")
        userEvent.click(submitButton)

        await waitFor(() => {
            expect(screen.getByTestId('firstnameDisplay')).toHaveTextContent('Katherine');
            expect(screen.getByTestId('lastnameDisplay')).toHaveTextContent('Yevsukov');
            expect(screen.getByTestId('emailDisplay')).toHaveTextContent('kat@kat.com');
            expect(screen.getByTestId('messageDisplay')).toHaveTextContent('hello');
        })
    }); 
})






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