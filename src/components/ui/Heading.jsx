import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      letter-spacing: 0.2rem;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.7rem;
      font-weight: 500;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  line-height: 1.4;
  text-align: center;
  margin-right: 3.5rem;
`;

export default Heading;
