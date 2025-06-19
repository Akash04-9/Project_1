import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { Snackbar, Alert } from '@mui/material';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 16px;
  background: ${({ theme }) => theme.background};
`;

const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 600px;
  margin-bottom: 24px;
`;

const Form = styled.form`
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 600px;
`;

const Input = styled.input`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  resize: vertical;
  outline: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const Button = styled.input`
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1), hsla(294, 100%, 50%, 1));
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

// Component
const Contact = () => {
  const form = useRef();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_8kmu2t8', 'template_cvkwzsq', form.current, '07vJmR6dq9c-yYlr5')
      .then((result) => {
        setOpen(true);
        form.current.reset();
      })
      .catch((error) => {
        console.error('Email send error:', error);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>

        <Form ref={form} onSubmit={handleSubmit}>
          <Input type="email" placeholder="Your Email" name="from_email" required />
          <Input type="text" placeholder="Your Name" name="from_name" required />
          <Input type="text" placeholder="Subject" name="subject" required />
          <TextArea rows="5" placeholder="Your Message" name="message" required />
          {/* Hidden Receiver Email */}
          <input type="hidden" name="to_email" value="yourname@example.com" />
          <Button type="submit" value="Send Message" />
        </Form>

        <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
            Email sent successfully!
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  );
};

export default Contact;
