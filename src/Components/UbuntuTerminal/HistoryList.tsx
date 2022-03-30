import History from "../../Model/Bash/History";
import {
  HistoryItemContainer,
  TerminalPrompt,
  TerminalPromptUser,
  TerminalPromptLocation,
  TerminalPromptBling,
} from "./styles";

interface Props {
  history: History;
  username: string;
  cwd: string;
}

const HistoryList = (props: Props) => {
  const { history, username, cwd } = props;
  return (
    <div>
      {history.map((log) => (
        <HistoryItemContainer>
          <TerminalPrompt>
            {!!log.cwd ? (
              <>
                <TerminalPromptUser>{username}@ubuntu:</TerminalPromptUser>
                <TerminalPromptLocation>{cwd}</TerminalPromptLocation>
                <TerminalPromptBling>$</TerminalPromptBling>
                <TerminalPromptBling>{log.content}</TerminalPromptBling>
              </>
            ) : (
              <TerminalPromptBling>{log.content}</TerminalPromptBling>
            )}
          </TerminalPrompt>
        </HistoryItemContainer>
      ))}
    </div>
  );
};

export default HistoryList;
