import PropTypes from "prop-types";
import React, { useEffect, useState, Fragment } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Rating from "../../components/rating/Rating";
import { connect } from "react-redux";
import {
  addReview,
  addReviewByProd,
  getReviewsByProd,
  getReviews,
} from "../../redux/actions/review";
import Spinner from "../../pages/other/spinner";

const ProductDescriptionTab = ({
  spaceBottomClass,
  productFullDesc,
  user,
  addReview,
  reviews,
  productId,
  addReviewByProd,
  getReviewsByProd,
  loading,
  getReviews,
  profile,
}) => {
  useEffect(() => {
    getReviews();
  }, [reviews]);

  const [rating, setRating] = useState(0);
  //const [filePath, setFilePath] = useState("");

  const [reviewFormData, setReviewFormData] = useState({
    text: "",
  });
  const { text } = reviewFormData;
  const onChange = (e) =>
    setReviewFormData({
      ...reviewFormData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = (e) => {
    e.preventDefault();
    // setFilePath(
    //   profile.img.substr(profile.img.lastIndexOf("\\") + 1, profile.img.length)
    // );
    const img = profile.img.substr(
      profile.img.lastIndexOf("\\") + 1,
      profile.img.length
    );
    addReviewByProd(user.id, productId, { text, rating, img });
    setReviewFormData({
      text: "",
    });
    //getReviewsByProd(productId);
    //getReviews();
  };

  //*************************************************************************** */
  const liste = reviews.map((review, i) => {
    if (review.clothesId == productId) {
      return (
        <div className="single-review" key={i}>
          <div className="review-img">
            <img
              //src={process.env.PUBLIC_URL + "/assets/img/testimonial/1.jpg"}
              src={process.env.PUBLIC_URL + "/assets/img/" + review.img}
              alt=""
            />
          </div>
          <div className="review-content">
            <div className="review-top-wrap">
              <div className="review-left">
                <div className="review-name">
                  <h4>{review.user.username}</h4>
                  <span>{review.time.slice(0, 10)}</span>
                </div>
                <div className="review-rating">
                  {[...Array(review.rating)].map((star) => {
                    return <i className="fa fa-star" />;
                  })}
                  {[...Array(5 - review.rating)].map((star) => {
                    return <i className="fa fa-star-o" />;
                  })}
                </div>
              </div>
              {/* <div className="review-left">
              <button>Reply</button>
            </div> */}
            </div>

            <div className="review-bottom">{review.text}</div>
          </div>
        </div>
      );
    }
  });
  //*************************************************************************** */
  // console.log(
  //   profile.img.substr(profile.img.lastIndexOf("\\") + 1, profile.img.length)
  // );
  return (
    <Fragment>
      {!liste || loading ? (
        <Spinner />
      ) : (
        <div className={`description-review-area ${spaceBottomClass}`}>
          <div className="container">
            <div className="description-review-wrapper">
              <Tab.Container defaultActiveKey="productDescription">
                <Nav variant="pills" className="description-review-topbar">
                  <Nav.Item>
                    <Nav.Link eventKey="additionalInfo">
                      Additional Information
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="productDescription">
                      Description
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="productReviews">Reviews</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content className="description-review-bottom">
                  <Tab.Pane eventKey="additionalInfo">
                    <div className="product-anotherinfo-wrapper">
                      <ul>
                        <li>
                          <span>Weight</span> 400 g
                        </li>
                        <li>
                          <span>Dimensions</span>10 x 10 x 15 cm{" "}
                        </li>
                        <li>
                          <span>Materials</span> 60% cotton, 40% polyester
                        </li>
                        <li>
                          <span>Other Info</span> American heirloom jean shorts
                          pug seitan letterpress
                        </li>
                      </ul>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="productDescription">
                    {productFullDesc}
                  </Tab.Pane>
                  <Tab.Pane eventKey="productReviews">
                    <div className="row">
                      <div className="col-lg-7">
                        <div className="review-wrapper">
                          {liste}
                          {/* <div className="single-review">
                        <div className="review-img">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/img/testimonial/1.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="review-content">
                          <div className="review-top-wrap">
                            <div className="review-left">
                              <div className="review-name">
                                <h4>White Lewis</h4>
                              </div>
                              <div className="review-rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                              </div>
                            </div>
                            <div className="review-left">
                              <button>Reply</button>
                            </div>
                          </div>
                          <div className="review-bottom">
                            <p>
                              Vestibulum ante ipsum primis aucibus orci
                              luctustrices posuere cubilia Curae Suspendisse
                              viverra ed viverra. Mauris ullarper euismod
                              vehicula. Phasellus quam nisi, congue id nulla.
                            </p>
                          </div>
                        </div>
                      </div> */}
                          {/* <div className="single-review child-review">
                        <div className="review-img">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/img/testimonial/2.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="review-content">
                          <div className="review-top-wrap">
                            <div className="review-left">
                              <div className="review-name">
                                <h4>White Lewis</h4>
                              </div>
                              <div className="review-rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-empty" />
                              </div>
                            </div>
                            <div className="review-left">
                              <button>Reply</button>
                            </div>
                          </div>
                          <div className="review-bottom">
                            <p>
                              Vestibulum ante ipsum primis aucibus orci
                              luctustrices posuere cubilia Curae Suspendisse
                              viverra ed viverra. Mauris ullarper euismod
                              vehicula. Phasellus quam nisi, congue id nulla.
                            </p>
                          </div>
                        </div>
                      </div> */}
                        </div>
                      </div>
                      {user == null ? null : (
                        <Fragment>
                          <div className="col-lg-5">
                            <div className="ratting-form-wrapper pl-50">
                              <h3>Add a Review</h3>
                              <div className="ratting-form">
                                <form
                                  //action="#"
                                  onSubmit={(e) => onSubmit(e)}
                                >
                                  <div className="star-box">
                                    <span>Your rating:</span>
                                    <div className="ratting-star">
                                      {/* <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" /> */}

                                      <Rating
                                        rating={rating}
                                        setRating={setRating}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    {/* <div className="col-md-6">
                              <div className="rating-form-style mb-10">
                                <input placeholder="Name" type="text" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="rating-form-style mb-10">
                                <input placeholder="Email" type="email" />
                              </div>
                            </div> */}
                                    <div className="col-md-12">
                                      <div className="rating-form-style form-submit">
                                        <textarea
                                          name="text"
                                          placeholder="Message"
                                          //defaultValue={""}
                                          value={text}
                                          onChange={(e) => onChange(e)}
                                        />
                                        <input
                                          type="submit"
                                          defaultValue="Submit"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      )}
                      {/* <div className="col-lg-5">
                        <div className="ratting-form-wrapper pl-50">
                          <h3>Add a Review</h3>
                          <div className="ratting-form">
                            <form
                            
                              onSubmit={(e) => onSubmit(e)}
                            >
                              <div className="star-box">
                                <span>Your rating:</span>
                                <div className="ratting-star">
                                  

                                  <Rating
                                    rating={rating}
                                    setRating={setRating}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                
                                <div className="col-md-12">
                                  <div className="rating-form-style form-submit">
                                    <textarea
                                      name="text"
                                      placeholder="Message"
                                     
                                      value={text}
                                      onChange={(e) => onChange(e)}
                                    />
                                    <input
                                      type="submit"
                                      defaultValue="Submit"
                                    />
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  addReview: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  addReviewByProd: PropTypes.func.isRequired,
  getReviewsByProd: PropTypes.func.isRequired,
  getReviews: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  reviews: state.review.reviews,
  loading: state.review.loading,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, {
  addReview,
  addReviewByProd,
  getReviewsByProd,
  getReviews,
})(ProductDescriptionTab);
