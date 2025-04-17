import WebLine from "../WebLine";
import { FaArrowRight } from "react-icons/fa6";
import sections from "../../constants/data";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

function Home_Section2(){
    const { danhSachKhongGian } = sections;
    return(
        <>
            <div className="Web__home__section2">
                    <div className="container-main">
                        <div className="Web__home__section2__inner">
                            <div className="Web__home__section2__inner__header">
                                <div className="Web__home__section2__inner__header__title">
                                    CÁC KHÔNG GIAN KHÁC
                                </div>
                                <Link to={"/listspace"} className="Web__home__section2__inner__header__more">
                                    <div className="Web__home__section2__inner__header__more__text">
                                        XEM DANH SÁCH KHÔNG GIAN
                                    </div>
                                    <div className="Web__home__section2__inner__header__more__icon">
                                        <FaArrowRight />
                                    </div>
                                </Link>
                            </div>
                            <WebLine />
                            <div className="Web__home__section2__inner__content">
                                <div className="row">
                                    {danhSachKhongGian.slice(0, 4).map((khongGian) => (
                                        <Link to={`/space/${khongGian.prop}`} className="col-3" key={khongGian.id}>
                                            <div className="Web__home__section2__inner__content__box">
                                                <div className="Web__home__section2__inner__content__box__image"
                                                    style={{
                                                        backgroundImage: `url(${khongGian.image})`,
                                                    }}
                                                >

                                                </div>
                                                <div className="Web__home__section2__inner__content__box--opacity">
                                                    <div className="Web__home__section2__inner__content__box--opacity__back">

                                                    </div>
                                                    <div className="Web__home__section2__inner__content__box--opacity__button">
                                                        <div className="Web__home__section2__inner__content__box--opacity__button__inner">
                                                            <div className="Web__home__section2__inner__content__box--opacity__button__inner__text">KHÁM PHÁ KHÔNG GIAN</div>
                                                            <div className="Web__home__section2__inner__content__box--opacity__button__inner__icon">
                                                                <MdArrowOutward/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="Web__home__section2__inner__content__box__title">
                                                    {khongGian.title}
                                                </div>
                                                <div className="Web__home__section2__inner__content__box__author">
                                                    {khongGian.author}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <Link to={"/listspace"} className="Web__home__section2__inner__header__more--hide">
                                    <div className="Web__home__section2__inner__header__more--hide__text">
                                        XEM DANH SÁCH KHÔNG GIAN
                                    </div>
                                    <div className="Web__home__section2__inner__header__more--hide__icon">
                                        <FaArrowRight />
                                    </div>
                                </Link>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Home_Section2;