import React, { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";

import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from "./DescField.module.scss";

interface IDescFieldProps {
  description: string;
}

function DescField({ description }: IDescFieldProps) {
  const contentBlock = htmlToDraft(description);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const [editorState, setEditorState] = useState<EditorState>(
    /* EditorState.createWithContent(htmlToDraft(description)) */
    EditorState.createWithContent(contentState)
  );
  console.log(htmlToDraft(description));
  const onEditorStateChange = useCallback((nEditorState: EditorState) => {
    console.log("chaning....", nEditorState);
    setEditorState(nEditorState);
  }, []);

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
