import { useEffect, useRef, useState } from "react";
import GlobalConstants from "../../Constants/GlobalConstants";
import Folder from "../../Model/Bash/FileSystem/Folder";
import Bash from "../../Services/Bash/Bash";
import {
  BarButton,
  BarButtons,
  BarUser,
  Container,
  HistoryItemContainer,
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
import History from "../../Model/Bash/History";
import BashState from "../../Model/Bash/BashState";
import HistoryList from "./HistoryList";

interface Props {
  username: string;
}

const getInputWidth = (input: string) => {
  return input.length * 8;
};

const UbuntuTerminal = (props: Props) => {
  const { username } = props;
  const bash = new Bash();

  const inputRef = useRef<any>();

  const [terminalInput, setTerminalInput] = useState("");
  const [cwd, setCwd] = useState<string>(GlobalConstants.defaultCwd);
  const [history, setHistory] = useState<History>([]);
  const [fileSystem, setFileSystem] = useState<Folder>(
    GlobalConstants.fileSystem
  );

  console.log("EXE");

  useEffect(() => {
    inputRef.current.focus();
    const newState = bash.execute("help", new BashState(cwd, history, fileSystem));
    setCwd(newState.cwd);
    setHistory(newState.history);
    setFileSystem(newState.files);
  }, []);

  const handleOnType = (e: any) => {
    const text = e.target.value;
    setTerminalInput(text);
  };

  const renderHistoryItem = () => {
    return (
      <HistoryItemContainer>
        <TerminalPrompt>
          <TerminalPromptUser>{username}@ubuntu:</TerminalPromptUser>
          <TerminalPromptLocation>{cwd}</TerminalPromptLocation>
          <TerminalPromptBling>$</TerminalPromptBling>
          <TerminalPromptBling>ls</TerminalPromptBling>
        </TerminalPrompt>
        <TerminalPrompt>
          <TerminalPromptBling>README.md</TerminalPromptBling>
        </TerminalPrompt>
      </HistoryItemContainer>
    );
  };

  return (
    <Container>
      <Terminal onClick={() => inputRef.current.focus()}>
        <TerminalBar>
          <BarButtons>
            <BarButton exit />
            <BarButton />
            <BarButton />
          </BarButtons>
          <BarUser>{username}@ubuntu:</BarUser>
        </TerminalBar>
        <TerminalBody>
          <HistoryList history={history} username={username} cwd={cwd} />
          <TerminalPrompt>
            <TerminalPromptUser>{username}@ubuntu:</TerminalPromptUser>
            <TerminalPromptLocation>~</TerminalPromptLocation>
            <TerminalPromptBling>$</TerminalPromptBling>
            <TerminalPromptInput
              type="text"
              value={terminalInput}
              onChange={handleOnType}
              ref={inputRef}
              style={{ width: getInputWidth(terminalInput) }}
            />
            <TerminalPromptCursor />
          </TerminalPrompt>
        </TerminalBody>
      </Terminal>
    </Container>
  );
};

export default UbuntuTerminal;
