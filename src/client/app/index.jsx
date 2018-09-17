import { Editor } from 'react-draft-wysiwyg';
import React from 'react';
import ReactDOM from 'react-dom';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditorPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
        }
    }



    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state
        return (
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange.bind(this)}
            />
        )
    }
}



ReactDOM.render(
    <EditorPage />, document.getElementById('app')
)