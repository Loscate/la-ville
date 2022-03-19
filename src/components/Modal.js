import { ReactComponent as Close } from './close.svg'
import './Modal.css'

function Modal({ isOpen, children, onClose, title }) {
    if (isOpen) {
        return (
            <div className="Modal">
                <div className='Modal__fade'></div>
                <div className='Modal__box'>
                    <div className="Modal__header">
                        <span className='Modal__title'>{ title }</span>
                        <div className='Modal__close' onClick={() => onClose()}>
                            <Close />
                        </div>
                    </div>
                    <div className='Modal__content'>
                        { children }
                    </div>
                </div>
            </div>
        )
    }
    return null;
}

export default Modal;