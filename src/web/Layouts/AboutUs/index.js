import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

import Home_Section2 from "../../Components/Home_Section2";
import "./AboutUs.scss";

function AboutUs(){
    return (
        <>
            <div className="AboutUs">
                <div className="container-main">
                    <div className="AboutUs__inner">
                        <div className="AboutUs__inner__section1">
                            <div className="row r1">
                                <div className="col-6">
                                    <div className="AboutUs__inner__section1__left">
                                        <div className="AboutUs__inner__section1__left__image">
                                            <div className="AboutUs__inner__section1__left__image__image1">

                                            </div>
                                            <div className="AboutUs__inner__section1__left__image__image2">
                                                
                                            </div>
                                        </div>
                                        <div className="AboutUs__inner__section1__left__title">
                                            VỀ CHÚNG TÔI
                                        </div>
                                        <div className="AboutUs__inner__section1__left__text">
                                            Chúng tôi là một đội ngũ sáng tạo đam mê với việc xây dựng và phát triển các không gian trưng bày độc đáo và đầy ấn tượng, với sự kết hợp của công nghệ Virtual Reality (VR). Mục tiêu của chúng tôi là mang đến những trải nghiệm trực quan, hấp dẫn và sống động cho khách tham quan, giúp họ có thể tương tác và khám phá trong một không gian ảo nhưng lại mang đến cảm giác thật sự.
                                        </div>
                                        <div className="AboutUs__inner__section1__left__text">
                                            Với sự phát triển mạnh mẽ của công nghệ VR, chúng tôi tạo ra những không gian trưng bày không chỉ để giới thiệu sản phẩm, nghệ thuật hay thông tin, mà còn để kích thích sự sáng tạo và khơi gợi trí tưởng tượng của người tham gia.
                                        </div>
                                        <div className="AboutUs__inner__section1__left__button">
                                            <Link to={"/contact"}>
                                                <div className="AboutUs__inner__section1__left__button__text">
                                                    LIÊN HỆ
                                                </div>
                                                <div   div className="AboutUs__inner__section1__left__button__icon">
                                                    <MdArrowOutward />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="AboutUs__inner__section1__right">
                                        <div className="AboutUs__inner__section1__right__image">

                                            <div className="AboutUs__inner__section1__right__image__image1">

                                            </div>
                                            <div className="AboutUs__inner__section1__right__image__image2">
                                                
                                            </div>
                                            <div className="AboutUs__inner__section1__right__image__image3">
                                                
                                            </div>
                                            <div className="AboutUs__inner__section1__right__image__image4">
                                                
                                            </div>
                                            <div className="AboutUs__inner__section1__right__image__image5">
                                                
                                            </div>
                                            <div className="AboutUs__inner__section1__right__image__image6">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row r2">
                                <div className="col-12">
                                    <div className="AboutUs__inner__section1__left">
                                        
                                        <div className="AboutUs__inner__section1__left__title">
                                            VỀ CHÚNG TÔI
                                        </div>
                                        <div className="AboutUs__inner__section1__left__text">
                                            Chúng tôi là một đội ngũ sáng tạo đam mê với việc xây dựng và phát triển các không gian trưng bày độc đáo và đầy ấn tượng, với sự kết hợp của công nghệ Virtual Reality (VR). Mục tiêu của chúng tôi là mang đến những trải nghiệm trực quan, hấp dẫn và sống động cho khách tham quan, giúp họ có thể tương tác và khám phá trong một không gian ảo nhưng lại mang đến cảm giác thật sự.
                                        </div>
                                        <div className="AboutUs__inner__section1__left__text">
                                            Với sự phát triển mạnh mẽ của công nghệ VR, chúng tôi tạo ra những không gian trưng bày không chỉ để giới thiệu sản phẩm, nghệ thuật hay thông tin, mà còn để kích thích sự sáng tạo và khơi gợi trí tưởng tượng của người tham gia.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12" style={{marginTop: "24px"}}>
                                    <div className="AboutUs__inner__section1__right">
                                    <div className="AboutUs__inner__section1__right">
                                    <div className="AboutUs__inner__section1__right__image">

                                        <div className="AboutUs__inner__section1__right__image__image1">

                                        </div>
                                        <div className="AboutUs__inner__section1__right__image__image2">
                                            
                                        </div>
                                        <div className="AboutUs__inner__section1__right__image__image3">
                                            
                                        </div>
                                        <div className="AboutUs__inner__section1__right__image__image4">
                                            
                                        </div>
                                        <div className="AboutUs__inner__section1__right__image__image5">
                                            
                                        </div>
                                        <div className="AboutUs__inner__section1__right__image__image6">
                                            
                                        </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="AboutUs__inner__section1__left__button">
                                            <Link to={"/contact"}>
                                                <div className="AboutUs__inner__section1__left__button__text">
                                                    LIÊN HỆ
                                                </div>
                                                <div   div className="AboutUs__inner__section1__left__button__icon">
                                                    <MdArrowOutward />
                                                </div>
                                            </Link>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="AboutUs__inner__section1">
                            <div className="row" style={{flexDirection: "row-reverse"}}>
                                <div className="col-md-6" style={{marginBottom: "24px"}}>
                                    <div className="AboutUs__inner__section1__left">
                                        <div className="AboutUs__inner__section1__left__title" style={{marginTop: "0px"}}>
                                            TRẢI NGHIỆM GAMEPLAY
                                        </div>
                                        <div className="AboutUs__inner__section1__left__text">
                                            Trong trải nghiệm gameplay này, bạn sẽ bước vào một không gian ảo sống động, không chỉ là người quan sát mà còn là người tham gia, tương tác và tạo ra những câu chuyện riêng của mình.
                                        </div>
                                        <div className="AboutUs__inner__section1__left__text">
                                            Bạn sẽ được chìm đắm trong những môi trường đa dạng, từ những mảnh ghép bí ẩn đến những thử thách vượt chướng ngại vật, và nhiều hơn nữa. Tất cả đều được xây dựng tỉ mỉ với công nghệ VR tiên tiến, mang đến trải nghiệm chân thật, sống động
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="AboutUs__inner__section1__right">
                                        <img src="/Web/About3.png"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Home_Section2/>
            </div>
        </>
    )
}

export default AboutUs;