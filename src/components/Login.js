import React from "react";
// import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const Navigate = useNavigate();
  return (
    <Container>
      <Content>
        <BgImage />
        <CTA>
          <CTALogoOne src="images/cta-logo-one.svg" alt="" />
          <SignUP onClick={() => Navigate("/home")}>GET ALL THERE</SignUP>
          <Description>
            Get Premier Access to Raya and the Last Dragon for an additional fee
            with a Disney+ subscription. As of 29/10/22, the price of Disney+
            and The Disney Bundle will increase by $1.
          </Description>
          <CTALogoTwo src="images/cta-logo-two.png" alt="" />
        </CTA>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
  box-sizing: border-box;
`;
const BgImage = styled.div`
  height: 100%;
  background-position: top;
  background-size: cover;
  background-image: url("images/login-background.jpg");
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`;

const CTA = styled.div`
  margin-bottom: 2vw;
  max-width: 650px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 0;
  align-items: center;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  transition: ease-out;
  transition: opacity 0.5s;
  width: 100%;
`;
const CTALogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;
const SignUP = styled.a`
  color: #f9f9f9;
  font-weight: bold;
  background-color: #0063e5;
  margin-bottom: 12px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 16.5px 0;
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #0483ee;
  }
`;
const Description = styled.p`
  color: hsla(0, 0, 95.3%, 1);
  font-size: 13px;
  margin: 0 0 24px;
  letter-spacing: 1.5px;
  line-height: 1.5em;
`;
const CTALogoTwo = styled.img`
  max-width: 600px;
  margin-bottom: 20px;
  width: 100%;
`;

export default Login;
