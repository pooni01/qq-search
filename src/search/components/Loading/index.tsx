import { ILoadingProps } from './types';
import './index.scss'

const Loading: React.FC<ILoadingProps> = (props) => {
    const { visible, className } = props;
    return (
        visible ? 
        <div>
        <div className={`spinner ${className}`}>
            <div className="bar1">
            </div>
            <div className="bar2">
            </div>
            <div className="bar3">
            </div>
            <div className="bar4">
            </div>
            <div className="bar5">
            </div>
            <div className="bar6">
            </div>
            <div className="bar7">
            </div>
            <div className="bar8">
            </div>
            <div className="bar9">
            </div>
            <div className="bar10">
            </div>
            <div className="bar11">
            </div>
            <div className="bar12">
            </div>
            </div>
        </div> : null
    );
}

Loading.defaultProps = {
    className: '',
    visible: false
}

export default Loading;