import styles from '../styles/cardzone.module.css'
import { useState } from 'react';

const [isExpanded, setIsExpanded] = useState(new Array(idArray.length).fill(false));

const handleCardClick = (index) => {
    const newIsExpanded = [...isExpanded];
    newIsExpanded[index] = !newIsExpanded[index];
    setIsExpanded(newIsExpanded);
    onCardClick(index);
}


export default function CardZone(prop){
    const timeArray = prop.Array[0] 
    const idArray = prop.Array[1]; //
    return(
        <div className={styles.card_zone}>
            <div className={styles.card_container}>
                <div className={styles.time_card}  style={{ color: timeArray[0] >= 5 ?'red' : (timeArray[0]?'white':'green' )}}>{timeArray[0]?timeArray[0]+ ' min':'Available'}</div>
                <div className={styles.id_card}onClick={() => handleCardClick(0)}> {idArray[0]}</div>
            </div>

            <div className={styles.card_container}>
                <div className={styles.time_card}  style={{ color: timeArray[1] >= 5 ?'red' : (timeArray[1]?'white':'green' )}}>{timeArray[1]?timeArray[1]+ ' min':'Available'}</div>
                <div className={styles.id_card}onClick={() => handleCardClick(1)}> {idArray[1]}</div>
            </div>


            <div className={styles.card_container}>
                <div className={styles.time_card}  style={{ color: timeArray[2] >= 5 ?'red' : (timeArray[2]?'white':'green' )}}>{timeArray[2]?timeArray[2]+ ' min':'Available'}</div>
                <div className={styles.id_card}onClick={() => handleCardClick(2)}> {idArray[2]}</div>
            </div>

            <div className={styles.card_container}>
                <div className={styles.time_card}  style={{ color: timeArray[3] >= 5 ?'red' : (timeArray[3]?'white':'green' )}}>{timeArray[3]?timeArray[3]+ ' min':'Available'}</div>
                <div className={styles.id_card}onClick={() => handleCardClick(3)}> {idArray[3]}</div>
            </div>
            <div className={styles.card_container}>
                <div className={styles.time_card}  style={{ color: timeArray[4] >= 5 ?'red' : (timeArray[4]?'white':'green' )}}>{timeArray[4]?timeArray[4]+ ' min':'Available'}</div>
                <div className={styles.id_card}onClick={() => handleCardClick(4)}> {idArray[4]}</div>
            </div>

        </div>
    )   
}