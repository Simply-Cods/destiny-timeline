import React from 'react'
import * as styles from './Header.module.scss'
import { StaticImage } from 'gatsby-plugin-image'

export default function Header() {
    return (
        <header className={styles.header}>
            <StaticImage src='../images/d2logo.png' alt='logo' className={styles.img}/>
            <h1>DESTINY UNIVERSE TIMELINE</h1>
        </header>
    )
}