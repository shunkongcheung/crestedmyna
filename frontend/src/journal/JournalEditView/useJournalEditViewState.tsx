import { History } from "history";

import useJournalEditViewMasterState from "./useJournalEditViewMasterState";
import useJournalEditViewMediaState from "./useJournalEditViewMediaState";

function useJournalEditViewState(history: History) {
  const jState = useJournalEditViewMasterState();
  const mState = useJournalEditViewMediaState();
  return { ...jState, ...mState };
}

export default useJournalEditViewState;
