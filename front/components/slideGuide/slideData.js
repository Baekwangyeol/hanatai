import React from 'react';
import styles from './slideGuide.module.css';

const slideData = ({ data }) =>{
    
    const month = new Date().getMonth() + 1;


    return(
        <>
          <div className={styles.cardWrapper}>
                <div className={styles.cardHeader}>
                    <div className={styles.imageCard}>
                        <img src={data.value}  />
                    </div>
                    <div className={styles.name}>{data.name}</div>
                    <div className={styles.desc}>{data.schdule}</div>
               </div>
                <div className={styles.footer}>
                  <div className={styles.footerTitle}>{month}월 옵션내역</div>
                    <div className={styles.footerborder}>
                      <div className={styles.item}>
                        <span>120</span>
                        마사지
                    </div>
                      <div className={styles.item}>
                        <span>120</span>
                        호핑
                    </div>
                      <div className={styles.item}>
                        <span>120</span>
                        랍스터
                    </div>
                    </div>
                    <div className={styles.footerborder}>
                    <div className={styles.item}>
                        <span>120</span>
                        Title?
                    </div>
                      <div className={styles.item}>
                        <span>120</span>
                        Title?
                    </div>
                      <div className={styles.item}>
                        <span>120</span>
                        Title?
                    </div>
                 </div>
                 </div>
          </div>
        </>
    )
}

export default slideData;