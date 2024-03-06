import React from "react";
import "./Product.css";
import Details from "./Details";
import { BsCurrencyRupee } from "react-icons/bs";
import ReactImageMagnify from "react-image-magnify";
class Product extends React.Component {
  state = {
    products: [
      {
        _id: "1",
        title: "The Sherbi Ring",
        src: [
          "https://kinclimg7.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BINK0421R16_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-28709.png",
          "https://kinclimg1.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BINK0421R16_YAA18DIG6XXXXXXXX_ABCD00-PICS-00003-1024-28709.png",
          "https://kinclimg4.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BINK0421R16_YAA18DIG6XXXXXXXX_ABCD00-PICS-00002-1024-28709.png",
          "https://kinclimg1.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BINK0421R16_YAA18DIG6XXXXXXXX_ABCD00-PICS-00005-1024-28709.png",
        ],
        content: "MRP Incl. of all taxes.",
        colors: ["red", "black", "crimson", "teal"],
        count: 1,
      },
    ],
    index: 0,
  };

  myRef = React.createRef();

  handleTab = (index) => {
    this.setState({ index: index });
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  componentDidMount() {
    const { index } = this.state;
    this.myRef.current.children[index].className = "active";
  }

  render() {
    const { products, index } = this.state;
    return (
      <div className="app">
        {products.map((item) => (
          <div>
            <div className="details" key={item._id}>
              <div className="big-img">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: item.src[index],
                      width: 400,
                      height: 400,
                    },
                    largeImage: {
                      src: item.src[index],
                      width: 800,
                      height: 800,
                    },
                    enlargedImagePosition: "over",
                  }}
                />
              </div>

              <div className="box">
                <div className="row">
                  <h4 className="header">{item.title}</h4>
                </div>
                <div>
                  <p className="price">
                    <BsCurrencyRupee />
                    60,589
                  </p>
                </div>
                <p>{item.content}</p>

                <Details
                  images={item.src}
                  tab={this.handleTab}
                  myRef={this.myRef}
                />

                <div className="boxed-text">
                  <p>
                    <input
                      class="search-input"
                      type="text"
                      placeholder="Pincode..."
                    />
                    <button class="search-button">Update</button>
                  </p>
                  <p className="text">
                    Available in our store at <b>Khalsa Colony, Sonipat</b> and{" "}
                    <colors className="special-text">
                      25 other store(s) View all designs in stores near you
                    </colors>
                  </p>
                  <p className="dotted-border">
                    Delivery By <b>Today Evening (24nd Aug)</b> for Pincode
                    110001 (Order before 4pm for same-day-delivery)
                  </p>
                </div>
                <button className="cart">Add to cart</button>
                <button className="cart">Buy</button>
              </div>
            </div>
            <h2>Similar Products</h2>

            <table>
              <thead>
                <tr>
                  <th>
                    <div className="col-2 ">
                      <div className="row">
                        <div className="product-card">
                          <div className="product-image p-2">
                            <img
                              className="rounded"
                              style={{ width: 200, height: 220 }}
                              alt="Earrings"
                              src="https://kinclimg0.bluestone.com/f_webp,c_scale,w_418,b_rgb:f0f0f0/giproduct/BIDG0413R07_YAA18DIG4XXXXXXXX_ABCD00-PICS-00001-1024-28543.png"
                            />
                            <h4>
                              <BsCurrencyRupee />
                              60000/-
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="col-2 ">
                      <div className="row">
                        <div className="product-card">
                          <div className="product-image p-2">
                            <img
                              className="rounded"
                              style={{ width: 200, height: 220 }}
                              alt="Earrings"
                              src="https://kinclimg8.bluestone.com/f_webp,c_scale,w_418,b_rgb:f0f0f0/giproduct/BIDG0413R18_YAA18DIG4XXXXXXXX_ABCD00-PICS-00001-1024-28541.png"
                            />
                            <h4>
                              <BsCurrencyRupee />
                              55000/-
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="col-2 ">
                      <div className="row">
                        <div className="product-card">
                          <div className="product-image p-2">
                            <img
                              className="rounded"
                              style={{ width: 200, height: 220 }}
                              alt="Earrings"
                              src="https://kinclimg9.bluestone.com/f_webp,c_scale,w_418,b_rgb:f0f0f0/giproduct/BIDG0413R20_YAA18DIG4XXXXXXXX_ABCD00-PICS-00001-1024-28549.png"
                            />
                            <h4>
                              <BsCurrencyRupee />
                              48000/-
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="col-2 ">
                      <div className="row">
                        <div className="product-card">
                          <div className="product-image p-2">
                            <img
                              className="rounded"
                              style={{ width: 200, height: 220 }}
                              alt="Earrings"
                              src="https://kinclimg4.bluestone.com/f_webp,c_scale,w_418,b_rgb:f0f0f0/giproduct/BIDG0413R17_YAA18DIG4XXXXXXXX_ABCD00-PICS-00001-1024-28542.png"
                            />
                            <h5>
                              <BsCurrencyRupee />
                              61000/-
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="col-2 ">
                      <div className="row">
                        <div className="product-card">
                          <div className="product-image p-2">
                            <img
                              className="rounded"
                              style={{ width: 200, height: 220 }}
                              alt="Earrings"
                              src="https://kinclimg6.bluestone.com/f_webp,c_scale,w_418,b_rgb:f0f0f0/giproduct/BIDG0413R08_YAA18DIG4XXXXXXXX_ABCD00-PICS-00001-1024-30525.png"
                            />
                            <h5>
                              <BsCurrencyRupee />
                              45000/-
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="col-2 ">
                      <div className="row">
                        <div className="product-card">
                          <div className="product-image p-2">
                            <img
                              className="rounded"
                              style={{ width: 200, height: 220 }}
                              alt="Earrings"
                              src="https://kinclimg5.bluestone.com/f_webp,c_scale,w_418,b_rgb:f0f0f0/giproduct/BIDG0413R19_YAA18DIG4XXXXXXXX_ABCD00-PICS-00001-1024-28558.png"
                            />
                            <h5>
                              <BsCurrencyRupee />
                              72000/-
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>

            <table className="tablecontent">
              <tbody>
                <tr>
                  <td colspan="2" className="content">
                    PRODUCT DETAILS
                  </td>
                </tr>
                <tr>
                  <td className="lines">Product Code</td>
                  <td className="lines">034673-6017587</td>
                </tr>
                <tr>
                  <td className="lines">Height</td>
                  <td className="lines">19.85 mm</td>
                </tr>
                <tr>
                  <td className="lines">Width</td>
                  <td className="lines">19.97 mm</td>
                </tr>
                <tr>
                  <td className="lines">Product Weight</td>
                  <td className="lines">2.75 gram</td>
                </tr>
                <tr>
                  <td colspan="2" className="content">
                    DIAMOND DETAILS
                  </td>
                </tr>
                <tr>
                  <td className="lines">Total Weight</td>
                  <td className="lines">0.020 Ct</td>
                </tr>
                <tr>
                  <td className="lines">Total No. Of Diamonds</td>
                  <td className="lines">1</td>
                </tr>
                <tr>
                  <td className="lines">Clarity</td>
                  <td className="lines">SI</td>
                </tr>
                <tr>
                  <td className="lines">Color </td>
                  <td className="lines">IJ</td>
                </tr>
                <tr>
                  <td className="lines">Count</td>
                  <td className="lines">1</td>
                </tr>
                <tr>
                  <td className="lines">Shape</td>
                  <td className="lines">Round</td>
                </tr>
                <tr>
                  <td className="lines">Total Weight</td>
                  <td className="lines">0.020 carats</td>
                </tr>
                <tr>
                  <td className="lines">Setting Type</td>
                  <td className="lines">Flush</td>
                </tr>
                <tr>
                  <td colspan="2" className="content">
                    METAL DETAILS
                  </td>
                </tr>
                <tr>
                  <td className="lines">Type </td>
                  <td className="lines ">18Kt Gold</td>
                </tr>
                <tr>
                  <td className="lines">Weight</td>
                  <td className="lines"> 2.74 gram</td>
                </tr>
                <tr>
                  <td colspan="2" className="content">
                    PRICE BREAKUP
                  </td>
                </tr>
                <tr>
                  <td className="lines">Gold </td>
                  <td className="lines">
                    <BsCurrencyRupee /> 12,536/-
                  </td>
                </tr>
                <tr>
                  <td className="lines">Diamond </td>
                  <td className="lines">
                    <BsCurrencyRupee /> 2,198/-
                  </td>
                </tr>
                <tr>
                  <td className="lines">Making Charges </td>
                  <td className="lines">
                    <BsCurrencyRupee /> 6,034/-
                  </td>
                </tr>
                <tr>
                  <td className="lines">GST </td>
                  <td className="lines">
                    <BsCurrencyRupee /> 623/-
                  </td>
                </tr>
                <tr>
                  <td className="lines">Total</td>
                  <td className="lines">
                    <BsCurrencyRupee /> 21,391/-
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  }
}

export default Product;
