import { Link, NavLink, Outlet } from "react-router-dom";
import "./Navbar.css";
import "./LayoutDefault.scss";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import Modal from "../../Components/Modal";
import { useState } from "react";
import WebLine from "../../Components/WebLine";
import { useNavigate } from "react-router-dom";
import sections from "../../constants/data";
import { FaBars } from "react-icons/fa";

function LayoutDefault(){
    const [showModalRegister, setShowModalRegister] = useState(false);
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalForget, setShowModalForget] = useState(false);

    const [loginError, setLoginError] = useState("");
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate(); 

    const handleRegisterClick = () => {
        setShowModalRegister(true);
        setShowModalLogin(false);
        setNavToggle(prevData => !prevData);
    };
    const handleLoginClick = () => {
        setShowModalLogin(true);
        setShowModalRegister(false);
        setNavToggle(prevData => !prevData);
    };
    const handleForgetClick = () => {
        setShowModalForget(true);
        setShowModalLogin(false);
        setShowModalRegister(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = (event) => {
        
        event.preventDefault();

        const { email, password } = formData;

        // Lấy danh sách user từ dữ liệu
        const { user } = sections;

        // Kiểm tra thông tin đăng nhập
        const foundUser = user.find(
            (u) => u.account === email && u.password === password
        );

        if (foundUser) {
            setLoginError(""); // Xóa lỗi nếu có
            setShowModalLogin(false); // Đóng modal
            navigate(`/user/${foundUser.prop}`); // Chuyển hướng đến màn User với `prop`
        } else {
            setLoginError("Email hoặc mật khẩu không đúng!"); // Hiển thị lỗi
        }
    };

    const [navToggle, setNavToggle] = useState(false);
    const navHandler = () => {
        setNavToggle(prevData => !prevData);
    }

    return(
        <>
            <div className="Web">
                <header>
                    <div className="Web__header">
                        <div className="container-main">
                            <div className="Web__header__inner">
                                <Link to={"/"} className="Web__header__inner__logo">
                                    VIRTUAL GALLERY
                                </Link>
                                <div className="Web__header__inner__menu">
                                    <ul>
                                        <li>
                                            <NavLink
                                                to="/listspace"
                                                className={({ isActive }) =>
                                                    isActive ? "active-link" : ""
                                                }
                                            >
                                                Danh sách không gian
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/aboutus"
                                                className={({ isActive }) =>
                                                    isActive ? "active-link" : ""
                                                }
                                            >
                                                Về chúng tôi
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/contact"
                                                className={({ isActive }) =>
                                                    isActive ? "active-link" : ""
                                                }
                                            >
                                                Liên hệ
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                                <div className="Web__header__inner__extend">
                                    <div className="Web__header__inner__extend__dangky" onClick={handleRegisterClick}>
                                        ĐĂNG KÝ
                                    </div>
                                    <div className="Web__header__inner__extend__dangnhap" onClick={handleLoginClick}>
                                        ĐĂNG NHẬP
                                    </div>
                                    <div className="Web__header__inner__extend__icon">
                                        <IoMdSearch />
                                    </div>
                                    <div className="Web__header__inner__extend__icon">
                                        <AiOutlineGlobal />
                                    </div>
                                </div>
                            </div>
                            <div className="Web__header__hidden">
                                <div className="Web__header__hidden__menu">
                                    <div type = "button" className={`hamburger-menu ${navToggle ? 'hamburger-menu-change' : ""}`} onClick={navHandler}>
                                        <div className='bar-top'></div>
                                        <div className='bar-middle'></div>
                                        <div className='bar-bottom'></div>
                                    </div>
                                    <div className={`navbar-collapse ${navToggle ? 'show-navbar-collapse' : ""}`}>
                                                        <div className='navbar-collapse-content'>
                                                            <ul className='navbar-nav'>
                                                                <li>
                                                                    <NavLink
                                                                        to="/listspace"
                                                                        className={({ isActive }) =>
                                                                            isActive ? "active-link" : ""
                                                                        }
                                                                        onClick={navHandler}
                                                                    >
                                                                        Danh sách không gian
                                                                    </NavLink>
                                                                </li>
                                                                <li>
                                                                    <NavLink
                                                                        to="/aboutus"
                                                                        className={({ isActive }) =>
                                                                            isActive ? "active-link" : ""
                                                                        }
                                                                        onClick={navHandler}
                                                                    >
                                                                        Về chúng tôi
                                                                    </NavLink>
                                                                </li>
                                                                <li>
                                                                    <NavLink
                                                                        to="/contact"
                                                                        className={({ isActive }) =>
                                                                            isActive ? "active-link" : ""
                                                                        }
                                                                        onClick={navHandler}
                                                                    >
                                                                        Liên hệ
                                                                    </NavLink>
                                                                </li>
                                                                <li>
                                                                    <div className="Web__header__inner__extend__dangky" onClick={handleRegisterClick}>
                                                                        ĐĂNG KÝ
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="Web__header__inner__extend__dangnhap" onClick={handleLoginClick}>
                                                                        ĐĂNG NHẬP
                                                                    </div>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                    </div>
                                </div>
                                <Link to={"/"} className="Web__header__hidden__logo">
                                    VIRTUAL GALLERY
                                </Link>
                                <div className="Web__header__inner__extend">
                                    
                                    <div className="Web__header__inner__extend__icon">
                                        <IoMdSearch />
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main>
                    <Outlet/>
                </main>

                <footer>
                    <div className="Web__footer">
                        <div className="container-main">
                            <div className="Web__footer__inner">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="Web__footer__inner__logo">
                                            VIRTUAL GALLERY
                                        </div>
                                        <div className="Web__footer__inner__contact">
                                            <div className="Web__footer__inner__contact__icon">
                                                <FaPhoneAlt />
                                            </div>
                                            <div className="Web__footer__inner__contact__text">
                                                0123 456 789
                                            </div>
                                        </div>
                                        <div className="Web__footer__inner__contact">
                                            <div className="Web__footer__inner__contact__icon">
                                                <FaMapMarkerAlt />
                                            </div>
                                            <div className="Web__footer__inner__contact__text">
                                                Đống Đa, Hà Nội, Việt Nam
                                            </div>
                                        </div>
                                        <div className="Web__footer__inner__contact">
                                            <div className="Web__footer__inner__contact__icon">
                                                <MdOutlineEmail />
                                            </div>
                                            <div className="Web__footer__inner__contact__text">
                                                email@gmail.com
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="Web__footer__inner__title">
                                            DANH SÁCH KHÔNG GIAN
                                        </div>
                                        <Link to={"/space/nghe_thuat_sang_tao"} className="Web__footer__inner__text">
                                            Nghệ thuật sáng tạo
                                        </Link>
                                        <Link to={"/space/dem_day_sao"} className="Web__footer__inner__text">
                                            Kỳ quan thiên nhiên
                                        </Link>
                                        <Link to={"/space/dem_day_sao"} className="Web__footer__inner__text">
                                            Nơi tình yêu bắt đầu
                                        </Link>
                                        <Link to={"/space/dem_day_sao"} className="Web__footer__inner__text">
                                            Cầu vòng lấp lánh
                                        </Link>
                                        <Link to={"/space/dem_day_sao"} className="Web__footer__inner__text">
                                            Ánh sao và bầu trời
                                        </Link>
                                        <Link to={"/space/dem_day_sao"} className="Web__footer__inner__text">
                                            Màu của nắng
                                        </Link>
                                    </div>
                                    <div className="col-md-3">
                                        <Link to={"/aboutus"} className="Web__footer__inner__title">
                                            VỀ CHÚNG TÔI
                                        </Link>
                                        <Link to={"/contact"} className="Web__footer__inner__title">
                                            LIÊN HỆ VỚI CHÚNG TÔI
                                        </Link>
                                        <div className="Web__footer__inner__icon">
                                            <div className="Web__footer__inner__icon__inner">
                                                <FaFacebook />
                                            </div>
                                            <div className="Web__footer__inner__icon__inner">
                                                <FaYoutube />
                                            </div>
                                            <div className="Web__footer__inner__icon__inner">
                                                <FaInstagram />
                                            </div>
                                            <div className="Web__footer__inner__icon__inner">
                                                <FaTiktok />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            <Modal isVisible={showModalRegister} onClose={() => setShowModalRegister(false)}>
                <div className="modalRegister__title">
                    ĐĂNG KÝ
                </div>
                <form className="modalRegister__form">
                    <label className="modalRegister__form__label">
                        Tên của bạn
                    </label>
                    <input type="text" placeholder="Ngô Thị Hồng nhung" className="modalRegister__form__input"/>
                    <label className="modalRegister__form__label">
                        Email đăng ký
                    </label>
                    <input type="text" placeholder="hongnhung.minha@gmail.com" className="modalRegister__form__input"/>
                    <label className="modalRegister__form__label">
                        Mật khẩu
                    </label>
                    <input type="password" placeholder="Nhập mật khẩu" className="modalRegister__form__input"/>
                    <label className="modalRegister__form__label">
                        Xác nhận mật khẩu
                    </label>
                    <input type="password" placeholder="Nhập mật khẩu" className="modalRegister__form__input"/>
                    <button className="modalRegister__form__button">Đăng ký</button>
                </form>
                <WebLine/>
                <div className="modalRegister__oath">
                    <div className="modalRegister__oath__text">
                        Đăng ký thông qua
                    </div>
                    <div className="modalRegister__oath__logo">
                        <div className="modalRegister__oath__logo__item">
                            <img src="/SocialIcon/google.svg"/>
                        </div>
                        <div className="modalRegister__oath__logo__item">
                            <img src="/SocialIcon/facebook.svg"/>
                        </div>
                    </div>
                </div>
                <WebLine/>
                <div className="modalRegister__have">
                    Bạn đã có tài khoản?
                </div>
                <div className="modalRegister__login" onClick={handleLoginClick}>
                    ĐĂNG NHẬP
                </div>
            </Modal>
            <Modal isVisible={showModalLogin} onClose={() => setShowModalLogin(false)}>
                <div className="modalRegister__title">
                    ĐĂNG NHẬP
                </div>
                <form className="modalRegister__form" onSubmit={handleLogin}>
                    <label className="modalRegister__form__label">Email đăng ký</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="hongnhung.minha@gmail.com"
                        className="modalRegister__form__input"
                        value={formData.email} // Giá trị từ state
                        onChange={handleInputChange} // Lắng nghe thay đổi
                    />
                    <label className="modalRegister__form__label">Mật khẩu</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Nhập mật khẩu"
                        className="modalRegister__form__input"
                        value={formData.password} // Giá trị từ state
                        onChange={handleInputChange} // Lắng nghe thay đổi
                    />
                    {loginError && (
                        <div className="modalRegister__form__error">{loginError}</div>
                    )}
                    <div className="modalRegister__form__Userforget" onClick={handleForgetClick}>
                        Quên mật khẩu
                    </div>
                    <button className="modalRegister__form__button">ĐĂNG NHẬP</button>
                </form>
                <WebLine/>
                <div className="modalRegister__oath">
                    <div className="modalRegister__oath__text">
                        Đăng nhập thông qua
                    </div>
                    <div className="modalRegister__oath__logo">
                        <div className="modalRegister__oath__logo__item">
                            <img src="/SocialIcon/google.svg"/>
                        </div>
                        <div className="modalRegister__oath__logo__item">
                            <img src="/SocialIcon/facebook.svg"/>
                        </div>
                    </div>
                </div>
                <WebLine/>
                <div className="modalRegister__have">
                    Bạn chưa có tài khoản?
                </div>
                <div className="modalRegister__login" onClick={handleRegisterClick}>
                    ĐĂNG KÝ TÀI KHOẢN
                </div>
            </Modal>
            <Modal isVisible={showModalForget} onClose={() => setShowModalForget(false)}>
                <div className="modalRegister__title">
                    LẤY LẠI MẬT KHẨU
                </div>
                <form className="modalRegister__form">
                    <label className="modalRegister__form__label">EMAIL BẠN ĐÃ ĐĂNG KÝ</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="hongnhung.minha@gmail.com"
                        className="modalRegister__form__input"
                    />
                    <button className="modalRegister__form__button">XÁC NHẬN EMAIL</button>
                </form>
            </Modal>
        </>
    )
}
export default LayoutDefault;