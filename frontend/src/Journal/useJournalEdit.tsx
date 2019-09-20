import { History } from "history";
import useJournalEditMaster from "./useJournalEditMaster";
import useJournalEditMedia from "./useJournalEditMedia";

function useJournalEdit(history: History) {
  const jState = useJournalEditMaster(history);
  const mState = useJournalEditMedia();
  return { ...jState, ...mState };
}

export default useJournalEdit;
