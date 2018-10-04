import * as React from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

class UndoRedo extends React.Component<any, any> {
    componentDidMount () {
        this.props.onUndo();
    }

    render() {
        return (
            <p>
                <button onClick={() => this.props.onUndo()} disabled={!this.props.canUndo}>
                    Undo
                </button>
                <button onClick={() => this.props.onRedo()} disabled={!this.props.canRedo}>
                    Redo
                </button>
            </p>
        );
    }
}

function mapStateToProps({ sites }: any) {
    return {
        canUndo: sites.past.length > 0,
        canRedo: sites.future.length > 0,
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        onUndo: () => dispatch(UndoActionCreators.undo()),
        onRedo: () => dispatch(UndoActionCreators.redo())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo);