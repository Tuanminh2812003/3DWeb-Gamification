import "./User.scss"

import { useParams } from "react-router-dom";
import sections from "../../constants/data";
import { LuPencil } from "react-icons/lu";
import { Link, NavLink, Outlet } from "react-router-dom";
import Modal from "../../Components/Modal";
import { useState } from "react";
import WebLine from "../../Components/WebLine";
import { useNavigate } from "react-router-dom";

function User() {
    const { prop } = useParams(); // Lấy prop từ URL
    const { user } = sections;
    const [showModalUser, setShowModalUser] = useState(false);
    const [showModalForget, setShowModalForget] = useState(false);

    const handleUserClick = () => {
        setShowModalUser(true);
    };

    const handleForgetClick = () => {
        setShowModalForget(true);
        setShowModalUser(false);
    };

    // Tìm user tương ứng với prop
    const foundUser = user.find((u) => u.prop === prop);

    if (!foundUser) {
        return <div>Không tìm thấy người dùng!</div>;
    }

    return (
        <>
            <div className="User">
                <div className="container-main">
                    <div className="User__inner">
                        <div className="User__inner__header">
                            <div className="User__inner__header__left">
                                <div className="User__inner__header__left__title">PERSONAL ART SPACE</div>
                                <div className="User__inner__header__left__disc">
                                    Hi {foundUser.name}, Welcome back!
                                </div>
                            </div>
                            <div className="User__inner__header__right">
                                <div className="User__inner__header__right__image"
                                    style={{
                                        backgroundImage: `url(/${foundUser.avatar})`,
                                    }}
                                >

                                </div>
                                <div className="User__inner__header__right__user">
                                    <div className="User__inner__header__right__user__name">
                                        {foundUser.name}
                                    </div>
                                    <div className="User__inner__header__right__user__button">
                                        <div className="User__inner__header__right__user__button__item">
                                            LỊCH SỬ THAM QUAN
                                        </div>
                                        <div className="User__inner__header__right__user__button__item">
                                            <div className="User__inner__header__right__user__button__item__text" onClick={handleUserClick}>
                                                SỬA THÔNG TIN
                                            </div>
                                            <div className="User__inner__header__right__user__button__item__icon">
                                                <LuPencil />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isVisible={showModalUser} onClose={() => setShowModalUser(false)}>
                <div className="modalRegister__title">
                    CHỈNH SỬA
                </div>
                <form className="modalRegister__form">
                    <label className="modalRegister__form__label">
                        Tên của bạn
                    </label>
                    <input type="text" placeholder="Ngô Thị Hồng nhung" className="modalRegister__form__input"/>
                    <label className="modalRegister__form__label">
                        Mật khẩu hiện tại
                    </label>
                    <input type="password" placeholder="Nhập mật khẩu" className="modalRegister__form__input" />
                    <label className="modalRegister__form__label">
                        Mật khẩu mới
                    </label>
                    <input type="password" placeholder="Nhập mật khẩu" className="modalRegister__form__input"/>
                    <label className="modalRegister__form__label">
                        Xác nhận mật khẩu
                    </label>
                    <input type="password" placeholder="Nhập mật khẩu" className="modalRegister__form__input"/>
                    <div className="modalRegister__form__Userforget" onClick={handleForgetClick}>
                        Quên mật khẩu
                    </div>
                    <div className="modalRegister__form__Userbutton">
                        <div className="modalRegister__form__Userbutton__close">
                            Hủy
                        </div>
                        <button>LƯU THAY ĐỔI</button>
                    </div>
                </form>
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
    );
}

export default User;
