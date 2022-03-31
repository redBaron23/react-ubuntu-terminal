import { useEffect, useRef, useState } from "react";
import GlobalConstants from "../../Constants/GlobalConstants";
import Bash from "../../Services/Bash/Bash";
import {
  BarButton,
  BarButtons,
  BarUser,
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

interface Props {
  username: string;
}

const getInputWidth = (input: string): string => {
  return `${input.length * 8}px`;
};

const UbuntuTerminal = (props: Props) => {
  const { username } = props;

  const inputRef = useRef<any>();

  const [terminalInput, setTerminalInput] = useState("");
  const [bashState, setBashState] = useState<BashState>(
    new BashState(
      GlobalConstants.defaultCwd,
      [],
      GlobalConstants.fileSystem,
      new User(username)
    )
  );

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
            <TerminalPromptLocation>~</TerminalPromptLocation>
            <TerminalPromptBling>$</TerminalPromptBling>
            <TerminalPromptInput
              type="text"
              value={terminalInput}
              onChange={handleOnType}
              onKeyDown={handleOnKeyDown}
              ref={inputRef}
              width={getInputWidth(terminalInput)}
            />
            <TerminalPromptCursor />
          </TerminalPrompt>
        </TerminalBody>
      </Terminal>
    </Container>
  );
};

export default UbuntuTerminal;
