import { Button } from '@mui/material';
import styles from './policy-terms-dialog.module.scss';
import Image from "next/image";

interface Props {
    handleClose: () => void
}

export default function PolicyTermsDialog(props: Props) {
    return (
        <div className={styles.host}>
            <div className={styles.consent}>
                <div className={styles.consent__header}>
                    <h1 className={'mat-h1'}><b>Youtube Clone</b></h1>
                </div>
                <div className={styles.consent__icon}>
                    <Image
                        src={'/icons/policy-terms.svg'}
                        alt="Consent screen icon"
                        fill
                        sizes="(min-width: 0) 100%, 100%"
                    />
                </div>
                <div className={`${styles.consent__content} mat-subtitle-1`}>
                    <ul>
                        <li>
                            This app is for <b>EDUCATION PURPOSE ONLY.</b> It was built for illustrating one of the approaches to build
                            Realworld Microfrontend app using Angular and Module Federation.
                        </li>
                        <li>
                            <span>For real Youtube Experience, you should use </span>
                            <a href="https://www.youtube.com" target="_blank">www.youtube.com</a>
                        </li>
                        <li>The Author is not saving any data of the client on the server.</li>
                        <li>
                            <span>Source code can be found at this </span>
                            <a href="https://github.com/vugar005/youtube-webapp-turborepo" target="_blank">LINK</a>
                        </li>
                    </ul>
                </div>
                <div className={styles.consent__footer}>
                    <Button variant="contained" color="primary" onClick={props?.handleClose} >OKAY</Button>
                </div>
            </div>
        </div>
    );
}