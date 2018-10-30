import * as React from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';

// import { bindActionCreators } from 'redux';

class UndoRedo extends React.Component<any, any> {
    componentDidMount() {
        this.props.onUndo();
    }

    render() {
        return (
            <p>
                <a
                    title="Undo"
                    className={`waves-effect waves-black btn undo ${this.props.canUndo === false ? 'disabled' : '0'}`}
                    onClick={() => this.props.onUndo()}
                >
                    <i
                    
                        className={`material-icons`}
                    >
                        undo
                    </i>
                </a>
                <a
                    title="Redo"
                    className={`waves-effect waves-black redo btn ${this.props.canRedo === false ? 'disabled' : '0'}`}
                    onClick={() => this.props.onRedo()}
                >
                    <i
                        className={`material-icons`}
                    >
                        redo
                    </i>
                </a>
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