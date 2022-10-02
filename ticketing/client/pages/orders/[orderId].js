import { useEffect, useState } from "react";
import useRequest from "../../hooks/use-request";
import StripeCheckout from "react-stripe-checkout";
const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: (payments) => console.log(payments),
  });
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [order]);
  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }
  return (
    <div>
      Time left to pay:{timeLeft}
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51LnRmOIe9d4gPDSjAIdL3tMXEutsibLv7BrJhcmFHhi9TkBiuMJtdyKlk0trrcV3FtIvTN015x9p8RPtzFkSVtVR00ypNXFpsq"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
      {/* <button className="btn btn-primary"></button> */}
    </div>
  );
};
OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};
export default OrderShow;
