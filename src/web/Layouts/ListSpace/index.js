import "./ListSpace.scss";
import { FaSearch } from "react-icons/fa";
import sections from "../../constants/data";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";

function ListSpace() {
    const { danhSachKhongGian } = sections;

    // Trạng thái từ khóa tìm kiếm
    const [searchKeyword, setSearchKeyword] = useState("");

    // Danh sách được lọc
    const filteredSpaces = danhSachKhongGian.filter((khongGian) =>
        khongGian.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
        <>
            <div className="ListSpace">
                <div className="container-main">
                    <div className="ListSpace__inner">
                        <div className="ListSpace__inner__header">
                            <div className="ListSpace__inner__header__title">
                                DANH SÁCH KHÔNG GIAN
                            </div>
                            <div className="ListSpace__inner__header__find">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm không gian"
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                                <div className="ListSpace__inner__header__find__icon">
                                    <FaSearch />
                                </div>
                            </div>
                        </div>
                        <input type="radio" name="khonggian" id="khonggiantrungbay" defaultChecked />
                        <input type="radio" name="khonggian" id="khonggiansangtao" />
                        <div className="ListSpace__inner__tab">
                            <label htmlFor="khonggiantrungbay" className="ListSpace__inner__tab__item1">
                                KHÔNG GIAN TRƯNG BÀY
                            </label>
                            <label htmlFor="khonggiansangtao" className="ListSpace__inner__tab__item2">
                                KHÔNG GIAN SÁNG TẠO
                            </label>
                        </div>
                        <div className="ListSpace__inner__content">
                            <div className="row" id="row1">
                                {filteredSpaces.map((khongGian) => (
                                    <Link to={`/space/${khongGian.prop}`} className="col-md-6" key={khongGian.id}>
                                        <div className="ListSpace__inner__content__box">
                                            <div className="ListSpace__inner__content__box__title">
                                                {khongGian.title}
                                            </div>
                                            <div className="ListSpace__inner__content__box__info">
                                                <div className="ListSpace__inner__content__box__info__item">
                                                    <div className="ListSpace__inner__content__box__info__item__item">
                                                        Nghệ sĩ
                                                    </div>
                                                    <div className="ListSpace__inner__content__box__info__item__item">
                                                        Thể loại
                                                    </div>
                                                </div>
                                                <div className="ListSpace__inner__content__box__info__item2">
                                                    <div className="ListSpace__inner__content__box__info__item2__item">
                                                        {khongGian.author}
                                                    </div>
                                                    <div className="ListSpace__inner__content__box__info__item2__item">
                                                        {khongGian.type}
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="ListSpace__inner__content__box__image"
                                                style={{
                                                    backgroundImage: `url(${khongGian.image})`,
                                                }}
                                            ></div>
                                            <div className="ListSpace__inner__content__box__button">
                                                <Link to={`/space/${khongGian.prop}`}>
                                                    <div className="ListSpace__inner__content__box__button__text">
                                                        CHI TIẾT
                                                    </div>
                                                    <div className="ListSpace__inner__content__box__button__icon">
                                                        <MdArrowOutward />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="row" id="row2">
                            <Link to={`/custom`} className="col-md-6">
                                        <div className="ListSpace__inner__content__box">
                                            <div className="ListSpace__inner__content__box__title">
                                                Không gian sáng tạo
                                            </div>
                                            <div className="ListSpace__inner__content__box__info">
                                                <div className="ListSpace__inner__content__box__info__item">
                                                    <div className="ListSpace__inner__content__box__info__item__item">
                                                        Tự tạo không gian cho riêng bạn
                                                    </div>
                                                    <div className="ListSpace__inner__content__box__info__item__item">
                                                        
                                                    </div>
                                                </div>
                                                <div className="ListSpace__inner__content__box__info__item2">
                                                    <div className="ListSpace__inner__content__box__info__item2__item">
                                                        
                                                    </div>
                                                    <div className="ListSpace__inner__content__box__info__item2__item">
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="ListSpace__inner__content__box__image"
                                                style={{
                                                    backgroundImage: `url("/KhongGian/kgcustom.jpg")`,
                                                }}
                                            ></div>
                                            <div className="ListSpace__inner__content__box__button">
                                                <Link to={``}>
                                                    <div className="ListSpace__inner__content__box__button__text">
                                                        CHI TIẾT
                                                    </div>
                                                    <div className="ListSpace__inner__content__box__button__icon">
                                                        <MdArrowOutward />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListSpace;
