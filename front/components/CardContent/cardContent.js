import React from 'react';
import styles from './cardContent.module.css';

const cardContent = (props) =>{
    const { header} = props;

    return(
        <>
        <div className={styles.cardWrapper}>
            <div className={styles.cardHeader}>
                {header}
            </div>
            <div className={styles.content}>
               {props.children}
            </div>
        </div>
        </>
    )
}

export default cardContent;