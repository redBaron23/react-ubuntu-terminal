import { useEffect, useRef, useState } from "react";
import GlobalConstants from "../../Constants/GlobalConstants";
import Bash from "../../Services/Bash/Bash";
import {
  BarButton,
  BarButtons,
  BarUser,
  CHAR_LENGTH,
  Container,
  Terminal,
  TerminalBar,
  TerminalBody,
  TerminalPrompt,
  TerminalPromptBling,
  TerminalPromptCursor,
  TerminalPromptInput,
  TerminalPromptLocation,
  TerminalPromptUser,
} from "./styles";
import BashState from "../../Model/Bash/BashState";
import TerminalHistory from "./TerminalHistory";
import User from "../../Model/Bash/User";
import styled from "styled-components";
import TerminalUtils from "../../Utils/Terminal/TerminalUtils";

interface Props {
  username: string;
}

const getInputWidth = (input: string): string => {
  return `${input.length * CHAR_LENGTH}px`;
};

const UbuntuTerminal = (props: Props) => {
  const { username } = props;

  const inputRef = useRef<any>();

  const [terminalInput, setTerminalInput] = useState("");
  const [bashState, setBashState] = useState<BashState>(
    new BashState(
      GlobalConstants.DEFAULT_CWD,
      [],
      GlobalConstants.fileSystem,
      new User(username)
    )
  );
  const [caretOffset, setCaretOffset] = useState(0);

  useEffect(() => {
    const newState = Bash.execute("help", bashState);
    setBashState(newState);
  }, []);

  useEffect(() => {
    ScrollToBottom();
  }, [bashState]);

  const handleOnType = (e: any) => {
    const text = e.target.value;
    setTerminalInput(text);
  };

  const handleOnKeyDown = (e: any) => {
    if (e.key === "Enter") {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
      const newState = Bash.execute(terminalInput, bashState);
      setTerminalInput("");
      setBashState(newState);
    }
    // if control + c
    if (e.key === "c" && e.ctrlKey) {
      setTerminalInput("");
    }
    // if up arrow
    if (e.key === "ArrowUp" && Bash.isLastInput()) {
      const prevInput = Bash.getPreviousInput();
      setTerminalInput(prevInput);
    }
    // if down arrow
    if (e.key === "ArrowDown" && Bash.isLastInput()) {
      const nextInput = Bash.getNextInput();
      setTerminalInput(nextInput);
    }
    // if left arrow
    if (e.key === "ArrowLeft") {
      setCaretOffset(
        TerminalUtils.getCurrentCaretOffset(
          // TODO explain this
          terminalInput.length + 1,
          inputRef.current.selectionStart
        )
      );
    }
    // if right arrow
    if (e.key === "ArrowRight") {
      setCaretOffset(
        TerminalUtils.getCurrentCaretOffset(
          terminalInput.length,
          // TODO explain this
          inputRef.current.selectionStart + 1
        )
      );
    }
  };

  const ScrollToBottom = () =>
    inputRef.current.scrollIntoView({ behavior: "smooth" });

  const focusTerminal = () => inputRef.current.focus();

  return (
    <Container>
      <Terminal onClick={focusTerminal}>
        <TerminalBar>
          <BarButtons>
            <BarButton exit />
            <BarButton />
            <BarButton />
          </BarButtons>
          <BarUser>{username}@ubuntu:</BarUser>
        </TerminalBar>
        <TerminalBody>
          <TerminalHistory username={username} bashState={bashState} />
          <TerminalPrompt>
            <TerminalPromptUser>{username}@ubuntu:</TerminalPromptUser>
            <TerminalPromptLocation>~{bashState.cwd}</TerminalPromptLocation>
            <TerminalPromptBling>$</TerminalPromptBling>
            <InputContainer>
              <TerminalPromptInput
                type="text"
                value={terminalInput}
                onChange={handleOnType}
                onKeyDown={handleOnKeyDown}
                ref={inputRef}
                width={getInputWidth(terminalInput + 1)}
              />
              <TerminalPromptCursor offset={caretOffset} />
            </InputContainer>
          </TerminalPrompt>
        </TerminalBody>
      </Terminal>
    </Container>
  );
};

const InputContainer = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
`;

export default UbuntuTerminal;
