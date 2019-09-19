import React, { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";

import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from "./DescField.module.scss";

interface IDescFieldProps {
  description: string;
  setFieldValue: (name: "description", value: string) => any;
}

function DescField({ description, setFieldValue }: IDescFieldProps) {
  const contentBlock = htmlToDraft(description);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const [editorState, setEditorState] = useState<EditorState>(
    /* EditorState.createWithContent(htmlToDraft(description)) */
    EditorState.createWithContent(contentState)
  );
  const onEditorStateChange = useCallback(
    (nEditorState: EditorState) => {
      setEditorState(nEditorState);
      setFieldValue(
        "description",
        draftToHtml(convertToRaw(nEditorState.getCurrentContent()))
      );
    },
    [setFieldValue]
  );

  return (
    <div className={classes.container}>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}

DescField.propTypes = {
  description: PropTypes.string.isRequired
};
export default memo(DescField);
