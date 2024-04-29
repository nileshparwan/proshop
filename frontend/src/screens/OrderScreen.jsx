import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Badge,
  Button
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import {
  useDeliverOrderMutation,
  useGetOrderByIdQuery,
  useGetPayPalClientIdQuery,
  useNotDeliverOrderMutation,
  usePayOrderMutation
} from '../slices/orderApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    isLoading,
    error,
    refetch
  } = useGetOrderByIdQuery(orderId);
  const [payOrder /*, { isLoading: loadingPay }*/] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPaypal
  } = useGetPayPalClientIdQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const [notDeliverOrder, { isLoading: loadingNotDeliver }] =
    useNotDeliverOrderMutation();

  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD'
          }
        });

        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, errorPaypal, loadingPaypal, paypal, paypalDispatch]);

  // const onApproveTest = async () => {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();
  //   toast.success('Payment successful');
  // }

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice
            }
          }
        ]
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    });
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const deliverOrderHandler = async () => {
    try {
      const res = await deliverOrder(orderId);
      if (res) {
        refetch();
        toast.success('Order delivered');
      } else {
        throw new Error('Please contact your admintrator');
      }
    } catch (error) {
      toast.error(error?.data.message || error?.message);
    }
  };

  const notDeliverOrderHandler = async () => {
    try {
      const res = await notDeliverOrder(orderId);
      if (res) {
        refetch();
        toast.success('Order not delivered');
      } else {
        throw new Error('Please contact your admintrator');
      }
    } catch (error) {
      toast.error(error?.data.message || error?.message);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      {order && (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Shipping</h2>

                  {order.user && (
                    <>
                      <p>
                        <strong>Name: </strong> {order.user.name}
                      </p>

                      <p>
                        <strong>Email: </strong> {order.user.email}
                      </p>
                    </>
                  )}

                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city},
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Badge bg='success'>
                      Delivered on {order.deliveredAt.substring(0, 10)}
                    </Badge>
                  ) : (
                    <Badge bg='danger'>Not Delivered</Badge>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method:</strong>
                    {order.paymentMethod}
                  </p>

                  {order.isPaid ? (
                    <Badge bg='success'>
                      Paid on {order.paidAt.substring(0, 10)}
                    </Badge>
                  ) : (
                    <Badge bg='danger'>Not Paid</Badge>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            loading='lazy'
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item._id}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Items: </Col>
                      <Col>${order.itemPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping: </Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax: </Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total: </Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {error && (
                    <ListGroup.Item>
                      <Message variant='danger'>{error}</Message>
                    </ListGroup.Item>
                  )}

                  {!order.isPaid && (
                    <ListGroup.Item>
                      {isLoading || isPending ? (
                        <Spinner />
                      ) : (
                        <div>
                          {/* <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: '10px' }}
                      >
                        Test Pay Order
                      </Button> */}
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        </div>
                      )}
                    </ListGroup.Item>
                  )}

                  {(loadingDeliver || loadingNotDeliver) && <Spinner />}

                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn btn-block'
                          onClick={deliverOrderHandler}
                        >
                          Mark as delivered
                        </Button>
                      </ListGroup.Item>
                    )}

                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn btn-block'
                          onClick={notDeliverOrderHandler}
                        >
                          Mark as not delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
