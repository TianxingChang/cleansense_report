import styles from '../styles/cardzone.module.css'

export default function CardZone(){
    return(
        <div className={styles.card_zone}>
            <div className={styles.card_container}>
                <div className={styles.time_card}>2 min</div>
                <div className={styles.id_card}> lg 1 </div>
            </div>
            <div className={styles.card_container}>
                <div className={styles.time_card}>2 min</div>
                <div className={styles.id_card}> lg 1 </div>
            </div>
        </div>
    )   
}