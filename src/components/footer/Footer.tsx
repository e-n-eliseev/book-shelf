import { FC } from "react";
import TelegramIcon from '@mui/icons-material/Telegram';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import Button from '@mui/material/Button';


export const Footer: FC = () => {
    return (
        <footer className='footer'>
            <ul className='footer__content'>
                <li className="footer__item">
                    <Button color="secondary" variant="outlined" startIcon={<CallIcon />} href="tel:+79519045116">
                        +7 951 904 5116
                    </Button>
                </li>
                <li className="footer__item">
                    <Button color="secondary" variant="outlined" startIcon={<EmailIcon />} href="mailto:e.n.eliseev@mail.ru">
                        e.n.eliseev@mail.ru
                    </Button>
                </li>
                <li className="footer__item">
                    <Button color="secondary" variant="outlined" startIcon={<TelegramIcon />} href="https://t.me/e_n_eliseev">
                        Telegram
                    </Button>
                </li>
                <li className="footer__item">
                    <Button color="secondary" variant="outlined" startIcon={< GitHubIcon />} href="https://github.com/e-n-eliseev">
                        GitHub
                    </Button>
                </li>
            </ul>
        </footer>
    );
}