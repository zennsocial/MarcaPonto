import React, { useState, useContext } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { BiBell, BiChevronDown } from "react-icons/bi";
import {
    getCurrentFlag,
    getTodayInfo,
    handleUndefined,
    showToast,
} from "../../Functions";
import MainContext from "../../Contexts/MainContext";
import { FormattedMessage } from "react-intl";
import { AllLanguages } from "../../Services/AllLanguages";

interface NavBarInternaProps {
    data: any;
}

const NavBarInterna: React.FC<NavBarInternaProps> = ({ data }) => {
    const { removeToken, setBrowserLanguage, browserLanguage } = useContext(
        MainContext
    );
    const [dropdownNotificationOpen, setdropdownNotificationOpen] = useState(
        false
    );

    const handleLogout = () => {
        showToast("SUCCESS", "Você foi deslogado com sucesso", {});
        removeToken("token");
    };

    return (
        <header className="header__nav-interna">
            <div className="nav__interna">
                <div className="nav__bemvindo">
                    <h2 className="tt-title">
                        <FormattedMessage id="helloDashboard" />{" "}
                        <span>{handleUndefined(data.username)}</span>
                    </h2>
                    <p className="nav__curentDate">{getTodayInfo()}</p>
                </div>

                <div className="nav__opcoes">
                    <div className="opcoes__language">
                        <div className="lang__current">
                            <img
                                src={`https://www.countryflags.io/${getCurrentFlag(
                                    browserLanguage
                                )}/flat/64.png`}
                                alt="Portuguese"
                            />
                            <BiChevronDown size={20} />
                        </div>
                        <div className="lang__more-options">
                            {AllLanguages.filter(
                                (all) => all.locale !== browserLanguage
                            ).map((lang) => (
                                <div
                                    className="mo__wrapper"
                                    onClick={() =>
                                        setBrowserLanguage(lang.locale)
                                    }
                                >
                                    <img
                                        src={`https://www.countryflags.io/${lang.flag}/flat/64.png`}
                                        alt={lang.title}
                                    />
                                    <p>{lang.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="opcoes__avatar">
                        <Link to="/dashboard/settings">
                            <img
                                src={`https://ui-avatars.com/api/?name=${data.username}&background=0D8ABC&color=fff`}
                                alt=""
                            />
                        </Link>
                    </div>

                    <div
                        className="opcoes__notifications"
                        onClick={() =>
                            setdropdownNotificationOpen(
                                !dropdownNotificationOpen
                            )
                        }
                    >
                        <BiBell size={30} />

                        <div className="notifications__hasNot">
                            <span>1</span>
                        </div>

                        <div
                            className={`notifications__dropdown ${
                                dropdownNotificationOpen ? "show" : ""
                            }`}
                        >
                            <p>Nenhuma notificação ainda</p>
                        </div>
                    </div>

                    <div className="opcoes__logout">
                        <a href="#logout" className="bt" onClick={handleLogout}>
                            Sair
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default NavBarInterna;
