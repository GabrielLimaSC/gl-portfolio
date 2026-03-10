import styles from './Desktop.module.css'

const STARS = [
  { w: 2, top: 8,  left: 10, dur: 2.5, delay: 0   },
  { w: 1, top: 5,  left: 20, dur: 3.5, delay: 0.5 },
  { w: 2, top: 12, left: 35, dur: 2,   delay: 1   },
  { w: 1, top: 6,  left: 48, dur: 4,   delay: 0.2 },
  { w: 2, top: 9,  left: 62, dur: 3,   delay: 1.5 },
  { w: 1, top: 4,  left: 75, dur: 2.8, delay: 0.8 },
  { w: 2, top: 15, left: 88, dur: 3.2, delay: 0.3 },
  { w: 1, top: 22, left: 15, dur: 4.5, delay: 1.2 },
  { w: 2, top: 18, left: 42, dur: 2.2, delay: 0.7 },
  { w: 1, top: 25, left: 70, dur: 3.8, delay: 0.4 },
  { w: 2, top: 30, left: 55, dur: 2.6, delay: 1.8 },
  { w: 1, top: 35, left: 28, dur: 3.1, delay: 0.9 },
]

const Desktop = () => {
  return (
    <div className={styles.desktop}>

      {/* Stars */}
      {STARS.map((s, i) => (
        <div
          key={i}
          className={styles.star}
          style={{
            width: s.w,
            height: s.w,
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Moon */}
      <div className={styles.moon} />
      <div className={styles.moonlight} />

      {/* Bat */}
      <div className={styles.bat}>🦇</div>

      {/* Trees */}
      <div className={`${styles.tree} ${styles.treeLeft1}`}>
        <div className={styles.treeTop2} />
        <div className={styles.treeTop} />
        <div className={styles.treeTrunk} />
      </div>
      <div className={`${styles.tree} ${styles.treeLeft2}`}>
        <div className={styles.treeTop2} />
        <div className={styles.treeTop} />
        <div className={styles.treeTrunk} />
      </div>
      <div className={`${styles.tree} ${styles.treeRight1}`}>
        <div className={styles.treeTop2} />
        <div className={styles.treeTop} />
        <div className={styles.treeTrunk} />
      </div>
      <div className={`${styles.tree} ${styles.treeRight2}`}>
        <div className={styles.treeTop2} />
        <div className={styles.treeTop} />
        <div className={styles.treeTrunk} />
      </div>

      {/* House */}
      <div className={styles.house}>
        <div className={styles.houseRoof} />
        <div className={styles.houseBody}>
          <div className={`${styles.houseWindow} ${styles.houseWindowLeft}`} />
          <div className={`${styles.houseWindow} ${styles.houseWindowRight}`} />
          <div className={styles.houseDoor} />
        </div>
      </div>

      {/* Ground */}
      <div className={styles.ground}>
        <div className={styles.groundGrass} />
        <div className={styles.groundDirt} />
      </div>

    </div>
  )
}

export default Desktop