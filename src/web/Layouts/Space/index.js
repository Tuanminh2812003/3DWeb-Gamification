import "./Space.scss";
import { useParams } from "react-router-dom";
import sections from "../../constants/data";
import { MdArrowOutward } from "react-icons/md";
import Home_Section2 from "../../Components/Home_Section2";
import { Link } from "react-router-dom";
import SlideShow from "../../Components/SlideShow";
import WebLine from "../../Components/WebLine";
import { useState } from "react";

function Space() {
    const { prop } = useParams(); // Lấy prop từ URL
    const { danhSachKhongGian } = sections;
    const { slide } = sections;

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(slide.length / itemsPerPage);

    // Tìm thông tin không gian theo prop
    const khongGian = danhSachKhongGian.find((item) => item.prop === prop);

    if (!khongGian) {
        return <div>Không tìm thấy không gian!</div>;
    }

    // Tách description bằng dấu `/`
    const descriptionParts = (khongGian.description || "").split('/');

    // Lọc danh sách slide theo trang
    const currentSlides = slide.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            {khongGian.spaceKind === "3D"?(
                <>
                    <div className="Space">
                        <video autoPlay loop muted className="Space__video">
                            <source src={khongGian.spaceVideo} type="video/mp4" />
                        </video>
                        <div className="Space__overlay"></div>
                        <div className="container-main">
                            <div className="Space__inner">
                                <div className="Space__inner__disc">KHÔNG GIAN TRƯNG BÀY</div>
                                <div className="Space__inner__title">{khongGian.title}</div>
                                <div className="Space__inner__info">
                                    <div className="Space__inner__info__item">
                                        <div className="Space__inner__info__item__item">
                                            Nghệ sĩ
                                        </div>
                                        <div className="Space__inner__info__item__item">
                                            Thể loại
                                        </div>
                                    </div>
                                    <div className="Space__inner__info__item2">
                                        <div className="Space__inner__info__item2__item">
                                            {khongGian.author}
                                        </div>
                                        <div className="Space__inner__info__item2__item">
                                            {khongGian.type}
                                        </div>
                                    </div>
                                </div>
                                <Link to={khongGian.web} className="Space__inner__button">
                                    <div className="Space__inner__button__inner">
                                        <div className="Space__inner__button__inner__text">KHÁM PHÁ KHÔNG GIAN</div>
                                        <div className="Space__inner__button__inner__icon">
                                            <MdArrowOutward/>
                                        </div>
                                    </div>
                                </Link>
                                {/* Render từng phần của description */}
                                {descriptionParts.map((part, index) => (
                                    <div key={index} className="Space__inner__des">
                                        {part.trim()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="Space__disc">
                        <div className="container-main">
                            <div className="Space__disc__inner">
                                <div className="Space__disc__inner__title">
                                    Mô tả
                                </div>
                                {descriptionParts.map((part, index) => (
                                    <div key={index} className="Space__disc__inner__des">
                                        {part.trim()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
                
            ) : khongGian.spaceKind === "gallery" ? (
                <>
                    <div className="Space">
                        <video autoPlay loop muted className="Space__video">
                            <source src={khongGian.spaceVideo} type="video/mp4" />
                        </video>
                        <div className="Space__overlay Space__overlay--gallery"></div>
                        <div className="container-main">
                            <div className="Space__inner">
                                <div className="Space__inner__disc">KHÔNG GIAN TRƯNG BÀY</div>
                                <div className="Space__inner__title">{khongGian.title}</div>
                                <div className="Space__inner__info">
                                    <div className="Space__inner__info__item">
                                        <div className="Space__inner__info__item__item">
                                            Nghệ sĩ
                                        </div>
                                        <div className="Space__inner__info__item__item">
                                            Thể loại
                                        </div>
                                    </div>
                                    <div className="Space__inner__info__item2">
                                        <div className="Space__inner__info__item2__item">
                                            {khongGian.author}
                                        </div>
                                        <div className="Space__inner__info__item2__item">
                                            {khongGian.type}
                                        </div>
                                    </div>
                                </div>
                                <SlideShow />
                            </div>
                        </div>
                    </div>
                    <div className="Space__gallery">
                        <div className="container-main">
                            <div className="Space__gallery__inner">
                                <div className="Space__gallery__inner__title">DANH SÁCH TRANH</div>
                                <WebLine />
                                <div className="Space__gallery__inner__content">
                                    {currentSlides.map((item) => (
                                        <div key={item.id} className="Space__gallery__inner__content__item">
                                            <div className="Space__gallery__inner__content__item__image" style={{
                                                        backgroundColor: `${item.background}`,
                                                        backgroundImage: `url(${item.image})`,
                                                    }}>

                                            </div>    
                                            <div className="Space__gallery__inner__content__item__title">
                                                {item.title}
                                            </div>
                                            <div className="Space__gallery__inner__content__item__author">
                                                {item.author}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Pagination Controls */}
                                <div className="pagination">
                                    {Array.from({ length: totalPages }).map((_, index) => (
                                        <div
                                            key={index + 1}
                                            className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>Không tìm thấy không gian!</div>
            )}    
            
            <Home_Section2/>
        </>
    );
}

export default Space;
