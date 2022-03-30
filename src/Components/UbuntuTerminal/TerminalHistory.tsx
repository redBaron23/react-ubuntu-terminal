import BashState from "../../Model/Bash/BashState";
import {
  HistoryItemContainer,
  TerminalPrompt,
  TerminalPromptUser,
  TerminalPromptLocation,
  TerminalPromptBling,
} from "./styles";

interface Props {
  username: string;
  bashState: BashState;
}

const TerminalHistory = (props: Props) => {
  const { username, bashState } = props;
  return (
    <div>
      {bashState.history.map((log, key) => (
        <HistoryItemContainer key={key}>
          <TerminalPrompt>
            {!!log.cwd ? (
              <>
                <TerminalPromptUser>{username}@ubuntu:</TerminalPromptUser>
                <TerminalPromptLocation>{bashState.cwd}</TerminalPromptLocation>
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

export default TerminalHistory;
