import React,{ useState }  from 'react';
import cn from 'classnames';
import styles from './modal.module.css';

const Modal = (props) =>{
    const { open, close, header, ok, data } = props;

    const okModal = () =>{
        ok(data);
    }

    return(
        <div className={open ? cn({[styles.openModal]: true, [styles.modal]: true}) : styles.modal }>
            { open ? (  
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        <button className="ok" onClick={okModal}> Ok </button>
                        <button className="close" onClick={close}> close </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default Modal;
