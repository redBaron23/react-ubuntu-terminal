import styled, { keyframes } from "styled-components";

export const Blink = keyframes`
  0% {
    background: #ffffff;
  }
  49% {
    background: #ffffff;
  }
  60% {
    background: transparent;
  }
  99% {
    background: transparent;
  }
  100% {
    background: #ffffff;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #57003f 0%, #f57453 100%);
  font-family: Ubuntu;
`;

export const Terminal = styled.div`
  width: 70vw;
  height: 65vh;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 600px) {
    max-height: 90%;
    width: 90%;
  }
`;

export const TerminalBar = styled.section`
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: linear-gradient(#504b45 0%, #3c3b37 100%);
`;

export const BarButtons = styled.div`
  display: flex;
  align-items: center;
`;

export const BarButton = styled.button<{ exit?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-right: 5px;
  font-size: 8px;
  height: 12px;
  width: 12px;
  box-sizing: border-box;
  border: none;
  border-radius: 100%;
  text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 1px 0px #41403a, 0px 1px 1px 0px #474642;
  background: ${(props) =>
    props.exit
      ? "linear-gradient(#f37458 0%, #de4c12 100%)"
      : "linear-gradient(#7d7871 0%, #595953 100%)"};
  ${(props) => props.exit && "background-clip: padding-box"};

  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

export const BarUser = styled.p`
  color: #d5d0ce;
  margin-left: 6px;
  font-size: 14px;
  line-height: 15px;
`;

export const TerminalBody = styled.section`
  background: rgba(56, 4, 40, 0.9);
  font-family: "Ubuntu Mono";
  height: calc(100% - 30px);
  padding-top: 2px;
  margin-top: -1px;
`;

export const TerminalPrompt = styled.div`
  display: flex;
`;

export const TerminalPromptUser = styled.span`
  color: #7eda28;
`;

export const TerminalPromptLocation = styled.span`
  color: #4878c0;
`;

export const TerminalPromptBling = styled.span`
  color: #dddddd;
`;

export const TerminalPromptInput = styled.input<{ isHistory?: boolean }>`
  background: ${(props) =>
    props.isHistory ? "rgb(69,11,44)" : "rgba(56, 4, 40, 0.9)"};
  color: #dddddd;
  font-family: "Ubuntu Mono";
  font-size: 1em;
  padding: 0;
  border: none;
  margin-left: 9px;

  ${(props) => props.isHistory && { width: "100%" }};
  &:focus-visible {
    outline: none;
    caret-color: transparent;
  }
`;

export const TerminalPromptCursor = styled.span`
  display: block;
  height: 17px;
  width: 8px;
  animation: ${Blink} 1200ms linear infinite;
`;

export const HistoryItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;