import { History } from "history";

import useJournalEditViewMasterState from "./useJournalEditViewMasterState";
import useJournalEditViewMediaState from "./useJournalEditViewMediaState";

function useJournalEditViewState(history: History) {
  const jState = useJournalEditViewMasterState(history);
  const mState = useJournalEditViewMediaState();
  return { ...jState, ...mState };
}

export default useJournalEditViewState;
