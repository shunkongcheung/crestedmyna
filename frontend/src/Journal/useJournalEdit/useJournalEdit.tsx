import { History } from "history";
import useJournalEditMaster from "./useJournalEditMaster";
import useJournalEditMedia from "./useJournalEditMedia";

interface IEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

function useJournalEdit(history: History, insertEvent: (event: IEvent) => any) {
  const jState = useJournalEditMaster(history, insertEvent);
  const mState = useJournalEditMedia();
  return { ...jState, ...mState };
}

export default useJournalEdit;
