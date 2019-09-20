import useJournalEditMaster from "./useJournalEditMaster";
import useJournalEditMedia from "./useJournalEditMedia";

function useJournalEdit() {
  const jState = useJournalEditMaster();
  const mState = useJournalEditMedia();
  return { ...jState, ...mState };
}

export default useJournalEdit;
