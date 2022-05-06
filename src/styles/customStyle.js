import styled from "styled-components/macro";
import { Link } from "react-router-dom";
export const StyledLink = styled(Link).attrs({
  className: "text-gray-800 hover:text-black",
})``;

export const Button = styled.p.attrs({
  className:
    "px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-150 ease-out",
})``;
