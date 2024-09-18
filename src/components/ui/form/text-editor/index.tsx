'use client';

import React from 'react';
import { ContentState, convertToRaw, EditorState, type EditorProps } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import cn from 'clsx';

import { toolbarOptions } from './options';
import type { FieldProps } from '..';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './text-editor.module.scss';

type TypeEditorField = EditorProps & FieldProps;

interface Props extends Omit<TypeEditorField, 'editorState'> {
  value: string;
  onChange: (...event: any[]) => void;
}

export const TextEditor: React.FC<Props> = ({ label, onChange, value, error }) => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const [isUpdated, setIsUpdated] = React.useState(false);

  React.useEffect(() => {
    if (isUpdated) {
      return;
    }

    const defaultValue = value || '';
    const blockFromHtml = htmlToDraft(defaultValue);

    const contentState = ContentState.createFromBlockArray(
      blockFromHtml.contentBlocks,
      blockFromHtml.entityMap
    );

    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  }, [value, isUpdated]);

  const onEditorStateChange = (editorState: EditorState) => {
    setIsUpdated(true);
    setEditorState(editorState);

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <div className={cn(styles.editor_wrapper, 'animate-fade')}>
      <label>
        <span>{label}</span>
        <div className={styles.wrapper}>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbarClassName={styles.toolbar}
            editorClassName={styles.editor}
            toolbar={toolbarOptions}
            spellCheck
          />
        </div>
      </label>
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};
