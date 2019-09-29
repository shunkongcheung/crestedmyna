import { useCallback } from "react";
import { FormikProps } from "formik";

import { useDeleteState, useFetchFormDataState } from "../../Base/Fetches";
import useGetAccessUrlFromFileName from "../useGetAccessUrlFromFileName";

function useJournalEditMedia() {
  const { fetchDelete } = useDeleteState();
  const { makeFormDataFetch } = useFetchFormDataState();
  const { getAccessUrlFromFileName } = useGetAccessUrlFromFileName();

  // methods -----------------------------------------------
  const handleDeleteMedia = useCallback(
    async (
      id: number,
      formApis: FormikProps<{ medias: Array<{ id: number }> }>
    ) => {
      const { ok } = await fetchDelete(`/general/gnl_media/${id}/`);
      if (!ok) return;

      const { setFieldValue, values } = formApis;
      const { medias } = values;
      const nMedias = medias.filter(itm => itm.id !== id);
      setFieldValue("medias", nMedias);
    },
    [fetchDelete]
  );
  const handleAddMedia = useCallback(
    async (
      name: string,
      media_file: File,
      formApis: FormikProps<{ medias: Array<{ id: number }> }>
    ) => {
      const res = await makeFormDataFetch(
        "/general/gnl_media/create/",
        { name },
        { media_file }
      );
      const { ok, payload } = res as { ok: boolean; payload: any };
      if (!ok) return;
      const { setFieldValue, values } = formApis;
      const { medias } = values;

      const media = {
        name: payload.name,
        accessUrl: getAccessUrlFromFileName(payload.file_name),
        id: payload.id
      };
      const nMedias = [media, ...medias];
      setFieldValue("medias", nMedias);
    },
    [getAccessUrlFromFileName, makeFormDataFetch]
  );

  // return ---------------------------------------------
  return { handleAddMedia, handleDeleteMedia };
}

export default useJournalEditMedia;
