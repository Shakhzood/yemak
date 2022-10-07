import { useEffect } from "react";
import { BsClock, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MainHeader from "../../components/MainHeader/MainHeader";
import Footer from "../../components/Footer/Footer";
import { fetchCartItems, deleteCartItem } from "../../Store/Thunk";
import "./CartPage.scss";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    cost_of_delivery,
    cost_of_products,
    items_count,
    restaurantName,
    cartItems,
  } = useSelector((state) => state.RestaurantReducer);

  const { count, price } = items_count;

  const deleteCartItemFun = (deleteItemId) => {
    dispatch(deleteCartItem(deleteItemId));
    if (cartItems.length === 0) {
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  return (
    <div className="">
      <MainHeader />

      <div className="Shopping_cart">
        <div className="container">
          <p className="cart_title_header">Savatcha</p>
          <section>
            <div className="restoran_title">
              <p>Restoran: {restaurantName || ""}</p>
              <hr />
            </div>
            {cartItems?.map((cartItem) => {
              const { product = {}, id } = cartItem;
              // console.log(product);
              return (
                <div className="shopping_cart_page" key={cartItem.id}>
                  <div
                    className="delete_icon"
                    onClick={() => deleteCartItemFun(id)}
                  >
                    {/* delete icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 60 60"
                      viewBox="0 0 60 60"
                    >
                      <path d="M18.3,56h23.6c2.7,0,4.8-2.2,4.8-4.8V18.7h2.1c0.6,0,1-0.4,1-1v-2.3c0-2.1-1.7-3.7-3.7-3.7h-8.5V9.1c0-1.7-1.4-3.1-3.1-3.1  h-8.9c-1.7,0-3.1,1.4-3.1,3.1v2.6H14c-2.1,0-3.7,1.7-3.7,3.7v2.3c0,0.6,0.4,1,1,1h2.1v32.5C13.4,53.8,15.6,56,18.3,56z M44.7,51.2  c0,1.6-1.3,2.8-2.8,2.8H18.3c-1.6,0-2.8-1.3-2.8-2.8V18.7h29.3V51.2z M24.5,9.1C24.5,8.5,25,8,25.6,8h8.9c0.6,0,1.1,0.5,1.1,1.1v2.6  h-11V9.1z M12.3,15.4c0-1,0.8-1.7,1.7-1.7h32c1,0,1.7,0.8,1.7,1.7v1.3H12.3V15.4z" />
                      <path d="M37.9 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C36.9 48.8 37.4 49.2 37.9 49.2zM30.1 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C29.1 48.8 29.5 49.2 30.1 49.2zM22.2 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C21.2 48.8 21.6 49.2 22.2 49.2z" />
                    </svg>
                  </div>

                  <div className="img_cart_boxs">
                    <img src={product.photo} alt="cartItemPhoto" />
                  </div>
                  <div className="cart_header_text">
                    <div className="cart_childe">
                      <p>{product.name}</p>
                    </div>
                    <div className="box_empty">
                      <span>{product.description || ""}</span>
                    </div>
                    <div className="cart_time">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                        <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path>
                      </svg>
                      <p>{product.estimated_cooking_time} min</p>
                    </div>
                    <div className="counter">
                      <span>{product.price} so'm</span>
                      <div className="counter_box">
                        <p>soni {count}</p>

                        <button className="btn_minus">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 1024 1024"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                          </svg>
                        </button>
                        <button className="btn_plusi">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            t="1551322312294"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <defs></defs>
                            <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
                            <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <hr />
          </section>
          <section className="map_page">
            <h3>Manzilni tanlang</h3>
            <div>
              <img
                src="https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=22.08.04-0-b220731103100&x=2836&y=1532&z=12&scale=2.625&lang=ru_UZ&ads=enabled"
                alt=""
              />
            </div>
          </section>
          <section>
            <div className="main_cart_page">
              <div className="childe_box">
                <h2>Yetkazish vaqti</h2>
                <div className="work_time">
                  <span>Ish vaqti: 13:00 - 09:00</span>
                </div>
                <div className="cheack_box">
                  <label>
                    <input type="radio" name="deliveryTime" value="RightNow" />
                    <span className="cart_checkmark"></span>Hoziroq
                  </label>

                  <label className="cart_disabled">
                    <input
                      type="radio"
                      name="deliveryTime"
                      value="SelectedTime"
                    />
                    <span className="cart_checkmark"></span>Belgilangan vaqt
                  </label>
                </div>
              </div>
              <div className="childe_box">
                <h2>To'lov usuli</h2>
                <div className="work_time">
                  <a href="h">Yangi karta qo'shish</a>
                </div>
                <div className="cheack_box">
                  <label>
                    <input type="radio" name="deliveryTime" value="RightNow" />
                    <span className="cart_checkmark"></span>Naqd pul
                  </label>

                  <label className="cart_disabled">
                    <input
                      type="radio"
                      name="deliveryTime"
                      value="SelectedTime"
                    />
                    <span className="cart_checkmark"></span>Karta
                  </label>
                </div>
              </div>
            </div>
            <hr />
          </section>
          <section className="footer_box">
            <div className="commit">
              <h2>Qo'shimcha ma'lumot</h2>
              <textarea placeholder="Manzilingiz yoki taom haqida ma'lumot qoldiring…"></textarea>
            </div>
            <div className="table_box">
              <table>
                <tbody>
                  <tr>
                    <th>Yetkazish xizmati</th>
                    <th>Mahsulotlar narxi</th>
                    <th>Jami bo'lib</th>
                  </tr>
                  <tr>
                    <td>{cost_of_delivery || 0} so'm</td>
                    <td>{cost_of_products || 0} so'm</td>
                    <td>36000 so'm</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="delete_cart_item">
              <div className="delete_childe_icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 60 60"
                  viewBox="0 0 60 60"
                >
                  <path d="M18.3,56h23.6c2.7,0,4.8-2.2,4.8-4.8V18.7h2.1c0.6,0,1-0.4,1-1v-2.3c0-2.1-1.7-3.7-3.7-3.7h-8.5V9.1c0-1.7-1.4-3.1-3.1-3.1  h-8.9c-1.7,0-3.1,1.4-3.1,3.1v2.6H14c-2.1,0-3.7,1.7-3.7,3.7v2.3c0,0.6,0.4,1,1,1h2.1v32.5C13.4,53.8,15.6,56,18.3,56z M44.7,51.2  c0,1.6-1.3,2.8-2.8,2.8H18.3c-1.6,0-2.8-1.3-2.8-2.8V18.7h29.3V51.2z M24.5,9.1C24.5,8.5,25,8,25.6,8h8.9c0.6,0,1.1,0.5,1.1,1.1v2.6  h-11V9.1z M12.3,15.4c0-1,0.8-1.7,1.7-1.7h32c1,0,1.7,0.8,1.7,1.7v1.3H12.3V15.4z" />
                  <path d="M37.9 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C36.9 48.8 37.4 49.2 37.9 49.2zM30.1 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C29.1 48.8 29.5 49.2 30.1 49.2zM22.2 49.2c.6 0 1-.4 1-1V24.4c0-.6-.4-1-1-1s-1 .4-1 1v23.8C21.2 48.8 21.6 49.2 22.2 49.2z" />
                </svg>
              </div>
              <button>Buyurtma qilish</button>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CartPage;
